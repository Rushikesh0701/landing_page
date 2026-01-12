import { mockFeatures } from '../../data/products';
import styles from './Features.module.css';

/**
 * Features Component
 * 
 * Displays feature cards highlighting key benefits/services.
 * Currently uses mock data; can be connected to a CMS or Shopify metafields later.
 */
function Features() {
  return (
    <section id="features" className={styles.features}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.label}>Why Choose Us</span>
          <h2 className={styles.heading}>
            Everything You Need for
            <span className={styles.gradient}> Modern Shopping</span>
          </h2>
          <p className={styles.subheading}>
            We're committed to providing the best shopping experience with 
            premium products and exceptional service.
          </p>
        </div>

        {/* Features Grid */}
        <div className={styles.grid}>
          {mockFeatures.map((feature, index) => (
            <div 
              key={feature.id} 
              className={styles.card}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>{feature.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
              <div className={styles.cardHover}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
