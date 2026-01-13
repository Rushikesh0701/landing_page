import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductByHandle } from '../../lib/shopifyClient';
import { useCart } from '../../context/CartContext';
import { mockProducts } from '../../data/products';
import styles from './ProductDetail.module.css';

/**
 * ProductDetail Page
 * 
 * Displays detailed product information with add to cart functionality.
 * Fetches product by handle from Shopify or falls back to mock data.
 */
function ProductDetail() {
  const { handle } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [handle]);

  async function loadProduct() {
    setLoading(true);
    setError(null);

    try {
      // Try to fetch from Shopify
      const shopifyProduct = await fetchProductByHandle(handle);
      
      if (shopifyProduct) {
        setProduct(shopifyProduct);
      } else {
        // Fall back to mock data
        const mockProduct = mockProducts.find(p => p.handle === handle);
        if (mockProduct) {
          setProduct(mockProduct);
        } else {
          setError('Product not found');
        }
      }
    } catch (err) {
      console.error('Error loading product:', err);
      setError('Failed to load product');
    } finally {
      setLoading(false);
    }
  }

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        variantId: product.variantId,
        title: product.title,
        price: product.price,
        currencyCode: product.currencyCode || 'USD',
        image: product.image,
        imageAlt: product.imageAlt || product.title,
        handle: product.handle,
      });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  // Format price
  const formatPrice = (amount, currencyCode = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={styles.error}>
        <h2>Product Not Found</h2>
        <p>{error || 'The product you are looking for does not exist.'}</p>
        <Link to="/" className={styles.backButton}>
          ← Back to Home
        </Link>
      </div>
    );
  }

  const discountPercent = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : null;

  return (
    <div className={styles.productDetail}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/#products">Products</Link>
          <span>/</span>
          <span>{product.title}</span>
        </nav>

        <div className={styles.content}>
          {/* Product Image */}
          <div className={styles.imageSection}>
            <div className={styles.imageWrapper}>
              {discountPercent && (
                <span className={styles.saleBadge}>-{discountPercent}%</span>
              )}
              <img
                src={product.image}
                alt={product.imageAlt || product.title}
                className={styles.image}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className={styles.infoSection}>
            <h1 className={styles.title}>{product.title}</h1>
            
            <div className={styles.priceWrapper}>
              <span className={styles.price}>
                {formatPrice(product.price, product.currencyCode)}
              </span>
              {product.compareAtPrice && (
                <span className={styles.comparePrice}>
                  {formatPrice(product.compareAtPrice, product.currencyCode)}
                </span>
              )}
            </div>

            <p className={styles.description}>{product.description}</p>

            {/* Availability */}
            <div className={styles.availability}>
              {product.available !== false ? (
                <span className={styles.inStock}>✓ In Stock</span>
              ) : (
                <span className={styles.outOfStock}>✗ Out of Stock</span>
              )}
            </div>

            {/* Add to Cart */}
            <button
              className={`${styles.addToCart} ${addedToCart ? styles.added : ''}`}
              onClick={handleAddToCart}
              disabled={product.available === false}
            >
              {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
            </button>

            {/* Features */}
            <div className={styles.features}>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>🚚</span>
                <span>Free shipping over $50</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>↩️</span>
                <span>30-day free returns</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>🔒</span>
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <Link to="/" className={styles.backLink}>
          ← Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default ProductDetail;
