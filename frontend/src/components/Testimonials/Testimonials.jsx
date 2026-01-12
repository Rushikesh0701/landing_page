import { mockTestimonials } from '../../data/products';
import styles from './Testimonials.module.css';

/**
 * Testimonials Component
 * 
 * Displays customer testimonials in a card grid.
 * Uses mock data for now; could be connected to a review service later.
 */
function Testimonials() {
  // Generate star rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? styles.starFilled : styles.starEmpty}>
        ★
      </span>
    ));
  };

  return (
    <section id="testimonials" className={styles.testimonials}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.label}>Testimonials</span>
          <h2 className={styles.heading}>
            What Our Customers
            <span className={styles.gradient}> Are Saying</span>
          </h2>
          <p className={styles.subheading}>
            Join thousands of satisfied customers who trust us for their 
            premium shopping needs.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className={styles.grid}>
          {mockTestimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className={styles.card}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Quote Icon */}
              <div className={styles.quoteIcon}>"</div>
              
              {/* Content */}
              <p className={styles.content}>{testimonial.content}</p>
              
              {/* Rating */}
              <div className={styles.rating}>
                {renderStars(testimonial.rating)}
              </div>
              
              {/* Author */}
              <div className={styles.author}>
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className={styles.avatar}
                  loading="lazy"
                />
                <div className={styles.authorInfo}>
                  <h4 className={styles.authorName}>{testimonial.name}</h4>
                  <p className={styles.authorRole}>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className={styles.trustBadges}>
          <div className={styles.trustBadge}>
            <span className={styles.trustIcon}>⭐</span>
            <span className={styles.trustText}>4.9/5 Average Rating</span>
          </div>
          <div className={styles.trustBadge}>
            <span className={styles.trustIcon}>🛡️</span>
            <span className={styles.trustText}>Verified Reviews</span>
          </div>
          <div className={styles.trustBadge}>
            <span className={styles.trustIcon}>💯</span>
            <span className={styles.trustText}>50,000+ Happy Customers</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
