<template>
  <div class="blog-detail" v-if="blog">
    <!-- Hero -->
    <div class="blog-detail__hero">
      <div class="blog-detail__hero-bg" :style="heroStyle"></div>
      <div class="blog-detail__hero-overlay"></div>
      <div class="blog-detail__hero-content container">
        <router-link to="/blogs" class="blog-detail__back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5m7-7l-7 7 7 7" />
          </svg>
          <span>กลับไปหน้า Blog</span>
        </router-link>
        <div class="blog-detail__tags" v-if="blog.tags && blog.tags.length">
          <span class="blog-detail__tag" v-for="tag in blog.tags" :key="tag">{{ tag }}</span>
        </div>
        <h1 class="blog-detail__title animate-fadeInUp">{{ blog.title }}</h1>
        <div class="blog-detail__meta animate-fadeInUp delay-200">
          <span class="blog-detail__author">{{ blog.author }}</span>
          <span class="blog-detail__separator">·</span>
          <time class="blog-detail__date">{{ formatDate(blog.createdAt) }}</time>
          <template v-if="blog.updatedAt !== blog.createdAt">
            <span class="blog-detail__separator">·</span>
            <span class="blog-detail__updated">อัปเดต {{ formatDate(blog.updatedAt) }}</span>
          </template>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="blog-detail__body">
      <div class="blog-detail__container container">
        <article class="blog-detail__content ql-editor" v-html="blog.content"></article>

        <!-- Share -->
        <div class="blog-detail__share">
          <span class="blog-detail__share-label">แชร์บทความนี้</span>
          <div class="blog-detail__share-links">
            <a
              :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(currentUrl)}`"
              target="_blank"
              class="blog-detail__share-btn"
              aria-label="Share on Twitter"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`"
              target="_blank"
              class="blog-detail__share-btn"
              aria-label="Share on Facebook"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <button
              @click="copyLink"
              class="blog-detail__share-btn"
              :class="{ copied: linkCopied }"
              aria-label="Copy link"
            >
              <svg v-if="!linkCopied" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Related -->
        <div class="blog-detail__related" v-if="relatedBlogs.length">
          <h3 class="blog-detail__related-title">บทความที่เกี่ยวข้อง</h3>
          <div class="blog-detail__related-grid">
            <router-link
              v-for="related in relatedBlogs"
              :key="related.id"
              :to="`/blogs/${related.slug}`"
              class="blog-detail__related-card"
            >
              <div class="blog-detail__related-img" :style="getRelatedStyle(related)"></div>
              <div class="blog-detail__related-info">
                <h4>{{ related.title }}</h4>
                <time>{{ formatDate(related.updatedAt) }}</time>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Not Found -->
  <div class="blog-detail blog-detail--not-found" v-else>
    <div class="container" style="text-align: center; padding: 200px 20px 100px;">
      <h2 style="font-family: var(--font-serif); font-size: 36px; margin-bottom: 16px;">ไม่พบบทความ</h2>
      <p style="color: var(--color-text-secondary); margin-bottom: 32px;">บทความที่คุณค้นหาอาจถูกลบหรือไม่มีอยู่</p>
      <router-link to="/blogs" class="blog-detail__back" style="display: inline-flex;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5m7-7l-7 7 7 7" />
        </svg>
        <span>กลับไปหน้า Blog</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { useBlogStore } from '@/composables/useBlogStore'

export default {
  name: 'BlogDetailView',
  data() {
    return {
      blog: null,
      relatedBlogs: [],
      linkCopied: false
    }
  },
  computed: {
    currentUrl() {
      return window.location.href
    },
    heroStyle() {
      if (!this.blog) return {}
      if (this.blog.coverImage) {
        return { backgroundImage: `url(${this.blog.coverImage})` }
      }
      const hash = this.hashString(this.blog.title || '')
      const hue1 = hash % 360
      const hue2 = (hash * 7) % 360
      return {
        background: `linear-gradient(135deg, hsl(${hue1}, 70%, 35%), hsl(${hue2}, 60%, 25%))`
      }
    }
  },
  watch: {
    '$route.params.slug': {
      handler() {
        this.loadBlog()
      },
      immediate: true
    }
  },
  methods: {
    loadBlog() {
      const store = useBlogStore()
      const slug = this.$route.params.slug
      this.blog = store.getBlogBySlug(slug)
      if (this.blog) {
        this.relatedBlogs = store.getRelatedBlogs(slug, this.blog.tags, 3)
        document.title = `${this.blog.title} | Blog`
      }
      window.scrollTo(0, 0)
    },
    formatDate(dateStr) {
      if (!dateStr) return ''
      const d = new Date(dateStr)
      return d.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    hashString(str) {
      let hash = 0
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash |= 0
      }
      return Math.abs(hash)
    },
    getRelatedStyle(blog) {
      if (blog.coverImage) {
        return { backgroundImage: `url(${blog.coverImage})` }
      }
      const hash = this.hashString(blog.title || '')
      const hue1 = hash % 360
      const hue2 = (hash * 7) % 360
      return {
        background: `linear-gradient(135deg, hsl(${hue1}, 70%, 45%), hsl(${hue2}, 60%, 35%))`
      }
    },
    async copyLink() {
      try {
        await navigator.clipboard.writeText(this.currentUrl)
        this.linkCopied = true
        setTimeout(() => { this.linkCopied = false }, 2000)
      } catch {
        // fallback
      }
    }
  }
}
</script>

<style scoped>
.blog-detail {
  min-height: 100vh;
  background-color: var(--color-bg);
}

/* Hero */
.blog-detail__hero {
  position: relative;
  min-height: 420px;
  display: flex;
  align-items: flex-end;
  padding: 60px 0 48px;
  overflow: hidden;
}

.blog-detail__hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.6s ease;
}

.blog-detail__hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%);
}

.blog-detail__hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
}

.blog-detail__back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 24px;
  transition: all 0.3s ease;
  text-decoration: none;
}

.blog-detail__back:hover {
  color: #fff;
  gap: 12px;
}

.blog-detail__back svg {
  width: 16px;
  height: 16px;
}

.blog-detail__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.blog-detail__tag {
  padding: 4px 14px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.blog-detail__title {
  font-family: var(--font-serif);
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 600;
  color: #fff;
  line-height: 1.3;
  max-width: 800px;
  margin-bottom: 20px;
}

.blog-detail__meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
}

.blog-detail__separator {
  opacity: 0.5;
}

/* Content */
.blog-detail__body {
  padding: 60px 0 80px;
}

.blog-detail__container {
  max-width: 820px;
}

.blog-detail__content {
  font-size: 16px;
  line-height: 1.9;
  color: var(--color-text);
}

.blog-detail__content :deep(h2) {
  font-family: var(--font-serif);
  font-size: 28px;
  font-weight: 600;
  margin: 48px 0 16px;
  color: var(--color-text);
}

.blog-detail__content :deep(h3) {
  font-family: var(--font-serif);
  font-size: 22px;
  font-weight: 600;
  margin: 36px 0 12px;
  color: var(--color-text);
}

.blog-detail__content :deep(p) {
  margin-bottom: 20px;
  color: var(--color-text-secondary);
  line-height: 1.9;
}

.blog-detail__content :deep(ul),
.blog-detail__content :deep(ol) {
  margin: 16px 0;
  padding-left: 24px;
  color: var(--color-text-secondary);
}

.blog-detail__content :deep(li) {
  margin-bottom: 8px;
  line-height: 1.7;
}

.blog-detail__content :deep(blockquote) {
  border-left: 4px solid #60a5fa;
  padding: 16px 24px;
  margin: 24px 0;
  background: rgba(96, 165, 250, 0.06);
  border-radius: 0 12px 12px 0;
  font-style: italic;
  color: var(--color-text-secondary);
}

.blog-detail__content :deep(pre),
.blog-detail__content :deep(.ql-syntax) {
  background: #1e1e2e;
  color: #cdd6f4;
  padding: 20px 24px;
  border-radius: 12px;
  overflow-x: auto;
  margin: 24px 0;
  font-size: 14px;
  line-height: 1.6;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}

.blog-detail__content :deep(code) {
  background: rgba(96, 165, 250, 0.1);
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 0.9em;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  color: #60a5fa;
}

.blog-detail__content :deep(pre code),
.blog-detail__content :deep(.ql-syntax code) {
  background: none;
  padding: 0;
  color: inherit;
}

.blog-detail__content :deep(img) {
  max-width: 100%;
  border-radius: 12px;
  margin: 24px 0;
}

.blog-detail__content :deep(a) {
  color: #60a5fa;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.3s ease;
}

.blog-detail__content :deep(a:hover) {
  color: #93c5fd;
}

/* Share */
.blog-detail__share {
  margin-top: 60px;
  padding-top: 32px;
  border-top: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  gap: 16px;
}

.blog-detail__share-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.blog-detail__share-links {
  display: flex;
  gap: 10px;
}

.blog-detail__share-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-gray-100);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
}

.blog-detail__share-btn:hover {
  background: rgba(96, 165, 250, 0.1);
  border-color: #60a5fa;
  color: #60a5fa;
  transform: translateY(-2px);
}

.blog-detail__share-btn.copied {
  background: rgba(34, 197, 94, 0.1);
  border-color: #22c55e;
  color: #22c55e;
}

.blog-detail__share-btn svg {
  width: 16px;
  height: 16px;
}

/* Related */
.blog-detail__related {
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid var(--color-border);
}

.blog-detail__related-title {
  font-family: var(--font-serif);
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  color: var(--color-text);
}

.blog-detail__related-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.blog-detail__related-card {
  border-radius: 16px;
  overflow: hidden;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
}

.blog-detail__related-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(37, 99, 235, 0.12);
  border-color: rgba(96, 165, 250, 0.3);
}

.blog-detail__related-img {
  height: 140px;
  background-size: cover;
  background-position: center;
}

.blog-detail__related-info {
  padding: 16px;
}

.blog-detail__related-info h4 {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 8px;
  color: var(--color-text);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-detail__related-info time {
  font-size: 12px;
  color: var(--color-text-muted);
}

/* Responsive */
@media (max-width: 768px) {
  .blog-detail__hero {
    min-height: 320px;
  }

  .blog-detail__title {
    font-size: 28px;
  }

  .blog-detail__related-grid {
    grid-template-columns: 1fr;
  }

  .blog-detail__share {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
