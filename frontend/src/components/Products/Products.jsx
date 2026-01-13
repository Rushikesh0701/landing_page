import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockProducts } from '../../data/products';
import { fetchProducts, isShopifyConfigured } from '../../lib/shopifyClient';
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

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    const shopifyEnabled = isShopifyConfigured();

    if (shopifyEnabled) {
      try {
        const shopifyProducts = await fetchProducts(8);
        if (shopifyProducts && shopifyProducts.length > 0) {
          setProducts(shopifyProducts);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error('Failed to fetch Shopify products:', error);
      }
    }

    setProducts(mockProducts.slice(0, 8));
    setLoading(false);
  }

  return (
    <section id="products" className={styles.products}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <h2 className={styles.heading}>Featured Products</h2>
            <p className={styles.subheading}>Browse our selection of high-quality medical supplies at the best prices in the nation.</p>
          </div>
          <Link to="/products" className={styles.viewAllButton}>
            View All Products →
          </Link>
        </div>

        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
          </div>
        ) : (
          <div className={styles.grid}>
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                style={{ animationDelay: `${index * 0.05}s` }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Products;
