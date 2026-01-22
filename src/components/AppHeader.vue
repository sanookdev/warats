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

          <svg v-if="social.name === 'Github'" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
          <svg v-else-if="social.name === 'Email'" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
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
      { name: 'Email', url: 'mailto:nuk.warat@gmail.com' },
      { name: 'Github', url: 'https://sanookdev.github.com' }
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
