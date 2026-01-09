<template>
  <section class="works">
    <div class="works__container container">
      <div class="works__header reveal">
        <span class="works__label">Selected Works</span>
        <h2 class="works__title">Recent Projects</h2>
      </div>

      <div class="works__grid">
        <article 
          v-for="(work, index) in works" 
          :key="work.id" 
          class="works__item reveal"
          :style="{ transitionDelay: (index * 0.1) + 's' }"
        >
          <div class="works__item-image">
            <img :src="work.image" :alt="work.title" />
            <div class="works__item-overlay">
              <span class="works__item-view">View Project</span>
            </div>
          </div>
          <div class="works__item-content">
            <span class="works__item-category">{{ work.category }}</span>
            <h3 class="works__item-title">{{ work.title }}</h3>
            <p class="works__item-desc">{{ work.description }}</p>
          </div>
        </article>
      </div>

      <div class="works__cta reveal">
        <router-link to="/works" class="works__btn">
          View All Works
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted } from 'vue'

export default {
  name: 'WorksSection',
  props: {
    works: {
      type: Array,
      default: () => [
        {
          id: 1,
          title: 'Brand Identity Design',
          category: 'Branding',
          description: 'Complete brand identity for a tech startup.',
          image: '/work-1.jpg'
        },
        {
          id: 2,
          title: 'E-commerce Platform',
          category: 'UI/UX Design',
          description: 'Modern shopping experience redesign',
          image: '/work-2.jpg'
        },
        {
          id: 3,
          title: 'Mobile Banking App',
          category: 'App Design',
          description: 'Intuitive mobile banking interface',
          image: '/work-3.jpg'
        }
      ]
    }
  },
  setup() {
    onMounted(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      }, { threshold: 0.1 })

      document.querySelectorAll('.works .reveal').forEach(el => {
        observer.observe(el)
      })
    })
  }
}
</script>

<style scoped>
.works {
  padding: 100px 0;
  background-color: var(--color-bg);
  transition: background-color var(--transition);
}

.works__header {
  text-align: center;
  margin-bottom: 60px;
}

.works__label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.works__title {
  font-family: var(--font-serif);
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 400;
  margin-top: 12px;
  color: var(--color-text);
}

.works__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
}

.works__item {
  background-color: var(--color-bg-secondary);
  border-radius: 8px;
  overflow: hidden;
  transition: transform var(--transition-slow), box-shadow var(--transition-slow);
}

.works__item:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.works__item-image {
  position: relative;
  aspect-ratio: 16/10;
  overflow: hidden;
  background-color: var(--color-gray-200);
}

.works__item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.works__item:hover .works__item-image img {
  transform: scale(1.1);
}

.works__item-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition);
}

.works__item:hover .works__item-overlay {
  opacity: 1;
}

.works__item-view {
  padding: 12px 24px;
  background: var(--color-white);
  color: var(--color-black);
  font-size: 13px;
  font-weight: 500;
  border-radius: 4px;
  transform: translateY(10px);
  transition: transform var(--transition);
}

.works__item:hover .works__item-view {
  transform: translateY(0);
}

.works__item-content {
  padding: 24px;
}

.works__item-category {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.works__item-title {
  font-family: var(--font-serif);
  font-size: 22px;
  font-weight: 500;
  margin-top: 8px;
  color: var(--color-text);
  transition: color var(--transition);
}

.works__item:hover .works__item-title {
  color: var(--color-text-secondary);
}

.works__item-desc {
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin-top: 8px;
}

.works__cta {
  text-align: center;
  margin-top: 48px;
}

.works__btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  transition: all var(--transition);
}

.works__btn svg {
  width: 18px;
  height: 18px;
  transition: transform var(--transition);
}

.works__btn:hover {
  background-color: var(--color-text);
  color: var(--color-bg);
  border-color: var(--color-text);
}

.works__btn:hover svg {
  transform: translateX(4px);
}

/* Reveal Animation */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 768px) {
  .works {
    padding: 80px 0;
  }

  .works__grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>
