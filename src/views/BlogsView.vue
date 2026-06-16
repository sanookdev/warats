<template>
  <div class="blogs-page">
    <!-- Aurora Background -->
    <div class="blogs-page__aurora" aria-hidden="true">
      <div class="blogs-page__blob blogs-page__blob--1"></div>
      <div class="blogs-page__blob blogs-page__blob--2"></div>
      <div class="blogs-page__blob blogs-page__blob--3"></div>
    </div>

    <div class="blogs-page__container container">
      <!-- Header -->
      <div class="blogs-page__header animate-fadeInDown">
        <span class="blogs-page__label">Articles & Insights</span>
        <h1 class="blogs-page__title">Blog</h1>
        <p class="blogs-page__desc">
          รวมบทความเกี่ยวกับ Development, Technology และเรื่องราวที่น่าสนใจ
        </p>
      </div>

      <!-- Search & Filter -->
      <div class="blogs-page__filters animate-fadeInUp">
        <div class="blogs-page__search">
          <svg class="blogs-page__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="ค้นหาบทความ..."
            class="blogs-page__search-input"
            id="blog-search"
          />
        </div>
        <div class="blogs-page__tags-filter" v-if="allTags.length">
          <button
            class="blogs-page__tag-btn"
            :class="{ active: selectedTag === '' }"
            @click="selectedTag = ''"
          >
            ทั้งหมด
          </button>
          <button
            class="blogs-page__tag-btn"
            :class="{ active: selectedTag === tag }"
            v-for="tag in allTags"
            :key="tag"
            @click="selectedTag = selectedTag === tag ? '' : tag"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      <!-- Blog Grid -->
      <div class="blogs-page__grid" v-if="filteredBlogs.length">
        <div
          class="blogs-page__item reveal"
          v-for="(blog, index) in filteredBlogs"
          :key="blog.id"
          :style="{ transitionDelay: `${index * 0.08}s` }"
        >
          <BlogCard :blog="blog" />
        </div>
      </div>

      <!-- Empty -->
      <div class="blogs-page__empty" v-else>
        <div class="blogs-page__empty-icon">📝</div>
        <p>ไม่พบบทความที่ค้นหา</p>
      </div>
    </div>
  </div>
</template>

<script>
import BlogCard from '@/components/BlogCard.vue'
import { useBlogStore } from '@/composables/useBlogStore'

export default {
  name: 'BlogsView',
  components: { BlogCard },
  data() {
    return {
      blogs: [],
      searchQuery: '',
      selectedTag: '',
      observer: null
    }
  },
  computed: {
    allTags() {
      const tags = new Set()
      this.blogs.forEach((b) => (b.tags || []).forEach((t) => tags.add(t)))
      return Array.from(tags).sort()
    },
    filteredBlogs() {
      let result = this.blogs
      if (this.searchQuery.trim()) {
        const q = this.searchQuery.toLowerCase()
        result = result.filter(
          (b) =>
            b.title.toLowerCase().includes(q) ||
            b.excerpt.toLowerCase().includes(q) ||
            (b.tags || []).some((t) => t.toLowerCase().includes(q))
        )
      }
      if (this.selectedTag) {
        result = result.filter((b) => (b.tags || []).includes(this.selectedTag))
      }
      return result
    }
  },
  mounted() {
    const store = useBlogStore()
    this.blogs = store.getBlogs()
    this.$nextTick(() => this.initScrollReveal())
  },
  watch: {
    filteredBlogs() {
      this.$nextTick(() => {
        this.initScrollReveal()
      })
    }
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
        { threshold: 0.05 }
      )
      this.$el.querySelectorAll('.reveal').forEach((el) => this.observer.observe(el))
    }
  }
}
</script>

<style scoped>
.blogs-page {
  position: relative;
  min-height: 100vh;
  padding: 140px 0 80px;
  background-color: var(--color-bg);
  overflow: hidden;
}

/* Aurora */
.blogs-page__aurora {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.blogs-page__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.06;
}

[data-theme="dark"] .blogs-page__blob {
  opacity: 0.18;
}

.blogs-page__blob--1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #2563eb, transparent 65%);
  top: -200px;
  left: -100px;
  animation: blob-float-1 14s ease-in-out infinite;
}

.blogs-page__blob--2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #06b6d4, transparent 65%);
  bottom: -150px;
  right: -100px;
  animation: blob-float-2 18s ease-in-out infinite;
}

.blogs-page__blob--3 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #8b5cf6, transparent 65%);
  top: 40%;
  right: 20%;
  animation: blob-float-1 22s ease-in-out infinite reverse;
}

/* Header */
.blogs-page__container {
  position: relative;
  z-index: 1;
}

.blogs-page__header {
  text-align: center;
  margin-bottom: 48px;
}

.blogs-page__label {
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

.blogs-page__title {
  font-family: var(--font-serif);
  font-size: clamp(40px, 6vw, 64px);
  font-weight: 400;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #f1f5f9 0%, #93c5fd 35%, #22d3ee 65%, #f1f5f9 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-text-flow 5s ease infinite;
  margin-bottom: 16px;
}

:root:not([data-theme="dark"]) .blogs-page__title {
  background: linear-gradient(135deg, #1a1a1a 0%, #2563eb 40%, #06b6d4 70%, #1a1a1a 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@keyframes gradient-text-flow {
  0%, 100% { background-position: 0% center; }
  50% { background-position: 100% center; }
}

.blogs-page__desc {
  font-size: 15px;
  color: var(--color-text-secondary);
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.7;
}

/* Search & Filter */
.blogs-page__filters {
  margin-bottom: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.blogs-page__search {
  position: relative;
  width: 100%;
  max-width: 480px;
}

.blogs-page__search-icon {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: var(--color-text-muted);
  pointer-events: none;
}

.blogs-page__search-input {
  width: 100%;
  padding: 14px 20px 14px 48px;
  border-radius: 100px;
  border: 1px solid var(--color-border);
  background: var(--color-bg-secondary);
  color: var(--color-text);
  font-size: 14px;
  font-family: var(--font-sans);
  outline: none;
  transition: all 0.3s ease;
}

.blogs-page__search-input::placeholder {
  color: var(--color-text-muted);
}

.blogs-page__search-input:focus {
  border-color: #60a5fa;
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.15);
}

.blogs-page__tags-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.blogs-page__tag-btn {
  padding: 6px 16px;
  border-radius: 100px;
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-sans);
}

.blogs-page__tag-btn:hover {
  border-color: #60a5fa;
  color: #60a5fa;
}

.blogs-page__tag-btn.active {
  background: linear-gradient(135deg, #2563eb, #06b6d4);
  color: #fff;
  border-color: transparent;
}

/* Grid */
.blogs-page__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

/* Empty */
.blogs-page__empty {
  text-align: center;
  padding: 80px 20px;
  color: var(--color-text-muted);
}

.blogs-page__empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

/* Reveal */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s cubic-bezier(0.2, 0.8, 0.2, 1),
              transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 992px) {
  .blogs-page__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .blogs-page {
    padding: 120px 0 60px;
  }

  .blogs-page__grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
