<template>
  <div class="admin-login">
    <!-- Aurora -->
    <div class="admin-login__aurora" aria-hidden="true">
      <div class="admin-login__blob admin-login__blob--1"></div>
      <div class="admin-login__blob admin-login__blob--2"></div>
    </div>

    <div class="admin-login__card animate-scaleIn">
      <!-- Lock Icon -->
      <div class="admin-login__icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          <circle cx="12" cy="16" r="1" />
        </svg>
      </div>

      <h1 class="admin-login__title">Admin Login</h1>
      <p class="admin-login__desc">เข้าสู่ระบบเพื่อจัดการบทความ</p>

      <!-- Error -->
      <div class="admin-login__error" v-if="errorMsg">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
        {{ errorMsg }}
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="admin-login__form">
        <div class="admin-login__field">
          <label for="admin-username" class="admin-login__label">Username</label>
          <div class="admin-login__input-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <input
              v-model="username"
              type="text"
              id="admin-username"
              placeholder="Enter username"
              autocomplete="username"
              required
            />
          </div>
        </div>

        <div class="admin-login__field">
          <label for="admin-password" class="admin-login__label">Password</label>
          <div class="admin-login__input-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              id="admin-password"
              placeholder="Enter password"
              autocomplete="current-password"
              required
            />
            <button type="button" class="admin-login__toggle-pw" @click="showPassword = !showPassword">
              <svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            </button>
          </div>
        </div>

        <button type="submit" class="admin-login__submit" :disabled="isLoading">
          <span v-if="!isLoading">เข้าสู่ระบบ</span>
          <span v-else class="admin-login__spinner"></span>
        </button>
      </form>

      <router-link to="/" class="admin-login__home-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        กลับหน้าหลัก
      </router-link>
    </div>
  </div>
</template>

<script>
import { useAuth } from '@/composables/useAuth'

export default {
  name: 'AdminLoginView',
  data() {
    return {
      username: '',
      password: '',
      errorMsg: '',
      isLoading: false,
      showPassword: false
    }
  },
  mounted() {
    const { checkAuth } = useAuth()
    if (checkAuth()) {
      this.$router.push('/admin/dashboard')
    }
  },
  methods: {
    async handleLogin() {
      this.errorMsg = ''
      this.isLoading = true

      // Small delay for UX
      await new Promise((r) => setTimeout(r, 500))

      const { login } = useAuth()
      const result = login(this.username, this.password)

      if (result.success) {
        this.$router.push('/admin/dashboard')
      } else {
        this.errorMsg = result.message
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
.admin-login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg);
  position: relative;
  overflow: hidden;
  padding: 20px;
}

/* Aurora */
.admin-login__aurora {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.admin-login__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.08;
}

[data-theme="dark"] .admin-login__blob {
  opacity: 0.2;
}

.admin-login__blob--1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #2563eb, transparent 65%);
  top: -150px;
  left: -150px;
  animation: blob-float-1 14s ease-in-out infinite;
}

.admin-login__blob--2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #06b6d4, transparent 65%);
  bottom: -100px;
  right: -100px;
  animation: blob-float-2 18s ease-in-out infinite;
}

/* Card */
.admin-login__card {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 420px;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 24px;
  padding: 48px 40px;
  box-shadow: var(--shadow-xl);
}

/* Icon */
.admin-login__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.12), rgba(6, 182, 212, 0.08));
  border: 1px solid rgba(96, 165, 250, 0.2);
  margin: 0 auto 24px;
}

.admin-login__icon svg {
  width: 28px;
  height: 28px;
  color: #60a5fa;
}

/* Title */
.admin-login__title {
  font-family: var(--font-serif);
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  color: var(--color-text);
  margin-bottom: 8px;
}

.admin-login__desc {
  text-align: center;
  font-size: 14px;
  color: var(--color-text-muted);
  margin-bottom: 32px;
}

/* Error */
.admin-login__error {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #ef4444;
  font-size: 13px;
  margin-bottom: 20px;
  animation: fadeInDown 0.3s ease;
}

.admin-login__error svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

/* Form */
.admin-login__form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.admin-login__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.admin-login__label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
}

.admin-login__input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.admin-login__input-wrap > svg:first-child {
  position: absolute;
  left: 14px;
  width: 18px;
  height: 18px;
  color: var(--color-text-muted);
  pointer-events: none;
}

.admin-login__input-wrap input {
  width: 100%;
  padding: 14px 44px 14px 44px;
  border-radius: 14px;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text);
  font-size: 14px;
  font-family: var(--font-sans);
  outline: none;
  transition: all 0.3s ease;
}

.admin-login__input-wrap input:focus {
  border-color: #60a5fa;
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.15);
}

.admin-login__toggle-pw {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: var(--color-text-muted);
  transition: color 0.3s ease;
}

.admin-login__toggle-pw:hover {
  color: var(--color-text);
}

.admin-login__toggle-pw svg {
  width: 18px;
  height: 18px;
}

/* Submit */
.admin-login__submit {
  width: 100%;
  padding: 16px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(135deg, #2563eb, #06b6d4);
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s ease;
  margin-top: 8px;
  position: relative;
  overflow: hidden;
}

.admin-login__submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(37, 99, 235, 0.3);
}

.admin-login__submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.admin-login__spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Home Link */
.admin-login__home-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 24px;
  font-size: 13px;
  color: var(--color-text-muted);
  transition: color 0.3s ease;
  text-decoration: none;
}

.admin-login__home-link:hover {
  color: #60a5fa;
}

.admin-login__home-link svg {
  width: 14px;
  height: 14px;
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
