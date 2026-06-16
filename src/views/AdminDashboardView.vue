<template>
  <div class="admin-dash">
    <div class="admin-dash__container container">
      <!-- Header -->
      <div class="admin-dash__header">
        <div class="admin-dash__header-left">
          <h1 class="admin-dash__title">📝 Blog Dashboard</h1>
          <p class="admin-dash__subtitle">จัดการบทความทั้งหมด</p>
        </div>
        <div class="admin-dash__header-actions">
          <router-link to="/admin/blog/new" class="admin-dash__btn admin-dash__btn--primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            เขียนบทความใหม่
          </router-link>
          <button @click="handleLogout" class="admin-dash__btn admin-dash__btn--ghost">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            ออกจากระบบ
          </button>
        </div>
      </div>

      <!-- Stats -->
      <div class="admin-dash__stats">
        <div class="admin-dash__stat-card">
          <span class="admin-dash__stat-number">{{ blogs.length }}</span>
          <span class="admin-dash__stat-label">บทความทั้งหมด</span>
        </div>
        <div class="admin-dash__stat-card">
          <span class="admin-dash__stat-number">{{ totalTags }}</span>
          <span class="admin-dash__stat-label">แท็กทั้งหมด</span>
        </div>
        <div class="admin-dash__stat-card">
          <span class="admin-dash__stat-number">{{ latestUpdate }}</span>
          <span class="admin-dash__stat-label">อัปเดตล่าสุด</span>
        </div>
      </div>

      <!-- Blog List -->
      <div class="admin-dash__list">
        <div class="admin-dash__list-header">
          <h2 class="admin-dash__list-title">รายการบทความ</h2>
        </div>

        <div class="admin-dash__table-wrap" v-if="blogs.length">
          <table class="admin-dash__table">
            <thead>
              <tr>
                <th>บทความ</th>
                <th>แท็ก</th>
                <th>วันที่สร้าง</th>
                <th>อัปเดต</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="blog in blogs" :key="blog.id">
                <td>
                  <div class="admin-dash__blog-info">
                    <div class="admin-dash__blog-thumb" :style="getThumbStyle(blog)"></div>
                    <div>
                      <div class="admin-dash__blog-title">{{ blog.title }}</div>
                      <div class="admin-dash__blog-excerpt">{{ blog.excerpt }}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="admin-dash__blog-tags">
                    <span v-for="tag in (blog.tags || []).slice(0, 2)" :key="tag" class="admin-dash__tag">{{ tag }}</span>
                    <span v-if="(blog.tags || []).length > 2" class="admin-dash__tag admin-dash__tag--more">+{{ blog.tags.length - 2 }}</span>
                  </div>
                </td>
                <td class="admin-dash__date">{{ formatDate(blog.createdAt) }}</td>
                <td class="admin-dash__date">{{ formatDate(blog.updatedAt) }}</td>
                <td>
                  <div class="admin-dash__actions">
                    <router-link :to="`/blogs/${blog.slug}`" class="admin-dash__action-btn" title="ดู">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </router-link>
                    <router-link :to="`/admin/blog/edit/${blog.id}`" class="admin-dash__action-btn" title="แก้ไข">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </router-link>
                    <button @click="confirmDelete(blog)" class="admin-dash__action-btn admin-dash__action-btn--danger" title="ลบ">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="admin-dash__empty" v-else>
          <p>ยังไม่มีบทความ</p>
          <router-link to="/admin/blog/new" class="admin-dash__btn admin-dash__btn--primary">
            เขียนบทความแรก
          </router-link>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div class="admin-dash__modal-overlay" v-if="showDeleteModal" @click.self="showDeleteModal = false">
          <div class="admin-dash__modal">
            <div class="admin-dash__modal-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <h3>ยืนยันการลบ</h3>
            <p>คุณต้องการลบบทความ <strong>"{{ deletingBlog?.title }}"</strong> ใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้</p>
            <div class="admin-dash__modal-actions">
              <button @click="showDeleteModal = false" class="admin-dash__btn admin-dash__btn--ghost">ยกเลิก</button>
              <button @click="doDelete" class="admin-dash__btn admin-dash__btn--danger">ลบบทความ</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script>
import { useBlogStore } from '@/composables/useBlogStore'
import { useAuth } from '@/composables/useAuth'

export default {
  name: 'AdminDashboardView',
  data() {
    return {
      blogs: [],
      showDeleteModal: false,
      deletingBlog: null
    }
  },
  computed: {
    totalTags() {
      const tags = new Set()
      this.blogs.forEach((b) => (b.tags || []).forEach((t) => tags.add(t)))
      return tags.size
    },
    latestUpdate() {
      if (!this.blogs.length) return '-'
      const latest = this.blogs[0]
      return this.formatDate(latest.updatedAt)
    }
  },
  mounted() {
    this.loadBlogs()
  },
  methods: {
    loadBlogs() {
      const store = useBlogStore()
      this.blogs = store.getBlogs()
    },
    formatDate(dateStr) {
      if (!dateStr) return '-'
      const d = new Date(dateStr)
      return d.toLocaleDateString('th-TH', { month: 'short', day: 'numeric', year: '2-digit' })
    },
    getThumbStyle(blog) {
      if (blog.coverImage) {
        return { backgroundImage: `url(${blog.coverImage})` }
      }
      let hash = 0
      for (let i = 0; i < (blog.title || '').length; i++) {
        hash = ((hash << 5) - hash) + blog.title.charCodeAt(i)
        hash |= 0
      }
      hash = Math.abs(hash)
      return {
        background: `linear-gradient(135deg, hsl(${hash % 360}, 70%, 45%), hsl(${(hash * 7) % 360}, 60%, 35%))`
      }
    },
    confirmDelete(blog) {
      this.deletingBlog = blog
      this.showDeleteModal = true
    },
    doDelete() {
      if (this.deletingBlog) {
        const store = useBlogStore()
        store.deleteBlog(this.deletingBlog.id)
        this.loadBlogs()
      }
      this.showDeleteModal = false
      this.deletingBlog = null
    },
    handleLogout() {
      const { logout } = useAuth()
      logout()
      this.$router.push('/admin')
    }
  }
}
</script>

<style scoped>
.admin-dash {
  min-height: 100vh;
  padding: 120px 0 80px;
  background-color: var(--color-bg);
}

/* Header */
.admin-dash__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 36px;
  gap: 20px;
  flex-wrap: wrap;
}

.admin-dash__title {
  font-family: var(--font-serif);
  font-size: 32px;
  font-weight: 600;
  color: var(--color-text);
}

.admin-dash__subtitle {
  font-size: 14px;
  color: var(--color-text-muted);
  margin-top: 4px;
}

.admin-dash__header-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

/* Buttons */
.admin-dash__btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  font-family: var(--font-sans);
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  border: none;
}

.admin-dash__btn svg {
  width: 16px;
  height: 16px;
}

.admin-dash__btn--primary {
  background: linear-gradient(135deg, #2563eb, #06b6d4);
  color: white;
}

.admin-dash__btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.3);
}

.admin-dash__btn--ghost {
  background: transparent;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
}

.admin-dash__btn--ghost:hover {
  border-color: var(--color-text-muted);
  color: var(--color-text);
}

.admin-dash__btn--danger {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.admin-dash__btn--danger:hover {
  background: #ef4444;
  color: white;
  transform: translateY(-2px);
}

/* Stats */
.admin-dash__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 36px;
}

.admin-dash__stat-card {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: all 0.3s ease;
}

.admin-dash__stat-card:hover {
  border-color: rgba(96, 165, 250, 0.3);
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.08);
}

.admin-dash__stat-number {
  font-family: var(--font-serif);
  font-size: 28px;
  font-weight: 600;
  color: var(--color-text);
}

.admin-dash__stat-label {
  font-size: 12px;
  color: var(--color-text-muted);
  letter-spacing: 0.03em;
}

/* Table */
.admin-dash__list {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  overflow: hidden;
}

.admin-dash__list-header {
  padding: 24px 28px 0;
}

.admin-dash__list-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
}

.admin-dash__table-wrap {
  overflow-x: auto;
  padding: 16px 0;
}

.admin-dash__table {
  width: 100%;
  border-collapse: collapse;
}

.admin-dash__table th {
  padding: 12px 28px;
  text-align: left;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  border-bottom: 1px solid var(--color-border);
}

.admin-dash__table td {
  padding: 16px 28px;
  border-bottom: 1px solid var(--color-border-light);
  vertical-align: middle;
}

.admin-dash__table tr:last-child td {
  border-bottom: none;
}

.admin-dash__table tr:hover td {
  background: rgba(96, 165, 250, 0.03);
}

.admin-dash__blog-info {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 280px;
}

.admin-dash__blog-thumb {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  flex-shrink: 0;
  background-size: cover;
  background-position: center;
}

.admin-dash__blog-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.admin-dash__blog-excerpt {
  font-size: 12px;
  color: var(--color-text-muted);
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-top: 2px;
}

.admin-dash__blog-tags {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.admin-dash__tag {
  padding: 3px 10px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 500;
  background: rgba(96, 165, 250, 0.1);
  color: #60a5fa;
  white-space: nowrap;
}

.admin-dash__tag--more {
  background: var(--color-gray-100);
  color: var(--color-text-muted);
}

.admin-dash__date {
  font-size: 13px;
  color: var(--color-text-secondary);
  white-space: nowrap;
}

/* Actions */
.admin-dash__actions {
  display: flex;
  gap: 6px;
}

.admin-dash__action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.admin-dash__action-btn:hover {
  background: rgba(96, 165, 250, 0.1);
  border-color: #60a5fa;
  color: #60a5fa;
}

.admin-dash__action-btn--danger:hover {
  background: rgba(239, 68, 68, 0.1);
  border-color: #ef4444;
  color: #ef4444;
}

.admin-dash__action-btn svg {
  width: 14px;
  height: 14px;
}

/* Empty */
.admin-dash__empty {
  text-align: center;
  padding: 60px 20px;
  color: var(--color-text-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

/* Modal */
.admin-dash__modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.admin-dash__modal {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 36px;
  max-width: 420px;
  width: 100%;
  text-align: center;
}

.admin-dash__modal-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(239, 68, 68, 0.1);
  margin-bottom: 16px;
}

.admin-dash__modal-icon svg {
  width: 24px;
  height: 24px;
  color: #ef4444;
}

.admin-dash__modal h3 {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 12px;
}

.admin-dash__modal p {
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 24px;
}

.admin-dash__modal-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.admin-dash__modal-actions .admin-dash__btn {
  flex: 1;
  justify-content: center;
}

/* Modal Transition */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .admin-dash__modal,
.modal-leave-to .admin-dash__modal {
  transform: scale(0.9);
}

/* Responsive */
@media (max-width: 768px) {
  .admin-dash {
    padding: 100px 0 60px;
  }

  .admin-dash__header {
    flex-direction: column;
  }

  .admin-dash__stats {
    grid-template-columns: 1fr;
  }

  .admin-dash__table th:nth-child(2),
  .admin-dash__table td:nth-child(2),
  .admin-dash__table th:nth-child(3),
  .admin-dash__table td:nth-child(3) {
    display: none;
  }
}
</style>
