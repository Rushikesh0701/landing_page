import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './ProductCard.module.css';

/**
 * ProductCard Component
 * 
 * Individual product card displaying product image, title, price, and action button.
 * Designed to match Shopify's product data structure.
 * Links to product detail page and integrates with cart.
 */
function ProductCard({ product, style }) {
  const { addItem } = useCart();
  
  const {
    title,
    handle,
    price,
    compareAtPrice,
    currencyCode = 'USD',
    image,
    imageAlt,
    available = true,
  } = product;

  // Format prices
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(price);

  const formattedComparePrice = compareAtPrice
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
      }).format(compareAtPrice)
    : null;

  // Calculate discount percentage
  const discountPercent = compareAtPrice
    ? Math.round((1 - price / compareAtPrice) * 100)
    : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <article className={styles.card} style={style}>
      {/* Product Image - Links to detail page */}
      <Link to={`/product/${handle}`} className={styles.imageWrapper}>
        <img
          src={image}
          alt={imageAlt || title}
          className={styles.image}
          loading="lazy"
        />
        
        {/* Badges */}
        <div className={styles.badges}>
          {!available && (
            <span className={styles.badgeSoldOut}>Sold Out</span>
          )}
          {discountPercent && available && (
            <span className={styles.badgeSale}>-{discountPercent}%</span>
          )}
        </div>

      </Link>

      {/* Product Info - Links to detail page */}
      <div className={styles.info}>
        <Link to={`/product/${handle}`} className={styles.infoLink}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.priceWrapper}>
            <span className={styles.price}>{formattedPrice}</span>
            {formattedComparePrice && (
              <span className={styles.comparePrice}>{formattedComparePrice}</span>
            )}
          </div>
        </Link>
        <button
          className={styles.addToCartBtn}
          onClick={handleAddToCart}
          disabled={!available}
        >
          {available ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
