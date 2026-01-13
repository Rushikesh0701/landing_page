import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './Navbar.module.css';

/**
 * Navbar Component
 * 
 * Clean, minimal navigation bar with logo, nav links, and cart button.
 */
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { itemCount, toggleCart } = useCart();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation links
  const navLinks = [
    { href: '/', label: 'Home', isRoute: true },
    { href: '/products', label: 'Products', isRoute: true },
    { href: '#about', label: 'About Us', isRoute: false },
    { href: '#contact', label: 'Contact', isRoute: false },
  ];

  const handleNavClick = (e, href, isRoute) => {
    if (isRoute) return;

    e.preventDefault();
    if (location.pathname !== '/') {
      window.location.href = '/' + href;
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <div className={styles.logoIcon}>💉</div>
          <div className={styles.logoText}>
            <span className={styles.brandName}>Syringe Solutions</span>
            <span className={styles.tagline}>Best Prices Nationwide</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <div key={link.href}>
              {link.isRoute ? (
                <Link 
                  to={link.href} 
                  className={`${styles.navLink} ${location.pathname === link.href ? styles.active : ''}`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.href}
                  className={styles.navLink}
                  onClick={(e) => handleNavClick(e, link.href, link.isRoute)}
                >
                  {link.label}
                </a>
              )}
            </div>
          ))}
        </nav>

        {/* Right Actions */}
        <div className={styles.actions}>
          {/* Cart Button */}
          <button
            className={styles.cartButton}
            onClick={() => toggleCart(true)}
            aria-label="Open cart"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {itemCount > 0 && (
              <span className={styles.cartBadge}>{itemCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
