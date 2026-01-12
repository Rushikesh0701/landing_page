import { useCart } from '../../context/CartContext';
import styles from './CartDrawer.module.css';

/**
 * CartDrawer Component
 * 
 * Slide-out drawer showing cart contents with checkout button.
 */
function CartDrawer() {
  const {
    items,
    isOpen,
    isLoading,
    itemCount,
    subtotal,
    toggleCart,
    removeItem,
    updateQuantity,
    checkout,
  } = useCart();

  // Format price
  const formatPrice = (amount, currencyCode = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(amount);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className={styles.backdrop} onClick={() => toggleCart(false)} />

      {/* Drawer */}
      <div className={styles.drawer}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Your Cart
            <span className={styles.count}>({itemCount})</span>
          </h2>
          <button
            className={styles.closeButton}
            onClick={() => toggleCart(false)}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className={styles.content}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>🛒</span>
              <p>Your cart is empty</p>
              <button
                className={styles.continueShopping}
                onClick={() => toggleCart(false)}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className={styles.itemList}>
              {items.map((item) => (
                <li key={item.variantId} className={styles.item}>
                  <div className={styles.itemImage}>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    <p className={styles.itemPrice}>
                      {formatPrice(item.price, item.currencyCode)}
                    </p>
                    <div className={styles.quantityControls}>
                      <button
                        className={styles.quantityButton}
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className={styles.quantity}>{item.quantity}</span>
                      <button
                        className={styles.quantityButton}
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className={styles.removeButton}
                    onClick={() => removeItem(item.variantId)}
                    aria-label="Remove item"
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.subtotal}>
              <span>Subtotal</span>
              <span className={styles.subtotalAmount}>
                {formatPrice(subtotal, items[0]?.currencyCode)}
              </span>
            </div>
            <p className={styles.shippingNote}>
              Shipping & taxes calculated at checkout
            </p>
            <button
              className={styles.checkoutButton}
              onClick={checkout}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className={styles.spinner}></span>
                  Processing...
                </>
              ) : (
                'Proceed to Checkout'
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartDrawer;
