<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }">
    <nav class="header__nav container">
      <!-- Left Navigation -->
      <div class="header__left">
        <router-link 
          v-for="link in leftLinks" 
          :key="link.path"
          :to="link.path"
          class="header__link"
        >
          {{ link.name }}
        </router-link>
        <a href="https://warat-supaporn.vercel.app" target="_blank" class = "header__link">GAME PROFILE</a>
      </div>

      <!-- Logo -->
      <router-link to="/" class="header__logo">
        <img src="/profile-1-Photoroom.png" alt="Warat Supaporn" class="header__logo-img" />
      </router-link>

      <!-- Right Navigation -->
      <div class="header__right">
        <a 
          v-for="social in socialLinks" 
          :key="social.name"
          :href="social.url" 
          target="_blank"
          class="header__social"
          :aria-label="social.name"
        >
          <svg v-if="social.name === 'Twitter'" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          <svg v-else-if="social.name === 'Facebook'" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <svg v-else-if="social.name === 'Github'" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
          <svg v-else-if="social.name === 'Email'" viewBox="0 0 24 24" fill="currentColor">
  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
</svg>
          <svg v-else viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <button class="header__menu-btn" @click="isMenuOpen = !isMenuOpen" aria-label="Toggle menu">
        <span :class="{ 'active': isMenuOpen }"></span>
        <span :class="{ 'active': isMenuOpen }"></span>
        <span :class="{ 'active': isMenuOpen }"></span>
      </button>
    </nav>

    <!-- Mobile Menu -->
    <Transition name="slide-down">
      <div v-if="isMenuOpen" class="header__mobile-menu">
        <router-link 
          v-for="link in navLinks" 
          :key="link.path"
          :to="link.path"
          class="header__mobile-link"
          @click="isMenuOpen = false"
        >
          {{ link.name }}
        </router-link>
      </div>
    </Transition>
  </header>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'AppHeader',
  setup() {
    const isMenuOpen = ref(false)
    const isScrolled = ref(false)

    const leftLinks = [
      // { name: 'WORKS', path: '/works' },
      // { name : "HOME" , path:'/'},
      // { name: 'CONTACT', path: '/contact' }
    ]

    const navLinks = [
      { name: 'Home', path: '/' },
      // { name: 'Works', path: '/works' },
      // { name: 'About', path: '/#about' },
      // { name: 'Contact', path: '/contact' }//
    ]

    const socialLinks = [
      { name: 'Github', url: 'https://sanookdev.github.com' },
      { name: 'Email', url: 'mailto:nuk.warat@gmail.com' }
    ]

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 50
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      isMenuOpen,
      isScrolled,
      leftLinks,
      navLinks,
      socialLinks
    }
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: transparent;
  transition: all var(--transition);
}

.header--scrolled {
  background-color: var(--color-bg);
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-sm);
}

.header__nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

.header__left,
.header__right {
  display: flex;
  align-items: center;
  gap: 24px;
  flex: 1;
}

.header__right {
  justify-content: flex-end;
}

.header__link {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: var(--color-text-secondary);
  transition: all var(--transition);
  position: relative;
}

.header__link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  background-color: var(--color-text);
  transition: width var(--transition);
}

.header__link:hover {
  color: var(--color-text);
}

.header__link:hover::after {
  width: 100%;
}

.header__logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  transition: transform var(--transition);
}

.header__logo:hover {
  transform: scale(1.05);
}

.header__logo-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-border);
  transition: all var(--transition);
}

.header__logo:hover .header__logo-img {
  border-color: var(--color-text);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
}

.header__logo-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.15em;
  line-height: 1.2;
  color: var(--color-text);
}

.header__social {
  color: var(--color-text-muted);
  transition: all var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.header__social svg {
  width: 16px;
  height: 16px;
}

.header__social:hover {
  color: var(--color-text);
  transform: translateY(-2px);
}

.header__menu-btn {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.header__menu-btn span {
  width: 24px;
  height: 2px;
  background: var(--color-text);
  transition: all var(--transition);
  transform-origin: center;
}

.header__menu-btn span:first-child.active {
  transform: rotate(45deg) translate(5px, 5px);
}

.header__menu-btn span:nth-child(2).active {
  opacity: 0;
}

.header__menu-btn span:last-child.active {
  transform: rotate(-45deg) translate(5px, -5px);
}

.header__mobile-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--color-bg);
  padding: 24px;
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
}

.header__mobile-link {
  display: block;
  padding: 16px 0;
  font-size: 18px;
  font-weight: 500;
  color: var(--color-text);
  border-bottom: 1px solid var(--color-border-light);
  transition: all var(--transition);
}

.header__mobile-link:hover {
  padding-left: 8px;
  color: var(--color-text-secondary);
}

/* Slide Down Transition */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 768px) {
  .header__left,
  .header__right {
    display: none;
  }

  .header__menu-btn {
    display: flex;
  }

  .header__mobile-menu {
    display: block;
  }

  .header__nav {
    height: 70px;
  }
}

@media (max-width: 576px) {
  .header__logo-text {
    display: none;
  }
}
</style>
