<template>
  <div class="blog-editor">
    <div class="blog-editor__container container">
      <!-- Header -->
      <div class="blog-editor__header">
        <div>
          <router-link to="/admin/dashboard" class="blog-editor__back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5m7-7l-7 7 7 7" />
            </svg>
            กลับ Dashboard
          </router-link>
          <h1 class="blog-editor__title">{{ isEditing ? 'แก้ไขบทความ' : 'เขียนบทความใหม่' }}</h1>
        </div>
        <div class="blog-editor__header-actions">
          <button @click="handleSave" class="blog-editor__btn blog-editor__btn--primary" :disabled="isSaving">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            {{ isSaving ? 'กำลังบันทึก...' : 'บันทึก' }}
          </button>
        </div>
      </div>

      <!-- Success Message -->
      <Transition name="slide">
        <div class="blog-editor__success" v-if="showSuccess">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          บันทึกเรียบร้อย!
        </div>
      </Transition>

      <!-- Form -->
      <div class="blog-editor__form">
        <!-- Title -->
        <div class="blog-editor__field">
          <label class="blog-editor__label" for="blog-title">ชื่อบทความ</label>
          <input
            v-model="form.title"
            type="text"
            id="blog-title"
            class="blog-editor__input"
            placeholder="เขียนชื่อบทความที่น่าสนใจ..."
          />
        </div>

        <!-- Excerpt -->
        <div class="blog-editor__field">
          <label class="blog-editor__label" for="blog-excerpt">คำอธิบายสั้น</label>
          <textarea
            v-model="form.excerpt"
            id="blog-excerpt"
            class="blog-editor__textarea"
            placeholder="เขียนสรุปย่อสำหรับแสดงใน card..."
            rows="3"
          ></textarea>
        </div>

        <!-- Two Columns: Cover Image + Tags -->
        <div class="blog-editor__row">
          <div class="blog-editor__field">
            <label class="blog-editor__label" for="blog-cover">รูปปก (URL)</label>
            <input
              v-model="form.coverImage"
              type="text"
              id="blog-cover"
              class="blog-editor__input"
              placeholder="https://example.com/image.jpg (ปล่อยว่างใช้ gradient)"
            />
          </div>
          <div class="blog-editor__field">
            <label class="blog-editor__label" for="blog-tags">แท็ก</label>
            <input
              v-model="tagsInput"
              type="text"
              id="blog-tags"
              class="blog-editor__input"
              placeholder="Vue.js, JavaScript, Frontend (คั่นด้วย ,)"
            />
          </div>
        </div>

        <!-- Cover Preview -->
        <div class="blog-editor__cover-preview" v-if="form.coverImage">
          <img :src="form.coverImage" alt="Cover preview" @error="form.coverImage = ''" />
        </div>

        <!-- Quill Editor -->
        <div class="blog-editor__field">
          <label class="blog-editor__label">เนื้อหา</label>
          <div class="blog-editor__quill-wrap">
            <div ref="quillEditor" id="quill-editor"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { useBlogStore } from '@/composables/useBlogStore'

export default {
  name: 'AdminBlogEditorView',
  data() {
    return {
      form: {
        title: '',
        excerpt: '',
        coverImage: '',
        content: ''
      },
      tagsInput: '',
      quill: null,
      isEditing: false,
      editId: null,
      isSaving: false,
      showSuccess: false
    }
  },
  mounted() {
    this.initQuill()

    // If editing, load blog data
    const id = this.$route.params.id
    if (id) {
      this.isEditing = true
      this.editId = id
      this.loadBlog(id)
    }
  },
  beforeUnmount() {
    // Quill cleanup not strictly needed but good practice
    this.quill = null
  },
  methods: {
    initQuill() {
      this.quill = new Quill(this.$refs.quillEditor, {
        theme: 'snow',
        placeholder: 'เขียนเนื้อหาบทความที่นี่...',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['link', 'image'],
            [{ align: [] }],
            ['clean']
          ]
        }
      })

      // Sync content on change
      this.quill.on('text-change', () => {
        this.form.content = this.quill.root.innerHTML
      })
    },
    loadBlog(id) {
      const store = useBlogStore()
      const blog = store.getBlogById(id)
      if (blog) {
        this.form.title = blog.title
        this.form.excerpt = blog.excerpt
        this.form.coverImage = blog.coverImage || ''
        this.form.content = blog.content
        this.tagsInput = (blog.tags || []).join(', ')
        // Set Quill content
        if (this.quill && blog.content) {
          this.quill.root.innerHTML = blog.content
        }
      }
    },
    handleSave() {
      if (!this.form.title.trim()) {
        alert('กรุณาใส่ชื่อบทความ')
        return
      }

      this.isSaving = true
      const store = useBlogStore()
      const tags = this.tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)

      const data = {
        title: this.form.title.trim(),
        excerpt: this.form.excerpt.trim(),
        coverImage: this.form.coverImage.trim(),
        content: this.form.content,
        tags
      }

      if (this.isEditing && this.editId) {
        store.updateBlog(this.editId, data)
      } else {
        const created = store.createBlog(data)
        // After creation, switch to edit mode
        this.isEditing = true
        this.editId = created.id
        this.$router.replace(`/admin/blog/edit/${created.id}`)
      }

      this.isSaving = false
      this.showSuccess = true
      setTimeout(() => {
        this.showSuccess = false
      }, 3000)
    }
  }
}
</script>

<style scoped>
.blog-editor {
  min-height: 100vh;
  padding: 120px 0 80px;
  background-color: var(--color-bg);
}

/* Header */
.blog-editor__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 36px;
  gap: 20px;
  flex-wrap: wrap;
}

.blog-editor__back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--color-text-muted);
  text-decoration: none;
  transition: all 0.3s ease;
  margin-bottom: 12px;
}

.blog-editor__back:hover {
  color: #60a5fa;
  gap: 10px;
}

.blog-editor__back svg {
  width: 14px;
  height: 14px;
}

.blog-editor__title {
  font-family: var(--font-serif);
  font-size: 28px;
  font-weight: 600;
  color: var(--color-text);
}

/* Buttons */
.blog-editor__btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  font-family: var(--font-sans);
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.blog-editor__btn svg {
  width: 16px;
  height: 16px;
}

.blog-editor__btn--primary {
  background: linear-gradient(135deg, #2563eb, #06b6d4);
  color: white;
}

.blog-editor__btn--primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.3);
}

.blog-editor__btn--primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Success */
.blog-editor__success {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 20px;
  border-radius: 12px;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  color: #22c55e;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 24px;
}

.blog-editor__success svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Form */
.blog-editor__form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 36px;
}

.blog-editor__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.blog-editor__label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
}

.blog-editor__input {
  padding: 14px 18px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text);
  font-size: 14px;
  font-family: var(--font-sans);
  outline: none;
  transition: all 0.3s ease;
}

.blog-editor__input:focus {
  border-color: #60a5fa;
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.12);
}

.blog-editor__textarea {
  padding: 14px 18px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text);
  font-size: 14px;
  font-family: var(--font-sans);
  outline: none;
  transition: all 0.3s ease;
  resize: vertical;
  line-height: 1.6;
}

.blog-editor__textarea:focus {
  border-color: #60a5fa;
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.12);
}

.blog-editor__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

/* Cover Preview */
.blog-editor__cover-preview {
  border-radius: 12px;
  overflow: hidden;
  max-height: 250px;
  border: 1px solid var(--color-border);
}

.blog-editor__cover-preview img {
  width: 100%;
  height: 100%;
  max-height: 250px;
  object-fit: cover;
}

/* Quill Wrapper */
.blog-editor__quill-wrap {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--color-border);
}

.blog-editor__quill-wrap :deep(.ql-toolbar) {
  border: none;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg);
  padding: 12px;
}

.blog-editor__quill-wrap :deep(.ql-container) {
  border: none;
  font-family: var(--font-sans);
  font-size: 15px;
}

.blog-editor__quill-wrap :deep(.ql-editor) {
  min-height: 400px;
  padding: 24px;
  line-height: 1.8;
  color: var(--color-text);
  background: var(--color-bg);
}

.blog-editor__quill-wrap :deep(.ql-editor.ql-blank::before) {
  color: var(--color-text-muted);
  font-style: normal;
}

/* Quill toolbar icons adapt to theme */
.blog-editor__quill-wrap :deep(.ql-toolbar .ql-stroke) {
  stroke: var(--color-text-secondary);
}

.blog-editor__quill-wrap :deep(.ql-toolbar .ql-fill) {
  fill: var(--color-text-secondary);
}

.blog-editor__quill-wrap :deep(.ql-toolbar .ql-picker-label) {
  color: var(--color-text-secondary);
}

.blog-editor__quill-wrap :deep(.ql-toolbar button:hover .ql-stroke) {
  stroke: #60a5fa;
}

.blog-editor__quill-wrap :deep(.ql-toolbar button:hover .ql-fill) {
  fill: #60a5fa;
}

.blog-editor__quill-wrap :deep(.ql-toolbar button.ql-active .ql-stroke) {
  stroke: #60a5fa;
}

.blog-editor__quill-wrap :deep(.ql-toolbar button.ql-active .ql-fill) {
  fill: #60a5fa;
}

.blog-editor__quill-wrap :deep(.ql-toolbar .ql-picker-label:hover) {
  color: #60a5fa;
}

.blog-editor__quill-wrap :deep(.ql-snow .ql-picker-options) {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  box-shadow: var(--shadow-lg);
}

.blog-editor__quill-wrap :deep(.ql-editor h1),
.blog-editor__quill-wrap :deep(.ql-editor h2),
.blog-editor__quill-wrap :deep(.ql-editor h3) {
  font-family: var(--font-serif);
  color: var(--color-text);
}

.blog-editor__quill-wrap :deep(.ql-editor blockquote) {
  border-left: 4px solid #60a5fa;
  padding: 12px 20px;
  background: rgba(96, 165, 250, 0.06);
  border-radius: 0 8px 8px 0;
}

.blog-editor__quill-wrap :deep(.ql-editor pre.ql-syntax) {
  background: #1e1e2e;
  color: #cdd6f4;
  padding: 16px 20px;
  border-radius: 10px;
  font-size: 14px;
}

/* Responsive */
@media (max-width: 768px) {
  .blog-editor {
    padding: 100px 0 60px;
  }

  .blog-editor__form {
    padding: 24px;
  }

  .blog-editor__row {
    grid-template-columns: 1fr;
  }

  .blog-editor__header {
    flex-direction: column;
  }
}
</style>
