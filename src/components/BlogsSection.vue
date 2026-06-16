<template>
  <section class="blogs-section" id="blogs">
    <!-- Aurora Blobs -->
    <div class="blogs-section__aurora" aria-hidden="true">
      <div class="blogs-section__blob blogs-section__blob--1"></div>
      <div class="blogs-section__blob blogs-section__blob--2"></div>
    </div>

    <div class="blogs-section__container container">
      <!-- Header -->
      <div class="blogs-section__header reveal">
        <span class="blogs-section__label">Latest Articles</span>
        <h2 class="blogs-section__title">Blog</h2>
        <p class="blogs-section__desc">
          เรื่องราวเกี่ยวกับ Development, Technology และประสบการณ์ต่างๆ ที่อยากแบ่งปัน
        </p>
      </div>

      <!-- Blog Grid -->
      <div class="blogs-section__grid" v-if="blogs.length">
        <!-- Hero Card (first blog) -->
        <div class="blogs-section__hero reveal">
          <BlogCard :blog="blogs[0]" :isHero="true" />
        </div>

        <!-- Sub Grid (blogs 2-5) -->
        <div class="blogs-section__sub-grid">
          <div
            class="blogs-section__sub-item reveal"
            v-for="(blog, index) in blogs.slice(1, 5)"
            :key="blog.id"
            :style="{ animationDelay: `${(index + 1) * 0.1}s` }"
          >
            <BlogCard :blog="blog" />
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div class="blogs-section__empty reveal" v-else>
        <p>ยังไม่มีบทความ</p>
      </div>

      <!-- View All -->
      <div class="blogs-section__action reveal" v-if="blogs.length">
        <router-link to="/blogs" class="blogs-section__view-all">
          <span>View All Articles</span>
          <div class="blogs-section__view-all-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14m-7-7l7 7-7 7" />
            </svg>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import BlogCard from '@/components/BlogCard.vue'
import { useBlogStore } from '@/composables/useBlogStore'

export default {
  name: 'BlogsSection',
  components: { BlogCard },
  data() {
    return {
      blogs: [],
      observer: null
    }
  },
  mounted() {
    const store = useBlogStore()
    this.blogs = store.getLatestBlogs(5)
    // Wait for Vue to render the DOM with blog data before observing
    this.$nextTick(() => {
      this.initScrollReveal()
    })
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect()
    }
  },
  methods: {
    initScrollReveal() {
      if (this.observer) {
        this.observer.disconnect()
      }
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
            }
          })
        },
        { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
      )
      this.$el.querySelectorAll('.reveal').forEach((el) => this.observer.observe(el))
    }
  }
}
</script>

<style scoped>
.blogs-section {
  position: relative;
  padding: 100px 0 80px;
  background-color: var(--color-bg);
  overflow: hidden;
}

/* Aurora */
.blogs-section__aurora {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.blogs-section__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.06;
}

[data-theme="dark"] .blogs-section__blob {
  opacity: 0.15;
}

.blogs-section__blob--1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #2563eb, transparent 65%);
  top: -100px;
  right: -100px;
  animation: blob-float-1 16s ease-in-out infinite;
}

.blogs-section__blob--2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #06b6d4, transparent 65%);
  bottom: -100px;
  left: -50px;
  animation: blob-float-2 20s ease-in-out infinite;
}

/* Header */
.blogs-section__container {
  position: relative;
  z-index: 1;
}

.blogs-section__header {
  text-align: center;
  margin-bottom: 60px;
}

.blogs-section__label {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #60a5fa;
  margin-bottom: 16px;
  padding: 6px 16px;
  border-radius: 100px;
  background: rgba(96, 165, 250, 0.1);
  border: 1px solid rgba(96, 165, 250, 0.2);
}

.blogs-section__title {
  font-family: var(--font-serif);
  font-size: clamp(36px, 5vw, 54px);
  font-weight: 400;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin-bottom: 16px;
}

.blogs-section__desc {
  font-size: 15px;
  color: var(--color-text-secondary);
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.7;
}

/* Grid */
.blogs-section__grid {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.blogs-section__hero {
  width: 100%;
}

.blogs-section__sub-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

/* Empty */
.blogs-section__empty {
  text-align: center;
  padding: 60px 20px;
  color: var(--color-text-muted);
  font-size: 16px;
}

/* View All Button */
.blogs-section__action {
  display: flex;
  justify-content: center;
  margin-top: 48px;
}

.blogs-section__view-all {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(6, 182, 212, 0.06));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: var(--color-text);
  border-radius: 100px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(96, 165, 250, 0.25);
}

.blogs-section__view-all::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.12), transparent);
  transition: all 0.6s;
}

.blogs-section__view-all:hover::before {
  left: 100%;
}

.blogs-section__view-all:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(37, 99, 235, 0.2);
  border-color: rgba(96, 165, 250, 0.5);
}

.blogs-section__view-all-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #2563eb, #06b6d4);
  border-radius: 50%;
  transition: transform 0.4s ease;
}

.blogs-section__view-all:hover .blogs-section__view-all-icon {
  transform: translateX(4px);
}

.blogs-section__view-all-icon svg {
  width: 12px;
  height: 12px;
  color: white;
}

/* Reveal Animations */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), 
              transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 1200px) {
  .blogs-section__sub-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .blogs-section {
    padding: 80px 0 60px;
  }

  .blogs-section__sub-grid {
    grid-template-columns: 1fr;
  }

  .blogs-section__header {
    margin-bottom: 40px;
  }
}
</style>
