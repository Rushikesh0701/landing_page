import styles from './Hero.module.css';

/**
 * Hero Component
 * 
 * Clean hero section with headline, description, CTA, and product image.
 * Features trust badges and promotional messaging.
 */
function Hero() {
  const features = [
    { icon: '🛡️', label: 'FDA Approved' },
    { icon: '🚚', label: 'Free Shipping' },
    { icon: '🕐', label: '24/7 Support' },
    { icon: '💰', label: 'Best Prices' }
  ];

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        {/* Left Content */}
        <div className={styles.content}>
          <span className={styles.badge}>Trusted Medical Supplies</span>
          
          <h1 className={styles.headline}>
            The Best Price in the Nation for{' '}
            <span className={styles.highlight}>Insulin Syringes</span>
          </h1>

          <p className={styles.description}>
            Quality medical supplies at unbeatable prices. Fast shipping, 
            secure checkout, and dedicated customer support for all your 
            healthcare needs.
          </p>

          <div className={styles.ctas}>
            <a href="#products" className={styles.primaryBtn}>
              Shop Products
            </a>
            <a href="#contact" className={styles.secondaryBtn}>
              Contact Us
            </a>
          </div>

          {/* Feature Icons */}
          <div className={styles.features}>
            {features.map((feature, index) => (
              <div key={index} className={styles.feature}>
                <span className={styles.featureIcon}>{feature.icon}</span>
                <span className={styles.featureLabel}>{feature.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className={styles.imageWrapper}>
          <img 
            src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=80" 
            alt="Insulin Syringes" 
            className={styles.heroImage}
          />
          <div className={styles.saveBadge}>
            Save up to 40%
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
