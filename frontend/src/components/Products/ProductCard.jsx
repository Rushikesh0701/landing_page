import { useState } from 'react';
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
  const [isWishlisted, setIsWishlisted] = useState(false);
  
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

  // Mock rating
  const rating = 4.5;
  const reviewsCount = 1205;

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
  }).format(price);

  const formattedComparePrice = compareAtPrice
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 0,
      }).format(compareAtPrice)
    : null;

  const discountPercent = compareAtPrice
    ? Math.round((1 - price / compareAtPrice) * 100)
    : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <article className={styles.card} style={style}>
      <button 
        className={`${styles.wishlistBtn} ${isWishlisted ? styles.active : ''}`}
        onClick={toggleWishlist}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
      </button>

      <Link to={`/product/${handle}`} className={styles.imageWrapper}>
        <img src={image} alt={imageAlt || title} className={styles.image} loading="lazy" />
        {discountPercent && available && (
          <span className={styles.badgeSale}>{discountPercent}% OFF</span>
        )}
      </Link>

      <div className={styles.info}>
        <Link to={`/product/${handle}`} className={styles.infoLink}>
          <h3 className={styles.title}>{title}</h3>
          
          <div className={styles.ratingWrapper}>
            <div className={styles.ratingBadge}>
              <span>{rating}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            </div>
            <span className={styles.reviewsCount}>({reviewsCount})</span>
          </div>

          <div className={styles.priceContainer}>
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
