/**
 * Shopify Storefront API Proxy Server with OAuth
 * 
 * This Express server acts as a secure proxy between the React frontend
 * and Shopify's Storefront API, keeping Shopify credentials hidden from the client.
 * It also handles OAuth authentication flow for Shopify.
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 8080;

// Shopify configuration from environment variables
const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;
const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;
const SHOPIFY_SCOPES = process.env.SHOPIFY_SCOPES || 'read_products,read_orders,write_orders';
const SHOPIFY_REDIRECT_URI = process.env.SHOPIFY_REDIRECT_URI || `http://localhost:${PORT}/auth/shopify/callback`;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// In-memory store for access tokens (use a database in production!)
const shopTokens = new Map();

// Shopify Storefront API endpoint
const getStorefrontApiUrl = (shop) => `https://${shop}/api/2024-01/graphql.json`;

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Generate a random nonce for OAuth state parameter
 */
function generateNonce() {
    return crypto.randomBytes(16).toString('hex');
}

/**
 * Verify Shopify HMAC signature
 */
function verifyHmac(query) {
    const { hmac, ...params } = query;

    const sortedParams = Object.keys(params)
        .sort()
        .map(key => `${key}=${params[key]}`)
        .join('&');

    const generatedHmac = crypto
        .createHmac('sha256', SHOPIFY_API_SECRET)
        .update(sortedParams)
        .digest('hex');

    return crypto.timingSafeEqual(
        Buffer.from(hmac, 'hex'),
        Buffer.from(generatedHmac, 'hex')
    );
}

/**
 * Exchange authorization code for access token
 */
async function getAccessToken(shop, code) {
    const url = `https://${shop}/admin/oauth/access_token`;
    const payload = {
        client_id: SHOPIFY_API_KEY,
        client_secret: SHOPIFY_API_SECRET,
        code: code
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Error getting access token:', data);
            throw new Error(data.error || 'Failed to get access token');
        }

        return data.access_token;

    } catch (error) {
        console.error('Error in getAccessToken:', error);
        throw error;
    }
}

// ============================================
// HEALTH CHECK
// ============================================

app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Shopify proxy server is running',
        timestamp: new Date().toISOString()
    });
});

// ============================================
// OAUTH ROUTES
// ============================================

/**
 * GET /auth/shopify
 * Initiates the OAuth flow - redirects to Shopify authorization page
 */
app.get('/auth/shopify', (req, res) => {
    const shop = req.query.shop || SHOPIFY_STORE_DOMAIN;

    if (!shop) {
        return res.status(400).json({
            error: 'Missing shop parameter',
            message: 'Please provide shop domain (e.g., ?shop=your-store.myshopify.com)'
        });
    }

    const state = generateNonce();

    // Store state for verification (in production, use session/database)
    app.locals.oauthState = state;

    const authUrl = `https://${shop}/admin/oauth/authorize?` +
        `client_id=${SHOPIFY_API_KEY}` +
        `&scope=${SHOPIFY_SCOPES}` +
        `&redirect_uri=${encodeURIComponent(SHOPIFY_REDIRECT_URI)}` +
        `&state=${state}`;

    console.log('🔐 Redirecting to Shopify OAuth:', authUrl);
    res.redirect(authUrl);
});

/**
 * GET /auth/shopify/callback
 * OAuth callback - exchanges code for access token
 */
app.get('/auth/shopify/callback', async (req, res) => {
    const { code, shop, state, hmac } = req.query;

    console.log('📥 OAuth callback received:', { shop, code: code ? '***' : 'missing', state });

    // Validate required parameters
    if (!code || !shop) {
        return res.status(400).json({
            error: 'Missing required parameters',
            message: 'Authorization code or shop is missing'
        });
    }

    // Verify state parameter (CSRF protection)
    if (state !== app.locals.oauthState) {
        console.error('❌ State mismatch:', { expected: app.locals.oauthState, received: state });
        return res.status(403).json({
            error: 'Invalid state parameter',
            message: 'OAuth state verification failed'
        });
    }

    // Verify HMAC signature
    try {
        if (hmac && !verifyHmac(req.query)) {
            return res.status(403).json({
                error: 'Invalid HMAC',
                message: 'Request signature verification failed'
            });
        }
    } catch (error) {
        console.error('HMAC verification error:', error.message);
        // Continue anyway for development
    }

    try {
        // Exchange authorization code for access token
        const accessToken = await getAccessToken(shop, code);

        if (!accessToken) {
            throw new Error('Failed to retrieve access token');
        }

        // Store access token (in production, save to database)
        shopTokens.set(shop, {
            accessToken,
            scopes: SHOPIFY_SCOPES,
            installedAt: new Date().toISOString()
        });

        console.log('✅ Successfully obtained access token for:', shop);

        // Redirect to frontend with success
        res.redirect(`${FRONTEND_URL}?auth=success&shop=${shop}`);

    } catch (error) {
        console.error('❌ OAuth error:', error.message);
        res.redirect(`${FRONTEND_URL}?auth=error&message=${encodeURIComponent(error.message)}`);
    }
});

/**
 * GET /auth/status
 * Check authentication status for a shop
 */
app.get('/auth/status', (req, res) => {
    const shop = req.query.shop || SHOPIFY_STORE_DOMAIN;
    const tokenData = shopTokens.get(shop);

    res.json({
        authenticated: !!tokenData,
        shop: shop,
        installedAt: tokenData?.installedAt || null
    });
});

// ============================================
// SHOPIFY STOREFRONT API PROXY
// ============================================

/**
 * POST /shopify
 * 
 * Proxy endpoint for Shopify Storefront API GraphQL requests
 * 
 * Request body should contain:
 * - query: GraphQL query string
 * - variables: (optional) GraphQL variables object
 */
app.post('/shopify', async (req, res) => {
    try {
        const { query, variables } = req.body;
        const shop = req.query.shop || SHOPIFY_STORE_DOMAIN;

        // Validate request body
        if (!query) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'GraphQL query is required in the request body'
            });
        }

        // Validate Storefront token
        if (!SHOPIFY_STOREFRONT_TOKEN) {
            return res.status(500).json({
                error: 'Configuration Error',
                message: 'SHOPIFY_STOREFRONT_TOKEN is not configured'
            });
        }

        console.log('📦 Proxying request to Shopify Storefront API...');

        const apiUrl = getStorefrontApiUrl(shop);

        // Forward request to Shopify Storefront API
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
            },
            body: JSON.stringify({
                query,
                variables: variables || {}
            })
        });

        // Get response data
        const data = await response.json();

        // Check for Shopify API errors
        if (!response.ok) {
            console.error('❌ Shopify API error:', data);
            return res.status(response.status).json({
                error: 'Shopify API Error',
                message: data.errors || 'An error occurred while communicating with Shopify',
                details: data
            });
        }

        // Log success
        console.log('✅ Successfully received response from Shopify');

        // Return Shopify response to frontend
        return res.json(data);

    } catch (error) {
        console.error('❌ Server error:', error.message);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to communicate with Shopify API',
            details: error.message
        });
    }
});

// ============================================
// ADMIN API PROXY (for authenticated requests)
// ============================================

/**
 * POST /admin
 * 
 * Proxy endpoint for Shopify Admin API requests (requires OAuth)
 */
app.post('/admin', async (req, res) => {
    try {
        const { query, variables } = req.body;
        const shop = req.query.shop || SHOPIFY_STORE_DOMAIN;

        // Get stored access token
        const tokenData = shopTokens.get(shop);
        if (!tokenData) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'Shop is not authenticated. Please complete OAuth flow first.',
                authUrl: `/auth/shopify?shop=${shop}`
            });
        }

        console.log('📦 Proxying request to Shopify Admin API...');

        const apiUrl = `https://${shop}/admin/api/2024-01/graphql.json`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': tokenData.accessToken
            },
            body: JSON.stringify({
                query,
                variables: variables || {}
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('❌ Shopify Admin API error:', data);
            return res.status(response.status).json({
                error: 'Shopify Admin API Error',
                message: data.errors || 'An error occurred',
                details: data
            });
        }

        console.log('✅ Successfully received response from Shopify Admin API');
        return res.json(data);

    } catch (error) {
        console.error('❌ Server error:', error.message);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to communicate with Shopify Admin API',
            details: error.message
        });
    }
});

// ============================================
// ERROR HANDLERS
// ============================================

// 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.method} ${req.path} not found`
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('❌ Unhandled error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: 'An unexpected error occurred'
    });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
    console.log('');
    console.log('🚀 ================================================');
    console.log('🚀 Shopify Proxy Server with OAuth');
    console.log(`🚀 Running on http://localhost:${PORT}`);
    console.log(`🚀 Shopify Store: ${SHOPIFY_STORE_DOMAIN || 'Not configured'}`);
    console.log('🚀 ================================================');
    console.log('');
    console.log('Available endpoints:');
    console.log(`  GET  /health                     - Health check`);
    console.log(`  GET  /auth/shopify               - Start OAuth flow`);
    console.log(`  GET  /auth/shopify/callback      - OAuth callback`);
    console.log(`  GET  /auth/status                - Check auth status`);
    console.log(`  POST /shopify                    - Storefront API proxy`);
    console.log(`  POST /admin                      - Admin API proxy (requires OAuth)`);
    console.log('');
    if (!SHOPIFY_API_KEY || !SHOPIFY_API_SECRET) {
        console.warn('⚠️  Warning: SHOPIFY_API_KEY or SHOPIFY_API_SECRET not set');
        console.warn('   OAuth functionality will not work!');
    }
    if (!SHOPIFY_STOREFRONT_TOKEN) {
        console.warn('⚠️  Warning: SHOPIFY_STOREFRONT_TOKEN not set');
        console.warn('   Storefront API proxy will not work!');
    }
});
