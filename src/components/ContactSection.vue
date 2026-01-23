<template>
  <section id="contact" class="contact">
    <div class="contact__container container">
      <div class="contact__header reveal">
        <h2 class="contact__title">Contact</h2>
      </div>

      <div class="contact__content">
        <!-- Contact Info -->
        <div class="contact__info reveal-left">
          <div class="contact__info-item">

            <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
         
            <span class="contact__info-label">Email</span>
            <a :href="'mailto:' + email" class="contact__info-value">
               <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
            </a>
          </div>

          <div class="contact__info-item">
            <span class="contact__info-label">Mobile</span>
            <a :href="'tel:' + phone" class="contact__info-value">
              {{ phone }}
            </a>
          </div>

          <div class="contact__info-item">
            <span class="contact__info-label">Location</span>
            <span class="contact__info-value">{{ location }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'ContactSection',
  props: {
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
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/warat-supaporn-393693209' },
        { name: 'GitHub', url: 'https://github.com/sanookdev' },
      ]
    }
  },
  setup() {
    const form = ref({
      name: '',
      email: '',
      subject: '',
      message: ''
    })

    const handleSubmit = () => {
      console.log('Form submitted:', form.value)
      // Handle form submission
    }

    onMounted(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      }, { threshold: 0.1 })

      document.querySelectorAll('.contact .reveal, .contact .reveal-left, .contact .reveal-right').forEach(el => {
        observer.observe(el)
      })
    })

    return {
      form,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.contact {
  padding: 100px 0;
  background-color: var(--color-bg-secondary);
  transition: background-color var(--transition);
}

.contact__header {
  text-align: center;
  margin-bottom: 60px;
}

.contact__label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.contact__title {
  font-family: var(--font-serif);
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 400;
  margin-top: 12px;
  color: var(--color-text);
}

.contact__subtitle {
  font-size: 16px;
  color: var(--color-text-secondary);
  margin-top: 16px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.contact__content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 80px;
  align-items: start;
}

.contact__info {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.contact__info-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.contact__info-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.contact__info-value {
  font-size: 16px;
  color: var(--color-text);
  transition: all var(--transition);
}

a.contact__info-value:hover {
  color: var(--color-text-secondary);
  transform: translateX(4px);
}

.contact__socials {
  display: flex;
  gap: 20px;
  margin-top: 16px;
}

.contact__social {
  font-size: 14px;
  color: var(--color-text-secondary);
  transition: all var(--transition);
  position: relative;
}

.contact__social::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background-color: var(--color-text);
  transition: width var(--transition);
}

.contact__social:hover {
  color: var(--color-text);
}

.contact__social:hover::after {
  width: 100%;
}

.contact__form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.contact__form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.contact__form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.contact__form-group label {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text);
}

.contact__form-group input,
.contact__form-group textarea {
  padding: 14px 16px;
  font-size: 15px;
  font-family: inherit;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-bg);
  color: var(--color-text);
  transition: all var(--transition);
  resize: vertical;
}

.contact__form-group input::placeholder,
.contact__form-group textarea::placeholder {
  color: var(--color-text-muted);
}

.contact__form-group input:focus,
.contact__form-group textarea:focus {
  outline: none;
  border-color: var(--color-text);
  box-shadow: 0 0 0 3px var(--color-border-light);
}

.contact__submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 32px;
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  color: var(--color-bg);
  background-color: var(--color-text);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all var(--transition);
  align-self: flex-start;
}

.contact__submit svg {
  width: 18px;
  height: 18px;
  transition: transform var(--transition);
}

.contact__submit:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.contact__submit:hover svg {
  transform: translate(2px, -2px);
}

.contact__submit:active {
  transform: translateY(0);
}

/* Reveal Animations */
.reveal, .reveal-left, .reveal-right {
  opacity: 0;
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal {
  transform: translateY(30px);
}

.reveal-left {
  transform: translateX(-30px);
}

.reveal-right {
  transform: translateX(30px);
}

.reveal.visible, .reveal-left.visible, .reveal-right.visible {
  opacity: 1;
  transform: translate(0);
}

@media (max-width: 992px) {
  .contact__content {
    grid-template-columns: 1fr;
    gap: 48px;
  }
}

@media (max-width: 768px) {
  .contact {
    padding: 80px 0;
  }
}

@media (max-width: 576px) {
  .contact__form-row {
    grid-template-columns: 1fr;
  }

  .contact__submit {
    width: 100%;
  }
}
</style>
