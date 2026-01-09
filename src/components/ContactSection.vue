<template>
  <section id="contact" class="contact">
    <div class="contact__container container">
      <div class="contact__header reveal">
        <span class="contact__label">Get In Touch</span>
        <h2 class="contact__title">Let's Work Together</h2>
        <p class="contact__subtitle">
          Have a project in mind? Let's discuss how we can bring your ideas to life.
        </p>
      </div>

      <div class="contact__content">
        <!-- Contact Info -->
        <div class="contact__info reveal-left">
          <div class="contact__info-item">
            <span class="contact__info-label">Email</span>
            <a :href="'mailto:' + email" class="contact__info-value">
              {{ email }}
            </a>
          </div>

          <div class="contact__info-item">
            <span class="contact__info-label">Phone</span>
            <a :href="'tel:' + phone" class="contact__info-value">
              {{ phone }}
            </a>
          </div>

          <div class="contact__info-item">
            <span class="contact__info-label">Location</span>
            <span class="contact__info-value">{{ location }}</span>
          </div>

          <div class="contact__socials">
            <a 
              v-for="social in socials" 
              :key="social.name"
              :href="social.url" 
              target="_blank"
              class="contact__social"
            >
              {{ social.name }}
            </a>
          </div>
        </div>

        <!-- Contact Form -->
        <form class="contact__form reveal-right" @submit.prevent="handleSubmit">
          <div class="contact__form-row">
            <div class="contact__form-group">
              <label for="name">Name</label>
              <input 
                type="text" 
                id="name" 
                v-model="form.name" 
                required 
                placeholder="Your name"
              />
            </div>
            <div class="contact__form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email" 
                v-model="form.email" 
                required 
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div class="contact__form-group">
            <label for="subject">Subject</label>
            <input 
              type="text" 
              id="subject" 
              v-model="form.subject" 
              placeholder="Project inquiry"
            />
          </div>

          <div class="contact__form-group">
            <label for="message">Message</label>
            <textarea 
              id="message" 
              v-model="form.message" 
              rows="5" 
              required
              placeholder="Tell me about your project..."
            ></textarea>
          </div>

          <button type="submit" class="contact__submit">
            Send Message
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
          </button>
        </form>
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
    phone: {
      type: String,
      default: '+68 3568 89 86'
    },
    location: {
      type: String,
      default: 'Warsaw, Poland'
    },
    socials: {
      type: Array,
      default: () => [
        { name: 'Twitter', url: 'https://twitter.com' },
        { name: 'LinkedIn', url: 'https://linkedin.com' },
        { name: 'GitHub', url: 'https://github.com' },
        { name: 'Dribbble', url: 'https://dribbble.com' }
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
