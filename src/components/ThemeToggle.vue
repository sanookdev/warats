<template>
  <button 
    class="theme-toggle" 
    @click="toggleTheme"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <!-- Sun Icon (Light Mode) -->
    <svg v-if="isDark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="5"/>
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
    <!-- Moon Icon (Dark Mode) -->
    <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  </button>
</template>

<script>
import { ref, onMounted, watch } from 'vue'

export default {
  name: 'ThemeToggle',
  setup() {
    const isDark = ref(false)

    const toggleTheme = () => {
      isDark.value = !isDark.value
    }

    // Watch for theme changes and apply to document
    watch(isDark, (newValue) => {
      document.documentElement.setAttribute('data-theme', newValue ? 'dark' : 'light')
      localStorage.setItem('theme', newValue ? 'dark' : 'light')
    })

    // Initialize theme from localStorage or system preference
    onMounted(() => {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        isDark.value = savedTheme === 'dark'
      } else {
        // Check system preference
        isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
    })

    return {
      isDark,
      toggleTheme
    }
  }
}
</script>

<style scoped>
.theme-toggle {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  background-color: var(--color-bg-secondary);
  color: var(--color-text);
  cursor: pointer;
  box-shadow: var(--shadow-lg);
  transition: all var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  transform: scale(1.1) rotate(15deg);
  box-shadow: var(--shadow-xl);
}

.theme-toggle:active {
  transform: scale(0.95);
}

.theme-toggle svg {
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
}

.theme-toggle:hover svg {
  transform: rotate(-15deg);
}

@media (max-width: 768px) {
  .theme-toggle {
    bottom: 16px;
    right: 16px;
    width: 44px;
    height: 44px;
  }

  .theme-toggle svg {
    width: 20px;
    height: 20px;
  }
}
</style>
