// Authentication composable - checks against .env credentials
import { ref } from 'vue'

const AUTH_KEY = 'portfolio_admin_auth'

const isAuthenticated = ref(!!sessionStorage.getItem(AUTH_KEY))

export function useAuth() {
  function login(username, password) {
    const envUser = import.meta.env.VITE_ADMIN_USERNAME
    const envPass = import.meta.env.VITE_ADMIN_PASSWORD

    if (username === envUser && password === envPass) {
      sessionStorage.setItem(AUTH_KEY, 'true')
      isAuthenticated.value = true
      return { success: true }
    }
    return { success: false, message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' }
  }

  function logout() {
    sessionStorage.removeItem(AUTH_KEY)
    isAuthenticated.value = false
  }

  function checkAuth() {
    return !!sessionStorage.getItem(AUTH_KEY)
  }

  return {
    isAuthenticated,
    login,
    logout,
    checkAuth
  }
}
