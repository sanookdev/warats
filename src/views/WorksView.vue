<template>
  <div class="works-page">
    <!-- Hero Section -->
    <section class="works-hero">
      <div class="works-hero__container container">
        <span class="works-hero__label animate-fadeInDown">Portfolio</span>
        <h1 class="works-hero__title animate-fadeInDown delay-100">My Creative Works</h1>
        <p class="works-hero__subtitle animate-fadeInDown delay-200">
          A curated collection of my projects showcasing creativity, innovation, and technical excellence.
        </p>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="works-filter">
      <div class="container">
        <div class="works-filter__buttons">
          <button 
            v-for="category in categories" 
            :key="category"
            @click="activeFilter = category"
            class="works-filter__btn"
            :class="{ 'works-filter__btn--active': activeFilter === category }"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </section>

    <!-- Works Grid -->
    <section class="works-grid-section">
      <div class="container">
        <TransitionGroup name="works" tag="div" class="works-grid">
          <article 
            v-for="work in filteredWorks" 
            :key="work.id"
            class="works-card"
          >
            <div class="works-card__image">
              <img :src="work.image" :alt="work.title" />
              <div class="works-card__overlay">
                <span class="works-card__view">View Project</span>
              </div>
            </div>
            <div class="works-card__content">
              <div class="works-card__meta">
                <span>{{ work.year }}</span>
                <span>{{ work.client }}</span>
              </div>
              <h3 class="works-card__title">{{ work.title }}</h3>
              <p class="works-card__desc">{{ work.description }}</p>
              <span class="works-card__category">{{ work.category }}</span>
            </div>
          </article>
        </TransitionGroup>

        <!-- Empty State -->
        <div v-if="filteredWorks.length === 0" class="works-empty">
          <p>No projects found in this category.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'WorksView',
  setup() {
    const categories = ['All', 'Branding', 'UI/UX', 'Web Design', 'App Design']
    const activeFilter = ref('All')

    const works = [
      { id: 1, title: 'Brand Identity Design', category: 'Branding', description: 'Complete brand identity for a tech startup', image: '/work-1.jpg', year: '2024', client: 'Tech Startup' },
      { id: 2, title: 'E-commerce Platform', category: 'UI/UX', description: 'Modern shopping experience redesign', image: '/work-2.jpg', year: '2024', client: 'Fashion Brand' },
      { id: 3, title: 'Mobile Banking App', category: 'App Design', description: 'Intuitive mobile banking interface', image: '/work-3.jpg', year: '2023', client: 'FinTech' },
      { id: 4, title: 'Corporate Website', category: 'Web Design', description: 'Professional corporate web presence', image: '/work-4.jpg', year: '2023', client: 'Business Corp' },
      { id: 5, title: 'Restaurant Branding', category: 'Branding', description: 'Full brand identity with menu design', image: '/work-5.jpg', year: '2023', client: 'Fine Dining' },
      { id: 6, title: 'Fitness App UI', category: 'App Design', description: 'Health tracking app with gamification', image: '/work-6.jpg', year: '2023', client: 'Health Startup' }
    ]

    const filteredWorks = computed(() => {
      if (activeFilter.value === 'All') return works
      return works.filter(work => work.category === activeFilter.value)
    })

    return { categories, activeFilter, filteredWorks }
  }
}
</script>

<style scoped>
.works-page {
  min-height: 100vh;
  background-color: var(--color-bg);
  transition: background-color var(--transition);
}

.works-hero {
  padding: 140px 0 60px;
  text-align: center;
  background-color: var(--color-bg-secondary);
  transition: background-color var(--transition);
}

.works-hero__label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.works-hero__title {
  font-family: var(--font-serif);
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 400;
  margin-top: 16px;
  color: var(--color-text);
}

.works-hero__subtitle {
  font-size: 16px;
  color: var(--color-text-secondary);
  margin-top: 16px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.works-filter {
  position: sticky;
  top: 80px;
  z-index: 40;
  background-color: var(--color-bg);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
  padding: 16px 0;
  transition: all var(--transition);
}

.works-filter__buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
}

.works-filter__btn {
  padding: 10px 20px;
  font-size: 13px;
  font-weight: 500;
  font-family: inherit;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  cursor: pointer;
  transition: all var(--transition);
  background-color: transparent;
  color: var(--color-text-secondary);
}

.works-filter__btn:hover {
  border-color: var(--color-text);
  color: var(--color-text);
}

.works-filter__btn--active {
  background-color: var(--color-text);
  color: var(--color-bg);
  border-color: var(--color-text);
}

.works-grid-section {
  padding: 60px 0;
}

.works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
}

.works-card {
  background-color: var(--color-bg-secondary);
  border-radius: 8px;
  overflow: hidden;
  transition: all var(--transition-slow);
}

.works-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.works-card__image {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
  background-color: var(--color-gray-200);
}

.works-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.works-card:hover .works-card__image img {
  transform: scale(1.1);
}

.works-card__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition);
}

.works-card:hover .works-card__overlay {
  opacity: 1;
}

.works-card__view {
  padding: 12px 24px;
  background: var(--color-white);
  color: var(--color-black);
  font-size: 13px;
  font-weight: 500;
  border-radius: 4px;
  transform: translateY(10px);
  transition: transform var(--transition);
}

.works-card:hover .works-card__view {
  transform: translateY(0);
}

.works-card__content {
  padding: 24px;
}

.works-card__meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--color-text-muted);
  margin-bottom: 8px;
}

.works-card__title {
  font-family: var(--font-serif);
  font-size: 20px;
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 8px;
  transition: color var(--transition);
}

.works-card:hover .works-card__title {
  color: var(--color-text-secondary);
}

.works-card__desc {
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin-bottom: 16px;
}

.works-card__category {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.works-empty {
  text-align: center;
  padding: 60px 0;
  color: var(--color-text-muted);
}

/* Grid Animation */
.works-move,
.works-enter-active,
.works-leave-active {
  transition: all 0.5s ease;
}

.works-enter-from,
.works-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.works-leave-active {
  position: absolute;
}

@media (max-width: 768px) {
  .works-hero {
    padding: 120px 0 40px;
  }

  .works-filter {
    top: 70px;
  }

  .works-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>
