import styles from './Hero.module.css';

/**
 * Hero Component
 * 
 * Full-width hero section with headline, description, and CTA.
 * Features gradient background, floating elements, and animated content.
 * 
 * INTEGRATION NOTE:
 * The product showcase placeholder can be replaced with actual
 * featured products from Shopify when the API is connected.
 */
function Hero() {
  const handleScroll = (e, target) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className={styles.hero}>
      {/* Background Elements */}
      <div className={styles.bgGradient}></div>
      <div className={styles.bgGrid}></div>
      <div className={styles.floatingOrb1}></div>
      <div className={styles.floatingOrb2}></div>
      <div className={styles.floatingOrb3}></div>

      <div className={styles.container}>
        <div className={styles.content}>
          {/* Badge */}
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>🏥</span>
            <span>Trusted Medical Supplier</span>
          </div>

          {/* Headline */}
          <h1 className={styles.headline}>
            The Best Price in the Nation for
            <span className={styles.gradient}> Insulin Syringes</span>
          </h1>

          {/* Subheadline */}
          <p className={styles.subheadline}>
            Quality insulin syringes at unbeatable prices. Trusted by healthcare 
            providers and pharmacies nationwide. FDA approved, premium quality, 
            fast shipping.
          </p>

          {/* CTA Buttons */}
          <div className={styles.ctas}>
            <a 
              href="#products" 
              className={styles.primaryCta}
              onClick={(e) => handleScroll(e, '#products')}
            >
              <span>Shop Syringes</span>
              <span className={styles.ctaIcon}>→</span>
            </a>
            <a 
              href="#contact" 
              className={styles.secondaryCta}
              onClick={(e) => handleScroll(e, '#contact')}
            >
              <span className={styles.playIcon}>📞</span>
              <span>Contact Us</span>
            </a>
          </div>

          {/* Stats */}
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>10K+</span>
              <span className={styles.statLabel}>Healthcare Partners</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statValue}>100%</span>
              <span className={styles.statLabel}>FDA Approved</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statValue}>24hr</span>
              <span className={styles.statLabel}>Fast Shipping</span>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className={styles.visual}>
          {/* 
            INTEGRATION POINT:
            Replace this placeholder with featured product images
            from Shopify when the API is connected.
          */}
          <div className={styles.productShowcase}>
            <div className={styles.productCard}>
              <div className={styles.productImage}>
                <img 
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80" 
                  alt="Featured Product"
                  loading="lazy"
                />
              </div>
              <div className={styles.productInfo}>
                <span className={styles.productBadge}>Best Seller</span>
                <h3>Premium Headphones</h3>
                <p className={styles.productPrice}>$299.99</p>
              </div>
            </div>

            {/* Floating Product Cards */}
            <div className={styles.floatingCard1}>
              <img 
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80" 
                alt="Smart Watch"
                loading="lazy"
              />
            </div>
            <div className={styles.floatingCard2}>
              <img 
                src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&q=80" 
                alt="Sunglasses"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}

export default Hero;
