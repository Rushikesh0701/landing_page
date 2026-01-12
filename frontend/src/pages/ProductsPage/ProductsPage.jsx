import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockProducts } from '../../data/products';
import { fetchProducts, isShopifyConfigured } from '../../lib/shopifyClient';
import ProductCard from '../../components/Products/ProductCard';
import styles from './ProductsPage.module.css';

/**
 * ProductsPage Component
 * 
 * Displays all available products in a grid layout.
 * Fetches from Shopify if configured, otherwise uses mock data.
 */
function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isShopifyActive, setIsShopifyActive] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  /**
   * Load all products from Shopify or use mock data as fallback
   */
  async function loadAllProducts() {
    setLoading(true);
    
    const shopifyEnabled = isShopifyConfigured();
    setIsShopifyActive(shopifyEnabled);

    if (shopifyEnabled) {
      try {
        const shopifyProducts = await fetchProducts(50); // Fetch more products
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
    console.log('[ProductsPage] Using mock data as fallback');
    setProducts(mockProducts);
    setLoading(false);
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* Page Header */}
        <div className={styles.header}>
          <Link to="/" className={styles.backLink}>
            ← Back to Home
          </Link>
          <h1 className={styles.title}>
            All <span className={styles.gradient}>Products</span>
          </h1>
          <p className={styles.subtitle}>
            Browse our complete collection of premium insulin syringes
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
          <>
            <p className={styles.count}>{products.length} products found</p>
            <div className={styles.grid}>
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  style={{ animationDelay: `${index * 0.05}s` }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default ProductsPage;
