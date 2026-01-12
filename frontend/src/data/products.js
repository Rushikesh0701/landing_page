/**
 * Mock Data for Landing Page
 * 
 * Comprehensive test data that mimics Shopify's product structure.
 * Use this during development before Shopify Storefront API is connected.
 * 
 * INTEGRATION NOTE:
 * When Shopify is connected, replace this data source with actual API calls.
 * The data structure matches Shopify's GraphQL response format.
 */

// ============================================
// PRODUCTS DATA
// ============================================

export const mockProducts = [
    {
        id: 'gid://shopify/Product/1001',
        title: 'Premium Wireless Headphones Pro',
        description: 'Experience crystal-clear audio with our flagship noise-canceling wireless headphones. Features 40-hour battery life, premium materials, and studio-quality sound reproduction.',
        handle: 'premium-wireless-headphones-pro',
        price: 299.99,
        compareAtPrice: 399.99,
        currencyCode: 'USD',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
        imageAlt: 'Premium Wireless Headphones Pro - Black',
        available: true,
        variantId: 'gid://shopify/ProductVariant/1001',
        vendor: 'AudioTech',
        productType: 'Electronics',
        tags: ['electronics', 'audio', 'bestseller', 'wireless'],
        options: [
            { name: 'Color', values: ['Black', 'Silver', 'Rose Gold'] },
        ],
    },
    {
        id: 'gid://shopify/Product/1002',
        title: 'Smart Fitness Watch Series 5',
        description: 'Track your health and fitness goals with advanced sensors. Features heart rate monitoring, GPS, sleep tracking, and 7-day battery life. Water resistant up to 50m.',
        handle: 'smart-fitness-watch-series-5',
        price: 249.99,
        compareAtPrice: null,
        currencyCode: 'USD',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
        imageAlt: 'Smart Fitness Watch Series 5',
        available: true,
        variantId: 'gid://shopify/ProductVariant/1002',
        vendor: 'FitTech',
        productType: 'Wearables',
        tags: ['electronics', 'fitness', 'wearables', 'new-arrival'],
        options: [
            { name: 'Size', values: ['40mm', '44mm'] },
            { name: 'Band', values: ['Sport', 'Leather', 'Metal'] },
        ],
    },
    {
        id: 'gid://shopify/Product/1003',
        title: 'Minimalist Leather Wallet',
        description: 'Handcrafted from genuine Italian leather with a slim profile design. Features RFID blocking technology, 6 card slots, and a hidden cash compartment.',
        handle: 'minimalist-leather-wallet',
        price: 79.99,
        compareAtPrice: 99.99,
        currencyCode: 'USD',
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80',
        imageAlt: 'Minimalist Leather Wallet - Brown',
        available: true,
        variantId: 'gid://shopify/ProductVariant/1003',
        vendor: 'Artisan Goods',
        productType: 'Accessories',
        tags: ['accessories', 'leather', 'gift', 'handmade'],
        options: [
            { name: 'Color', values: ['Brown', 'Black', 'Tan'] },
        ],
    },
    {
        id: 'gid://shopify/Product/1004',
        title: 'Portable Bluetooth Speaker Max',
        description: 'Take the party anywhere with 360° immersive sound. Features waterproof design (IPX7), 24-hour battery life, and built-in microphone for calls.',
        handle: 'portable-bluetooth-speaker-max',
        price: 149.99,
        compareAtPrice: 179.99,
        currencyCode: 'USD',
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80',
        imageAlt: 'Portable Bluetooth Speaker Max',
        available: true,
        variantId: 'gid://shopify/ProductVariant/1004',
        vendor: 'SoundWave',
        productType: 'Audio',
        tags: ['electronics', 'audio', 'portable', 'outdoor'],
        options: [
            { name: 'Color', values: ['Black', 'Blue', 'Red', 'Green'] },
        ],
    },
    {
        id: 'gid://shopify/Product/1005',
        title: 'Designer Polarized Sunglasses',
        description: 'Protect your eyes in style with premium polarized lenses. Lightweight titanium frame with UV400 protection. Includes premium case and cleaning cloth.',
        handle: 'designer-polarized-sunglasses',
        price: 189.99,
        compareAtPrice: null,
        currencyCode: 'USD',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80',
        imageAlt: 'Designer Polarized Sunglasses',
        available: true,
        variantId: 'gid://shopify/ProductVariant/1005',
        vendor: 'OpticStyle',
        productType: 'Eyewear',
        tags: ['accessories', 'fashion', 'summer', 'premium'],
        options: [
            { name: 'Frame', values: ['Aviator', 'Wayfarer', 'Round'] },
            { name: 'Lens', values: ['Black', 'Brown', 'Blue Mirror'] },
        ],
    },
    {
        id: 'gid://shopify/Product/1006',
        title: 'Professional Coffee Maker Deluxe',
        description: 'Brew barista-quality coffee at home with precise temperature control, built-in burr grinder, and customizable strength settings. Makes up to 12 cups.',
        handle: 'professional-coffee-maker-deluxe',
        price: 349.99,
        compareAtPrice: 449.99,
        currencyCode: 'USD',
        image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&q=80',
        imageAlt: 'Professional Coffee Maker Deluxe',
        available: false,
        variantId: 'gid://shopify/ProductVariant/1006',
        vendor: 'BrewMaster',
        productType: 'Kitchen',
        tags: ['home', 'kitchen', 'coffee', 'bestseller'],
        options: [
            { name: 'Finish', values: ['Stainless Steel', 'Matte Black'] },
        ],
    },
    {
        id: 'gid://shopify/Product/1007',
        title: 'Ergonomic Office Chair Pro',
        description: 'Premium ergonomic chair designed for all-day comfort. Features adjustable lumbar support, breathable mesh back, 4D armrests, and smooth-rolling casters.',
        handle: 'ergonomic-office-chair-pro',
        price: 449.99,
        compareAtPrice: 599.99,
        currencyCode: 'USD',
        image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500&q=80',
        imageAlt: 'Ergonomic Office Chair Pro - Black',
        available: true,
        variantId: 'gid://shopify/ProductVariant/1007',
        vendor: 'ComfortWork',
        productType: 'Furniture',
        tags: ['office', 'furniture', 'ergonomic', 'work-from-home'],
        options: [
            { name: 'Color', values: ['Black', 'Gray', 'White'] },
        ],
    },
    {
        id: 'gid://shopify/Product/1008',
        title: 'Mechanical Gaming Keyboard RGB',
        description: 'Pro-grade mechanical keyboard with customizable RGB lighting, hot-swappable switches, programmable macros, and aircraft-grade aluminum frame.',
        handle: 'mechanical-gaming-keyboard-rgb',
        price: 159.99,
        compareAtPrice: null,
        currencyCode: 'USD',
        image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&q=80',
        imageAlt: 'Mechanical Gaming Keyboard with RGB Lighting',
        available: true,
        variantId: 'gid://shopify/ProductVariant/1008',
        vendor: 'GameGear',
        productType: 'Gaming',
        tags: ['electronics', 'gaming', 'keyboard', 'rgb'],
        options: [
            { name: 'Switch Type', values: ['Red (Linear)', 'Blue (Clicky)', 'Brown (Tactile)'] },
        ],
    },
];

// ============================================
// TESTIMONIALS DATA
// ============================================

export const mockTestimonials = [
    {
        id: 1,
        name: 'Sarah Johnson',
        role: 'Product Designer at Figma',
        location: 'San Francisco, CA',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
        content: 'Absolutely love the quality and attention to detail. The Premium Headphones Pro exceeded my expectations - the sound quality is incredible and they\'re so comfortable for long work sessions!',
        rating: 5,
        productPurchased: 'Premium Wireless Headphones Pro',
        verified: true,
        date: '2026-01-05',
    },
    {
        id: 2,
        name: 'Michael Chen',
        role: 'Software Engineer at Google',
        location: 'Seattle, WA',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
        content: 'Best online shopping experience I\'ve had in years. The Smart Fitness Watch has completely transformed how I track my workouts. Customer service was excellent when I had questions.',
        rating: 5,
        productPurchased: 'Smart Fitness Watch Series 5',
        verified: true,
        date: '2026-01-02',
    },
    {
        id: 3,
        name: 'Emily Rodriguez',
        role: 'Marketing Manager at Shopify',
        location: 'Toronto, Canada',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
        content: 'I\'ve been a loyal customer for over a year now. The minimalist wallet is beautifully crafted - you can tell it\'s genuine leather. Great prices and super fast shipping too!',
        rating: 5,
        productPurchased: 'Minimalist Leather Wallet',
        verified: true,
        date: '2025-12-28',
    },
    {
        id: 4,
        name: 'David Park',
        role: 'Creative Director',
        location: 'Los Angeles, CA',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
        content: 'The polarized sunglasses are stunning. Lightweight, stylish, and the lens quality is outstanding. I get compliments every time I wear them. Will definitely be ordering more.',
        rating: 5,
        productPurchased: 'Designer Polarized Sunglasses',
        verified: true,
        date: '2025-12-20',
    },
    {
        id: 5,
        name: 'Amanda Foster',
        role: 'Freelance Writer',
        location: 'Austin, TX',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80',
        content: 'My back pain has significantly improved since getting the ergonomic chair. Worth every penny! The assembly was straightforward and the customer support team was very helpful.',
        rating: 5,
        productPurchased: 'Ergonomic Office Chair Pro',
        verified: true,
        date: '2025-12-15',
    },
];

// ============================================
// FEATURES DATA
// ============================================

export const mockFeatures = [
    {
        id: 1,
        title: 'Free Shipping',
        description: 'Enjoy free express shipping on all orders over $50. Fast and reliable delivery straight to your doorstep within 2-5 business days.',
        icon: '🚚',
        highlight: '$50+',
    },
    {
        id: 2,
        title: 'Secure Payments',
        description: 'Shop with confidence using our 256-bit encrypted payment system. We accept all major cards, PayPal, and Apple Pay.',
        icon: '🔒',
        highlight: '256-bit SSL',
    },
    {
        id: 3,
        title: '24/7 Support',
        description: 'Our friendly customer support team is available around the clock via live chat, email, or phone. Average response time under 5 minutes.',
        icon: '💬',
        highlight: '< 5 min',
    },
    {
        id: 4,
        title: 'Easy Returns',
        description: '30-day hassle-free returns policy with free return shipping. Not satisfied? Get a full refund, no questions asked.',
        icon: '↩️',
        highlight: '30 days',
    },
];

// ============================================
// NAVIGATION DATA
// ============================================

export const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#features', label: 'Features' },
    { href: '#products', label: 'Products' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
];

// ============================================
// BRAND / COMPANY DATA
// ============================================

export const brandInfo = {
    name: 'ShopifyStore',
    tagline: 'Premium Products for Modern Living',
    description: 'Your destination for premium products that enhance everyday life. Quality, style, and innovation in every item we offer.',
    founded: 2015,
    email: 'hello@shopifystore.com',
    phone: '+1 (555) 123-4567',
    address: '100 Market Street, San Francisco, CA 94105',
    social: {
        twitter: 'https://twitter.com/shopifystore',
        instagram: 'https://instagram.com/shopifystore',
        facebook: 'https://facebook.com/shopifystore',
        linkedin: 'https://linkedin.com/company/shopifystore',
    },
};

// ============================================
// STATS DATA
// ============================================

export const stats = [
    { value: '50K+', label: 'Happy Customers' },
    { value: '200+', label: 'Premium Products' },
    { value: '4.9', label: 'Customer Rating' },
    { value: '10+', label: 'Years Experience' },
];

// ============================================
// FOOTER LINKS
// ============================================

export const footerLinks = {
    shop: [
        { label: 'All Products', href: '#products' },
        { label: 'New Arrivals', href: '#' },
        { label: 'Best Sellers', href: '#' },
        { label: 'Sale', href: '#' },
    ],
    company: [
        { label: 'About Us', href: '#about' },
        { label: 'Careers', href: '#' },
        { label: 'Press', href: '#' },
        { label: 'Blog', href: '#' },
    ],
    support: [
        { label: 'Contact Us', href: '#contact' },
        { label: 'FAQs', href: '#' },
        { label: 'Shipping Info', href: '#' },
        { label: 'Returns', href: '#' },
    ],
    legal: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Cookie Policy', href: '#' },
    ],
};

// ============================================
// COLLECTIONS DATA (for future use)
// ============================================

export const collections = [
    {
        id: 'gid://shopify/Collection/1',
        title: 'Electronics',
        handle: 'electronics',
        description: 'Latest tech gadgets and devices',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80',
    },
    {
        id: 'gid://shopify/Collection/2',
        title: 'Accessories',
        handle: 'accessories',
        description: 'Premium accessories for everyday use',
        image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&q=80',
    },
    {
        id: 'gid://shopify/Collection/3',
        title: 'Home & Kitchen',
        handle: 'home-kitchen',
        description: 'Elevate your living space',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80',
    },
];

// ============================================
// DEFAULT EXPORT
// ============================================

export default {
    products: mockProducts,
    testimonials: mockTestimonials,
    features: mockFeatures,
    navLinks,
    brandInfo,
    stats,
    footerLinks,
    collections,
};
