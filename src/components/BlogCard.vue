<template>
  <router-link :to="`/blogs/${blog.slug}`" class="blog-card" :class="{ 'blog-card--hero': isHero }">
    <div class="blog-card__image-wrap">
      <div class="blog-card__image-bg" :style="imageStyle"></div>
      <div class="blog-card__image-overlay"></div>
      <div class="blog-card__tags" v-if="blog.tags && blog.tags.length">
        <span class="blog-card__tag" v-for="tag in displayTags" :key="tag">{{ tag }}</span>
      </div>
    </div>
    <div class="blog-card__body">
      <div class="blog-card__meta">
        <time class="blog-card__date">{{ formatDate(blog.updatedAt || blog.createdAt) }}</time>
      </div>
      <h3 class="blog-card__title">{{ blog.title }}</h3>
      <p class="blog-card__excerpt" v-if="blog.excerpt">{{ blog.excerpt }}</p>
      <div class="blog-card__read-more">
        <span>อ่านต่อ</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14m-7-7l7 7-7 7" />
        </svg>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'BlogCard',
  props: {
    blog: { type: Object, required: true },
    isHero: { type: Boolean, default: false }
  },
  computed: {
    displayTags() {
      return (this.blog.tags || []).slice(0, 3)
    },
    imageStyle() {
      if (this.blog.coverImage) {
        return { backgroundImage: `url(${this.blog.coverImage})` }
      }
      // Generate a gradient based on the blog title hash
      const hash = this.hashString(this.blog.title || '')
      const hue1 = hash % 360
      const hue2 = (hash * 7) % 360
      return {
        background: `linear-gradient(135deg, hsl(${hue1}, 70%, 45%), hsl(${hue2}, 60%, 35%))`
      }
    }
  },
  methods: {
    formatDate(dateStr) {
      if (!dateStr) return ''
      const d = new Date(dateStr)
      return d.toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })
    },
    hashString(str) {
      let hash = 0
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash |= 0
      }
      return Math.abs(hash)
    }
  }
}
</script>

<style scoped>
.blog-card {
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  overflow: hidden;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  color: inherit;
  position: relative;
}

.blog-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(37, 99, 235, 0.15);
  border-color: rgba(96, 165, 250, 0.3);
}

[data-theme="dark"] .blog-card:hover {
  box-shadow: 0 20px 60px rgba(37, 99, 235, 0.25);
}

/* Hero variant */
.blog-card--hero {
  flex-direction: row;
  min-height: 340px;
}

.blog-card--hero .blog-card__image-wrap {
  width: 55%;
  min-height: 340px;
  flex-shrink: 0;
}

.blog-card--hero .blog-card__body {
  padding: 36px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.blog-card--hero .blog-card__title {
  font-size: clamp(22px, 2.5vw, 30px);
}

.blog-card--hero .blog-card__excerpt {
  font-size: 15px;
  -webkit-line-clamp: 4;
}

/* Image */
.blog-card__image-wrap {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.blog-card--hero .blog-card__image-wrap {
  height: auto;
}

.blog-card__image-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.blog-card:hover .blog-card__image-bg {
  transform: scale(1.08);
}

.blog-card__image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 40%, rgba(0, 0, 0, 0.5) 100%);
  pointer-events: none;
}

.blog-card__tags {
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  z-index: 2;
}

.blog-card__tag {
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Body */
.blog-card__body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.blog-card__meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.blog-card__date {
  font-size: 12px;
  color: var(--color-text-muted);
  letter-spacing: 0.03em;
}

.blog-card__title {
  font-family: var(--font-serif);
  font-size: clamp(16px, 1.5vw, 20px);
  font-weight: 600;
  line-height: 1.4;
  color: var(--color-text);
  transition: color 0.3s ease;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-card:hover .blog-card__title {
  color: #60a5fa;
}

.blog-card__excerpt {
  font-size: 13px;
  line-height: 1.7;
  color: var(--color-text-secondary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-card__read-more {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #60a5fa;
  margin-top: auto;
  padding-top: 8px;
  transition: gap 0.3s ease;
}

.blog-card:hover .blog-card__read-more {
  gap: 10px;
}

.blog-card__read-more svg {
  width: 14px;
  height: 14px;
  transition: transform 0.3s ease;
}

.blog-card:hover .blog-card__read-more svg {
  transform: translateX(4px);
}

/* Responsive */
@media (max-width: 768px) {
  .blog-card--hero {
    flex-direction: column;
    min-height: auto;
  }

  .blog-card--hero .blog-card__image-wrap {
    width: 100%;
    min-height: 220px;
    height: 220px;
  }

  .blog-card--hero .blog-card__body {
    padding: 24px;
  }

  .blog-card--hero .blog-card__title {
    font-size: 20px;
  }
}
</style>
