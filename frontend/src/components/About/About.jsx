import styles from './About.module.css';

/**
 * About Component
 * 
 * Two-column layout with text content and image.
 * Highlights company values and mission for Syringe Solutions.
 */
function About() {
  const features = [
    {
      icon: '✅',
      title: 'FDA Approved',
      description: 'All our products are FDA approved and meet the highest quality standards.',
    },
    {
      icon: '💰',
      title: 'Best Prices',
      description: 'We offer the most competitive prices in the nation for insulin syringes.',
    },
    {
      icon: '🚚',
      title: 'Fast Shipping',
      description: 'Quick and reliable shipping to healthcare providers nationwide.',
    },
  ];

  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        {/* Image Column */}
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapper}>
            <img
              src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80"
              alt="Medical supplies and healthcare"
              className={styles.mainImage}
              loading="lazy"
            />
            {/* Floating Stats Card */}
            <div className={styles.statsCard}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>10K+</span>
                <span className={styles.statText}>Healthcare Partners</span>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className={styles.decorCircle}></div>
            <div className={styles.decorDots}></div>
          </div>
        </div>

        {/* Content Column */}
        <div className={styles.contentColumn}>
          <span className={styles.label}>About Us</span>
          <h2 className={styles.heading}>
            Your Trusted Partner in
            <span className={styles.gradient}> Medical Supplies</span>
          </h2>
          <p className={styles.description}>
            Syringe Solutions is dedicated to providing healthcare providers and 
            pharmacies with the highest quality insulin syringes at unbeatable prices. 
            We understand the importance of reliable medical supplies in patient care.
          </p>
          <p className={styles.description}>
            Our commitment to quality and affordability has made us a trusted partner 
            for thousands of healthcare providers across the nation. We work directly 
            with manufacturers to ensure the best prices without compromising on quality.
          </p>

          {/* Feature List */}
          <div className={styles.features}>
            {features.map((feature, index) => (
              <div key={index} className={styles.feature}>
                <div className={styles.featureIcon}>
                  <span>{feature.icon}</span>
                </div>
                <div className={styles.featureContent}>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a href="#contact" className={styles.cta}>
            Contact Us Today
            <span className={styles.ctaArrow}>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;

