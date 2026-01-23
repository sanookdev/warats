<template>
  <footer class="footer">
    <div class="footer__container container">
      <div class="footer__content">
        <!-- Copyright -->
        <p class="footer__copyright">
          © {{ currentYear }} {{ name }}. All rights reserved.
        </p>
      </div>

      <!-- Back to Top -->
      <button class="footer__back-top" @click="scrollToTop" aria-label="Back to top">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      </button>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'AppFooter',
  props: {
    name: {
      type: String,
      default: 'Warat Supaporn'
    },
    email: {
      type: String,
      default: 'hello@brunoerdison.com'
    },
    location: {
      type: String,
      default: 'Warsaw, Poland'
    },
    socials: {
      type: Array,
      default: () => [
        // { name: 'Twitter', url: 'https://twitter.com' },
        { name: 'Github', url: 'https://sanookdev.github.com' },
      { name: 'Email', url: 'mailto:nuk.warat@gmail.com' }
        // { name: 'Dribbble', url: 'https://dribbble.com' }
      ]
    }
  },
  setup() {
    const currentYear = computed(() => new Date().getFullYear())
    
    const navLinks = [
      // { name: 'Home', path: '/' },
      // { name: 'Works', path: '/works' },
      // { name: 'Contact', path: '/contact' }
    ]

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return {
      currentYear,
      navLinks,
      scrollToTop
    }
  }
}
</script>

<style scoped>
.footer {
  background-color: var(--color-bg);
  border-top: 1px solid var(--color-border);
  padding: 40px 0;
  position: relative;
  transition: background-color var(--transition), border-color var(--transition);
}

.footer__content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
}

.footer__copyright {
  font-size: 13px;
  color: var(--color-text-muted);
}

.footer__nav {
  display: flex;
  gap: 32px;
}

.footer__link {
  font-size: 13px;
  color: var(--color-text-secondary);
  transition: all var(--transition);
  position: relative;
}

.footer__link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background-color: var(--color-text);
  transition: width var(--transition);
}

.footer__link:hover {
  color: var(--color-text);
}

.footer__link:hover::after {
  width: 100%;
}

.footer__socials {
  display: flex;
  gap: 24px;
}

.footer__social {
  font-size: 13px;
  color: var(--color-text-secondary);
  transition: all var(--transition);
}

.footer__social:hover {
  color: var(--color-text);
  transform: translateY(-2px);
}

.footer__back-top {
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  background-color: var(--color-bg-secondary);
  color: var(--color-text);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition);
}

.footer__back-top svg {
  width: 20px;
  height: 20px;
}

.footer__back-top:hover {
  background-color: var(--color-text);
  color: var(--color-bg);
  border-color: var(--color-text);
  transform: translateY(-50%) scale(1.1);
}

@media (max-width: 768px) {
  .footer__content {
    flex-direction: column;
    text-align: center;
  }

  .footer__nav {
    order: -1;
  }

  .footer__back-top {
    position: static;
    transform: none;
    margin-top: 24px;
  }

  .footer__back-top:hover {
    transform: scale(1.1);
  }
}
</style>
