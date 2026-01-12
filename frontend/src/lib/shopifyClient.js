/**
 * Shopify Storefront API Client
 * 
 * This file makes requests through our secure backend proxy.
 * The backend handles authentication and keeps Shopify credentials hidden.
 */

// ============================================
// CONFIGURATION
// ============================================

/**
 * Backend proxy URL - all Shopify requests go through this
 * The backend securely adds the Shopify access token
 */
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
const SHOPIFY_PROXY_URL = `${BACKEND_URL}/shopify`;

// ============================================
// GRAPHQL CLIENT
// ============================================

/**
 * Makes a GraphQL request to Shopify via our secure backend proxy
 * 
 * @param {string} query - GraphQL query string
 * @param {object} variables - Query variables
 * @returns {Promise<object>} - Response data
 */
export async function shopifyFetch(query, variables = {}) {
  try {
    console.log('[Shopify] Making API request via backend proxy:', SHOPIFY_PROXY_URL);

    const response = await fetch(SHOPIFY_PROXY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error('[Shopify] GraphQL errors:', result.errors);
      throw new Error(result.errors[0]?.message || 'GraphQL error');
    }

    console.log('[Shopify] API response received successfully');
    return result.data;
  } catch (error) {
    console.error('[Shopify] Fetch error:', error);
    throw error;
  }
}

// ============================================
// GRAPHQL QUERIES
// ============================================

/**
 * Query to fetch all products
 */
export const PRODUCTS_QUERY = `
  query Products($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                availableForSale
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * Query to fetch a single product by handle
 */
export const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      descriptionHtml
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;

/**
 * Mutation to create a checkout
 */
export const CREATE_CHECKOUT_MUTATION = `
  mutation CheckoutCreate($lineItems: [CheckoutLineItemInput!]!) {
    checkoutCreate(input: { lineItems: $lineItems }) {
      checkout {
        id
        webUrl
        lineItems(first: 10) {
          edges {
            node {
              title
              quantity
            }
          }
        }
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

// ============================================
// API FUNCTIONS
// ============================================

/**
 * Transform Shopify product data to a simpler format for UI
 */
function transformProduct(shopifyProduct) {
  const image = shopifyProduct.images?.edges?.[0]?.node;
  const variant = shopifyProduct.variants?.edges?.[0]?.node;
  const price = parseFloat(shopifyProduct.priceRange?.minVariantPrice?.amount || 0);
  const compareAtPrice = parseFloat(shopifyProduct.compareAtPriceRange?.minVariantPrice?.amount || 0);

  return {
    id: shopifyProduct.id,
    title: shopifyProduct.title,
    description: shopifyProduct.description,
    handle: shopifyProduct.handle,
    price: price,
    compareAtPrice: compareAtPrice > price ? compareAtPrice : null,
    currencyCode: shopifyProduct.priceRange?.minVariantPrice?.currencyCode || 'USD',
    image: image?.url || 'https://via.placeholder.com/500',
    imageAlt: image?.altText || shopifyProduct.title,
    available: variant?.availableForSale ?? true,
    variantId: variant?.id,
  };
}

/**
 * Fetch all products from Shopify
 * 
 * @param {number} count - Number of products to fetch (default: 10)
 * @returns {Promise<array>} - Array of products
 */
export async function fetchProducts(count = 10) {
  try {
    const data = await shopifyFetch(PRODUCTS_QUERY, { first: count });

    if (!data?.products?.edges) {
      console.log('[Shopify] No products returned, using mock data');
      return null;
    }

    const products = data.products.edges.map(edge => transformProduct(edge.node));
    console.log(`[Shopify] Fetched ${products.length} products`);
    return products;
  } catch (error) {
    console.error('[Shopify] Failed to fetch products:', error);
    return null; // Return null to trigger fallback to mock data
  }
}

/**
 * Fetch a single product by its handle (URL slug)
 * 
 * @param {string} handle - Product handle/slug
 * @returns {Promise<object>} - Product object
 */
export async function fetchProductByHandle(handle) {
  try {
    const data = await shopifyFetch(PRODUCT_BY_HANDLE_QUERY, { handle });

    if (!data?.productByHandle) {
      return null;
    }

    return transformProduct(data.productByHandle);
  } catch (error) {
    console.error('[Shopify] Failed to fetch product:', error);
    return null;
  }
}

/**
 * Create a Shopify checkout with the given items
 * 
 * @param {array} items - Array of { variantId, quantity } objects
 * @returns {Promise<object>} - Checkout object with webUrl for redirect
 */
export async function createCheckout(items) {
  try {
    const lineItems = items.map(item => ({
      variantId: item.variantId,
      quantity: item.quantity,
    }));

    const data = await shopifyFetch(CREATE_CHECKOUT_MUTATION, { lineItems });

    if (data?.checkoutCreate?.checkoutUserErrors?.length > 0) {
      throw new Error(data.checkoutCreate.checkoutUserErrors[0].message);
    }

    return data?.checkoutCreate?.checkout;
  } catch (error) {
    console.error('[Shopify] Failed to create checkout:', error);
    return null;
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Format price for display
 * 
 * @param {string|number} amount - Price amount
 * @param {string} currencyCode - Currency code (e.g., 'USD')
 * @returns {string} - Formatted price string
 */
export function formatPrice(amount, currencyCode = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}

/**
 * Check if Shopify integration is configured
 * Since we use the backend proxy, this always returns true
 * The backend handles credential validation
 * 
 * @returns {boolean} - True (backend handles configuration)
 */
export function isShopifyConfigured() {
  return true; // Backend proxy handles credentials
}

// ============================================
// EXPORTS
// ============================================

export default {
  fetchProducts,
  fetchProductByHandle,
  createCheckout,
  formatPrice,
  isShopifyConfigured,
};