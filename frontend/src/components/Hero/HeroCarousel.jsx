import { useState, useEffect } from 'react';
import styles from './HeroCarousel.module.css';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&q=80',
    title: 'Premium Medical Supplies',
    subtitle: 'Trusted by healthcare professionals worldwide. Up to 40% off on bulk orders.',
    cta: 'Shop Now',
    color: '#2874f0',
    position: 'left'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=1920&q=80',
    title: 'Precision Engineered Syringes',
    subtitle: 'ISO certified products with guaranteed sterility and safety standards.',
    cta: 'Explore Range',
    color: '#fb641b',
    position: 'right'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=1920&q=80',
    title: 'Fast & Reliable Delivery',
    subtitle: 'Same-day dispatch on orders placed before 2 PM. Free shipping on orders above $100.',
    cta: 'Order Now',
    color: '#ff9f00',
    position: 'center'
  }
];

function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsTransitioning(false);
    }, 500);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <div className={styles.carousel}>
      <div 
        className={`${styles.track} ${isTransitioning ? styles.fading : ''}`}
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className={styles.slide}>
            <img src={slide.image} alt={slide.title} className={styles.image} />
            <div className={`${styles.overlay} ${styles[slide.position]}`}>
              <div className={styles.content}>
                <h2 className={styles.title}>{slide.title}</h2>
                <p className={styles.subtitle}>{slide.subtitle}</p>
                <button 
                  className={styles.cta} 
                  style={{ backgroundColor: slide.color }}
                  onClick={() => window.location.href = '#products'}
                >
                  {slide.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className={`${styles.control} ${styles.prev}`} onClick={handlePrev}>
        &#10005;
      </button>
      <button className={`${styles.control} ${styles.next}`} onClick={handleNext}>
        &#10006;
      </button>

      <div className={styles.indicators}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${currentSlide === index ? styles.active : ''}`}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentSlide(index);
                setIsTransitioning(false);
              }, 500);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroCarousel;
