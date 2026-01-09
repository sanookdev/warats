<template>
  <section id="about" class="about">
    <div class="about__container container">
      <div class="about__content">
        <!-- Left - Image -->
        <div class="about__image-wrapper reveal-left">
          <img :src="image" :alt="title" class="about__image" />
          <div class="about__experience-badge">
            <span class="about__experience-number">{{ yearsExperience }}+</span>
            <span class="about__experience-text">Years</span>
          </div>
        </div>

        <!-- Right - Content -->
        <div class="about__text">
          <span class="about__label reveal">About Me</span>
          <h2 class="about__title reveal">{{ title }}</h2>
          
          <div class="about__paragraphs reveal">
            <p v-for="(paragraph, index) in paragraphs" :key="index">
              {{ paragraph }}
            </p>
          </div>

          <!-- Skills -->
          <div class="about__skills reveal">
            <div class="about__skill" v-for="skill in skills" :key="skill.name">
              <div class="about__skill-header">
                <span class="about__skill-name">{{ skill.name }}</span>
                <span class="about__skill-level">{{ skill.level }}%</span>
              </div>
              <div class="about__skill-bar">
                <div 
                  class="about__skill-progress"
                  :style="{ width: skill.level + '%' }"
                ></div>
              </div>
            </div>
          </div>

          <!-- CTA -->
          <div class="about__cta reveal">
            <a href="/resume.pdf" download class="about__btn about__btn--primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              Download CV
            </a>
            <a href="#contact" class="about__btn about__btn--secondary">
              Let's Chat
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted } from 'vue'

export default {
  name: 'AboutSection',
  props: {
    title: {
      type: String,
      default: 'Crafting Digital Experiences That Inspire'
    },
    paragraphs: {
      type: Array,
      default: () => [
        'I am a passionate designer and developer with a keen eye for creating beautiful, functional digital experiences.',
        'My approach combines modern aesthetics with user-centered design principles.'
      ]
    },
    skills: {
      type: Array,
      default: () => [
        { name: 'UI/UX Design', level: 95 },
        { name: 'Frontend Dev', level: 90 },
        { name: 'Brand Identity', level: 85 },
        { name: 'Motion Design', level: 80 }
      ]
    },
    image: {
      type: String,
      default: '/about.jpg'
    },
    yearsExperience: {
      type: Number,
      default: 8
    },
    techStack: {
      type: Array,
      default: () => ['⚡', '🎨', '💻', '🚀']
    }
  },
  setup() {
    onMounted(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      }, { threshold: 0.1 })

      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        observer.observe(el)
      })
    })
  }
}
</script>

<style scoped>
.about {
  padding: 100px 0;
  background-color: var(--color-bg-secondary);
  transition: background-color var(--transition);
}

.about__content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.about__image-wrapper {
  position: relative;
  aspect-ratio: 4/5;
  border-radius: 8px;
  overflow: hidden;
  transition: transform var(--transition-slow), box-shadow var(--transition-slow);
}

.about__image-wrapper:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-xl);
}

.about__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.about__image-wrapper:hover .about__image {
  transform: scale(1.05);
}

.about__experience-badge {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 80px;
  height: 80px;
  background-color: var(--color-text);
  color: var(--color-bg);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-lg);
}

.about__experience-number {
  font-family: var(--font-serif);
  font-size: 24px;
  font-weight: 600;
  line-height: 1;
}

.about__experience-text {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.about__text {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.about__label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.about__title {
  font-family: var(--font-serif);
  font-size: clamp(28px, 3vw, 40px);
  font-weight: 400;
  line-height: 1.3;
  color: var(--color-text);
}

.about__paragraphs p {
  font-size: 15px;
  line-height: 1.8;
  color: var(--color-text-secondary);
  margin-bottom: 16px;
}

.about__skills {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 16px;
}

.about__skill {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.about__skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.about__skill-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
}

.about__skill-level {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-muted);
}

.about__skill-bar {
  height: 4px;
  background-color: var(--color-border);
  border-radius: 2px;
  overflow: hidden;
}

.about__skill-progress {
  height: 100%;
  background-color: var(--color-text);
  border-radius: 2px;
  transition: width 1s ease;
}

.about__cta {
  display: flex;
  gap: 16px;
  margin-top: 24px;
}

.about__btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 4px;
  transition: all var(--transition);
  cursor: pointer;
}

.about__btn svg {
  width: 18px;
  height: 18px;
}

.about__btn--primary {
  background-color: var(--color-text);
  color: var(--color-bg);
}

.about__btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.about__btn--secondary {
  border: 1px solid var(--color-border);
  color: var(--color-text);
  background-color: transparent;
}

.about__btn--secondary:hover {
  border-color: var(--color-text);
  background-color: var(--color-text);
  color: var(--color-bg);
}

/* Reveal Animations */
.reveal, .reveal-left {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal-left {
  transform: translateX(-30px);
}

.reveal.visible, .reveal-left.visible {
  opacity: 1;
  transform: translate(0);
}

@media (max-width: 992px) {
  .about__content {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .about__image-wrapper {
    max-width: 400px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .about {
    padding: 80px 0;
  }
}

@media (max-width: 576px) {
  .about__skills {
    grid-template-columns: 1fr;
  }

  .about__cta {
    flex-direction: column;
  }

  .about__btn {
    justify-content: center;
  }

  .about__experience-badge {
    width: 60px;
    height: 60px;
    top: 16px;
    right: 16px;
  }

  .about__experience-number {
    font-size: 18px;
  }
}
</style>
