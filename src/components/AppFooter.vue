<template>
  <footer class="footer">
    <div class="footer__container container">
      <div class="footer__content">
        <p class="footer__copyright">
          © {{ currentYear }} {{ name }}. All rights reserved.
        </p>

        <div class="footer__socials">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            target="_blank"
            class="footer__social-link"
            :aria-label="social.name"
          >
            <svg
              v-if="social.name === 'Github'"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              />
            </svg>
            <svg
              v-else-if="social.name === 'Email'"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
              />
            </svg>
          </a>
        </div>
      </div>

      <button
        class="footer__back-top"
        @click="scrollToTop"
        aria-label="Back to top"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </div>
  </footer>
</template>

<script>
import { computed } from "vue";

export default {
  name: "AppFooter",
  props: {
    name: {
      type: String,
      default: "Warat Supaporn",
    },
    socialLinks: {
      type: Array,
      default: () => [
        { name: "Email", url: "mailto:nuk.warat@gmail.com" },
        { name: "Github", url: "https://github.com/sanookdev" },
      ],
    },
  },
  setup() {
    const currentYear = computed(() => new Date().getFullYear());

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return {
      currentYear,
      scrollToTop,
    };
  },
};
</script>

<style scoped>
.footer {
  background-color: var(--color-bg);
  border-top: 1px solid var(--color-border);
  padding: 60px 0 40px; /* เพิ่ม padding บนเพื่อให้ดูโปร่งขึ้น */
  position: relative;
  transition: background-color var(--transition), border-color var(--transition);
}

.footer__content {
  display: flex;
  flex-direction: column; /* จัดให้ Copyright และ Socials เรียงกันแนวตั้ง */
  justify-content: center;
  align-items: center;
  gap: 20px; /* ระยะห่างระหว่างบรรทัด */
}

.footer__copyright {
  font-size: 14px;
  color: var(--color-text-muted);
  margin: 0;
}

.footer__socials {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px; /* ระยะห่างระหว่างไอคอน */
}

.footer__social-link {
  color: var(--color-text-secondary);
  transition: all var(--transition);
  display: flex;
  align-items: center;
}

.footer__social-link svg {
  width: 22px;
  height: 22px;
}

.footer__social-link:hover {
  color: var(--color-text);
  transform: translateY(-3px);
}

.footer__back-top {
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
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

/* Responsive */
@media (max-width: 768px) {
  .footer {
    padding: 40px 0;
  }

  .footer__back-top {
    position: static;
    transform: none;
    margin: 30px auto 0;
  }

  .footer__back-top:hover {
    transform: scale(1.1);
  }
}
</style>
