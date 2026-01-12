import styles from './Footer.module.css';

/**
 * Footer Component
 * 
 * Multi-column footer with brand info, navigation links, and contact info.
 * Updated for Syringe Solutions branding.
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    products: [
      { label: 'Insulin Syringes', href: '#products' },
      { label: 'Needles', href: '#' },
      { label: 'Safety Syringes', href: '#' },
      { label: 'Bulk Orders', href: '#' },
    ],
    company: [
      { label: 'About Us', href: '#about' },
      { label: 'Our Team', href: '#' },
      { label: 'Certifications', href: '#' },
      { label: 'Partners', href: '#' },
    ],
    support: [
      { label: 'Contact Us', href: '#contact' },
      { label: 'FAQs', href: '#' },
      { label: 'Shipping Info', href: '#' },
      { label: 'Returns Policy', href: '#' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  };

  const socialLinks = [
    { label: 'Twitter', icon: '𝕏', href: '#' },
    { label: 'LinkedIn', icon: '💼', href: '#' },
    { label: 'Facebook', icon: '👥', href: '#' },
  ];

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.container}>
        {/* Main Footer Content */}
        <div className={styles.content}>
          {/* Brand Column */}
          <div className={styles.brandColumn}>
            <a href="#home" className={styles.logo}>
              <span className={styles.logoIcon}>💉</span>
              <span className={styles.logoText}>Syringe Solutions</span>
            </a>
            <p className={styles.brandDescription}>
              Your trusted partner for premium insulin syringes at unbeatable prices. 
              Quality medical supplies for healthcare providers nationwide.
            </p>
            
            {/* Contact Info */}
            <div className={styles.contactInfo}>
              <p>📞 1-800-SYRINGE</p>
              <p>✉️ info@syringesolutions.com</p>
            </div>
            
            {/* Social Links */}
            <div className={styles.socialLinks}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={styles.socialLink}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className={styles.linksColumn}>
            <h3 className={styles.columnTitle}>Products</h3>
            <ul className={styles.linksList}>
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={styles.link}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.linksColumn}>
            <h3 className={styles.columnTitle}>Company</h3>
            <ul className={styles.linksList}>
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={styles.link}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.linksColumn}>
            <h3 className={styles.columnTitle}>Support</h3>
            <ul className={styles.linksList}>
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={styles.link}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className={styles.newsletterColumn}>
            <h3 className={styles.columnTitle}>Get Updates</h3>
            <p className={styles.newsletterText}>
              Subscribe for pricing updates and special offers.
            </p>
            <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.emailInput}
                required
              />
              <button type="submit" className={styles.subscribeButton}>
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider}></div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {currentYear} Syringe Solutions. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            {footerLinks.legal.map((link, index) => (
              <span key={link.label}>
                <a href={link.href} className={styles.legalLink}>
                  {link.label}
                </a>
                {index < footerLinks.legal.length - 1 && (
                  <span className={styles.legalSeparator}>•</span>
                )}
              </span>
            ))}
          </div>
          <div className={styles.paymentMethods}>
            <span className={styles.paymentIcon}>🏥</span>
            <span className={styles.paymentText}>FDA Approved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

