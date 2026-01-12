import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './Navbar.module.css';

/**
 * Navbar Component
 * 
 * Responsive navigation bar with logo, nav links, cart button, and CTA.
 * Features:
 * - Sticky positioning with blur effect on scroll
 * - Mobile hamburger menu
 * - Cart icon with item count
 * - Smooth scroll to sections on home page
 */
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount, toggleCart } = useCart();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation links
  const navLinks = [
    { href: '/', label: 'Home', isRoute: true },
    { href: '#products', label: 'Products', isRoute: false },
    { href: '#about', label: 'About Us', isRoute: false },
    { href: '#contact', label: 'Contact Us', isRoute: false },
  ];

  // Handle smooth scroll for hash links
  const handleNavClick = (e, href, isRoute) => {
    if (isRoute) {
      setIsMobileMenuOpen(false);
      return; // Let React Router handle it
    }

    e.preventDefault();
    
    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      window.location.href = '/' + href;
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Logo Text */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoText}>Syringe Solutions</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.href} className={styles.navItem}>
                {link.isRoute ? (
                  <Link to={link.href} className={styles.navLink}>
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
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          {/* Cart Button */}
          <button
            className={styles.cartButton}
            onClick={() => toggleCart(true)}
            aria-label="Open cart"
          >
            <span className={styles.cartIcon}>🛒</span>
            {itemCount > 0 && (
              <span className={styles.cartBadge}>{itemCount}</span>
            )}
          </button>

          {/* CTA Button */}
          <a
            href="#products"
            className={styles.ctaButton}
            onClick={(e) => handleNavClick(e, '#products', false)}
          >
            Shop Now
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`${styles.mobileToggle} ${isMobileMenuOpen ? styles.active : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span className={styles.hamburger}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
        <ul className={styles.mobileNavList}>
          {navLinks.map((link) => (
            <li key={link.href} className={styles.mobileNavItem}>
              {link.isRoute ? (
                <Link
                  to={link.href}
                  className={styles.mobileNavLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={(e) => handleNavClick(e, link.href, link.isRoute)}
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>
        {/* Mobile Cart Button */}
        <button
          className={styles.mobileCartButton}
          onClick={() => { toggleCart(true); setIsMobileMenuOpen(false); }}
        >
          🛒 Cart {itemCount > 0 && `(${itemCount})`}
        </button>
        <a
          href="#products"
          className={styles.mobileCta}
          onClick={(e) => handleNavClick(e, '#products', false)}
        >
          Shop Now
        </a>
      </div>
    </header>
  );
}

export default Navbar;
