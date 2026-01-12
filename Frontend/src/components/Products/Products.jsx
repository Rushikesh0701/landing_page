import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockProducts } from '../../data/products';
import { fetchProducts, formatPrice, isShopifyConfigured } from '../../lib/shopifyClient';
import ProductCard from './ProductCard';
import styles from './Products.module.css';

/**
 * Products Component (Shopify-Ready)
 * 
 * Displays a grid of featured products.
 * Currently uses mock data but is structured to easily integrate with
 * Shopify Storefront API.
 * 
 * INTEGRATION POINTS:
 * 1. Replace mock data with fetchProducts() call
 * 2. Add loading and error states
 * 3. Implement add to cart functionality via createCheckout()
 */
function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isShopifyActive, setIsShopifyActive] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  /**
   * Load products from Shopify or use mock data as fallback
   */
  async function loadProducts() {
    setLoading(true);
    
    // Check if Shopify is configured
    const shopifyEnabled = isShopifyConfigured();
    setIsShopifyActive(shopifyEnabled);

    if (shopifyEnabled) {
      try {
        const shopifyProducts = await fetchProducts(6);
        if (shopifyProducts && shopifyProducts.length > 0) {
          setProducts(shopifyProducts);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error('Failed to fetch Shopify products:', error);
      }
    }

    // Use mock data as fallback
    console.log('[Products] Using mock data as fallback');
    setProducts(mockProducts.slice(0, 6));
    setLoading(false);
  }

  return (
    <section id="products" className={styles.products}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.label}>Our Products</span>
          <h2 className={styles.heading}>
            Premium
            <span className={styles.gradient}> Insulin Syringes</span>
          </h2>
          <p className={styles.subheading}>
            FDA approved insulin syringes at the best prices in the nation. 
            Quality you can trust, prices you can afford.
          </p>
          
          {/* Integration Status Badge (dev only) */}
          {import.meta.env.DEV && (
            <div className={styles.statusBadge}>
              <span className={isShopifyActive ? styles.statusActive : styles.statusInactive}>
                {isShopifyActive ? '✓ Shopify Connected' : '○ Using Mock Data'}
              </span>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading products...</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className={styles.viewAll}>
          <Link to="/products" className={styles.viewAllButton}>
            View All Products
            <span className={styles.arrow}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Products;
