import styles from './CategorySection.module.css';

const categories = [
  { id: 1, name: 'Syringes', image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=150&q=80' },
  { id: 2, name: 'Needles', image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=150&q=80' },
  { id: 3, name: 'IV Sets', image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=150&q=80' },
  { id: 4, name: 'Gloves', image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=150&q=80' },
  { id: 5, name: 'Masks', image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=150&q=80' },
  { id: 6, name: 'Bandages', image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=150&q=80' },
  { id: 7, name: 'Sanitizers', image: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=150&q=80' },
  { id: 8, name: 'Thermometers', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=150&q=80' }
];

function CategorySection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {categories.map((cat) => (
          <div key={cat.id} className={styles.categoryItem}>
            <div className={styles.imageWrapper}>
              <img src={cat.image} alt={cat.name} className={styles.image} />
            </div>
            <span className={styles.name}>{cat.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
