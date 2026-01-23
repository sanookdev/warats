<template>
  <section class="hero">
    <div class="hero__container container">
      <!-- Main Title -->
      <div class="hero__title animate-fadeInDown">
        <h1>{{ name }}</h1>
        <h2>{{ subtitle }}</h2>
      </div>

      <!-- Content Grid -->
      <div class="hero__content">
        <!-- Left Side - Biography & Info -->
        <div class="hero__left">
          <div class="hero__section animate-fadeInLeft ">
            <span class="hero__label">About</span>
            <p class="hero__bio">{{ biography }}</p>
          </div>

          <div class="hero__section animate-fadeInLeft">
            <span class="hero__label">CONTACT</span>
            <div class="hero__contact">
              <div class="hero__socials">
                <a 
                  v-for="social in socialLinks" 
                  :key="social.name"
                  :href="social.url" 
                  target="_blank"
                  class="hero__social-link"
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
            </div>
          </div>
        </div>

        <!-- Center - Profile Image -->
        <div class="hero__center animate-scaleIn ">
          <div class="hero__image-wrapper">
            <img :src="profileImage" :alt="name" class="hero__image" />
          </div>
        </div>

        <!-- Right Side - Stats -->
        <div class="hero__right">
          <div 
            class="hero__stat animate-fadeInRight" 
            v-for="(stat, index) in stats" 
            :key="stat.label"
          >
            <span class="hero__stat-label">{{ stat.label }}</span>
            <span class="hero__stat-value">{{ stat.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
  props: {
    name: {
      type: String,
      default: 'Warat Supaporn'
    },
    subtitle: {
      type: String,
      default: 'UI/UX Interaction Designer\nBased in Poland'
    },
    biography: {
      type: String,
      default: "หาเงินเลี้ยงแมวครับ"
    },
    location: {
      type: String,
      default: 'Warsaw, Poland'
    },
    email: {
      type: String,
      default: 'hello@brunoerdison.com'
    },
    services: {
      type: Array,
      default: () => [
        'Website Design',
        'Mobile Application Design',
        'Animation'
      ]
    },
    profileImage: {
      type: String,
      default: '/sanookdev.png'
    },
    stats: {
      type: Array,
      default: () => [
        { label: 'YEARS OF\nEXPERIENCE', value: '8' },
        { label: 'SATISFACTION\nCLIENTS', value: '100%' },
        { label: 'CLIENTS ON\nWORLDWIDE', value: '+80' },
        { label: 'PROJECTS DONE', value: '675' }
      ]
    },
    clients: {
      type: Array,
      default: () => [
        { name: 'BLB' },
        { name: 'christopher willis' },
        { name: 'SERENITY' },
        { name: 'ARTCHIVE' },
        { name: 'CREATIVE' }
      ]
    },
    socialLinks :{
      type: Array,
      default: ()=>[
          { name: 'Email', url: 'mailto:nuk.warat@gmail.com' },
          { name: 'Github', url: 'https://sanookdev.github.com' }
        ]
    } 
  }
}
</script>

<style scoped>
.hero {
  min-height: 100vh;
  padding: 120px 0 60px;
  display: flex;
  align-items: center;
  background-color: var(--color-bg);
  transition: background-color var(--transition);
}

.hero__container {
  width: 100%;
}

.hero__title {
  text-align: center;
  margin-bottom: 60px;
}

.hero__title h1 {
  font-family: var(--font-serif);
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 400;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
  color: var(--color-text);
}

.hero__title h2 {
  font-family: var(--font-serif);
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 400;
  color: var(--color-text-secondary);
  white-space: pre-line;
  line-height: 1.3;
}

.hero__content {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr;
  gap: 40px;
  align-items: center;
  margin-bottom: 80px;
}

.hero__left {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.hero__section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hero__label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: var(--color-text-muted);
  text-transform: uppercase;
}

.hero__bio {
  font-size: 14px;
  line-height: 1.7;
  color: var(--color-text-secondary);
  white-space: pre-line;
}

/* คอนเทนเนอร์หลัก */
.hero__socials {
  display: flex;
  gap: 16px; /* เพิ่มระยะห่างอีกนิดให้ดูโปร่ง */
}

.hero__social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: var(--color-gray-100, #f8f9fa);
  color: var(--color-text-secondary);
  
  /* หัวใจของความสมูท: ใช้ cubic-bezier แทน ease */
  transition: 
    transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
    background-color 0.3s ease,
    color 0.3s ease,
    box-shadow 0.4s ease;
  
  text-decoration: none;
  will-change: transform; /* ช่วยให้ Browser Render ลื่นขึ้น */
}

.hero__social-link svg {
  width: 25px;
  height: 25px;
  /* ให้ SVG เคลื่อนไหวไปพร้อมกัน */
  transition: transform 0.3s ease;
}

/* Hover State - นุ่มนวลและมีมิติ */
.hero__social-link:hover {
  color: #ffffff; /* หรือสีพื้นหลังของคุณ */
  transform: translateY(-5px) ; 
}

/* Active State (ตอนคลิก) */
.hero__social-link:active {
  transform: translateY(-2px) scale(0.95);
  transition: transform 0.1s ease;
}

.hero__contact p {
  font-size: 14px;
  line-height: 1.8;
  color: var(--color-text-secondary);
}

.hero__contact a {
  transition: color var(--transition);
}

.hero__contact a:hover {
  color: var(--color-text);
}

.hero__services li {
  font-size: 14px;
  line-height: 1.8;
  color: var(--color-text-secondary);
  transition: transform var(--transition), color var(--transition);
}

.hero__services li:hover {
  transform: translateX(4px);
  color: var(--color-text);
}

.hero__center {
  display: flex;
  justify-content: center;
}

.hero__image-wrapper {
  position: relative;
  width: 100%;
  max-width: 420px;
  aspect-ratio: 3/4;
  border-radius: 200px 200px 200px 200px;
  overflow: hidden;
  background: var(--color-gray-200);
  transition: transform var(--transition-slow), box-shadow var(--transition-slow);
}

.hero__image-wrapper:hover {
  transform: scale(1.02) translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.hero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.hero__image-wrapper:hover .hero__image {
  transform: scale(1.05);
}

.hero__right {
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: flex-end;
  text-align: right;
}

.hero__stat {
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: transform var(--transition);
}

.hero__stat:hover {
  transform: translateX(-4px);
}

.hero__stat-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: var(--color-text-muted);
  text-transform: uppercase;
  white-space: pre-line;
}

.hero__stat-value {
  font-family: var(--font-serif);
  font-size: 32px;
  font-weight: 400;
  color: var(--color-text);
  transition: color var(--transition);
}

.hero__stat:hover .hero__stat-value {
  color: var(--color-text-secondary);
}

.hero__clients {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 48px;
  padding-top: 40px;
  border-top: 1px solid var(--color-border);
}

.hero__client {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  text-transform: uppercase;
  transition: all var(--transition);
  cursor: default;
}

.hero__client:hover {
  color: var(--color-text);
  transform: scale(1.1);
}

/* Responsive */
@media (max-width: 992px) {
  .hero {
    padding: 100px 0 40px;
  }

  .hero__content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 48px;
  }

  .hero__left {
    order: 2;
    align-items: center;
  }

  .hero__center {
    order: 1;
  }

  .hero__right {
    order: 3;
    align-items: center;
    text-align: center;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 32px;
  }

  .hero__stat {
    min-width: 120px;
  }

  .hero__stat:hover {
    transform: translateY(-4px);
  }

  .hero__image-wrapper {
    max-width: 280px;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 90px 0 40px;
  }

  .hero__title {
    margin-bottom: 40px;
  }

  .hero__clients {
    gap: 24px;
    flex-wrap: wrap;
  }

  .hero__right {
    gap: 24px;
  }

  .hero__stat-value {
    font-size: 28px;
  }
}

@media (max-width: 576px) {
  .hero__image-wrapper {
    max-width: 220px;
  }

  .hero__clients {
    gap: 16px;
  }

  .hero__client {
    font-size: 10px;
  }

  .hero__stat {
    min-width: 100px;
  }
}

/* เพิ่ม Animation ตอนโหลดหน้าเว็บ */
@keyframes fadeInUpSocial {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero__social-link {
  animation: fadeInUpSocial 0.8s cubic-bezier(0.2, 1, 0.3, 1) both;
}

/* หน่วงเวลาให้โผล่ทีละตัว */
.hero__social-link:nth-child(1) { animation-delay: 0.5s; }
.hero__social-link:nth-child(2) { animation-delay: 0.6s; }
.hero__social-link:nth-child(3) { animation-delay: 0.7s; }
</style>
