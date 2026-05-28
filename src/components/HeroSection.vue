<template>
  <section class="hero">
    <!-- Aurora Background -->
    <div class="hero__aurora" aria-hidden="true">
      <div class="hero__aurora-blob hero__aurora-blob--1"></div>
      <div class="hero__aurora-blob hero__aurora-blob--2"></div>
      <div class="hero__aurora-blob hero__aurora-blob--3"></div>
    </div>

    <div class="hero__container container">
      <!-- Title -->
      <div class="hero__title animate-fadeInDown">
        <h1 class="hero__name">{{ name }}</h1>
        <h2 class="hero__subtitle-row">
          <span ref="typewriterEl" class="hero__typewriter-text"></span><span class="hero__cursor">|</span>
        </h2>
      </div>

      <!-- Three Column Content -->
      <div class="hero__content">

        <!-- Left: About + Contact -->
        <div class="hero__left">
          <div class="hero__glass-card animate-fadeInLeft">
            <span class="hero__label">About</span>
            <p class="hero__bio">{{ biography }}</p>
          </div>

          <div class="hero__glass-card animate-fadeInLeft delay-200">
            <span class="hero__label">Contact</span>
            <div class="hero__contact">
              <div class="hero__social-secondary">
                <a href="mailto:nuk.warat@gmail.com" class="hero__link-item">
                  nuk.warat@gmail.com
                </a>
                <a href="https://github.com/sanookdev" target="_blank" class="hero__link-item">
                  github.com/sanookdev
                </a>
              </div>
              <div class="hero__actions">
                <a href="https://profile.warats.com" target="_blank" class="hero__cta">
                  <span class="hero__cta-text">Play a game to know me better</span>
                  <div class="hero__cta-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M5 12h14m-7-7l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Center: Profile Image -->
        <div class="hero__center animate-scaleIn">
          <div class="hero__image-ring">
            <div class="hero__image-wrapper">
              <img :src="profileImage" :alt="name" class="hero__image" />
            </div>
          </div>
        </div>

        <!-- Right: Tech Stack -->
        <div class="hero__tech">
          <div class="hero__glass-card hero__glass-card--right animate-fadeInRight">
            <div class="hero__tech-categories">
              <div
                class="hero__tech-category"
                v-for="category in techCategories"
                :key="category.name"
              >
                <span class="hero__tech-category-label">{{ category.name }}</span>
                <div class="hero__tech-stack">
                  <div
                    class="hero__tech-item"
                    v-for="tech in category.items"
                    :key="tech.name"
                    :title="tech.name"
                  >
                    <i :class="tech.icon"></i>
                    <span class="hero__tech-name">{{ tech.name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HeroSection",
  props: {
    name: { type: String, default: "Warat Supaporn" },
    subtitle: { type: String, default: "UI/UX Interaction Designer" },
    biography: { type: String, default: "หาเงินเลี้ยงแมวครับ" },
    profileImage: { type: String, default: "/profile-1.png" },
    techCategories: {
      type: Array,
      default: () => [
        {
          name: "Languages",
          items: [
            { name: "JavaScript", icon: "devicon-javascript-plain colored" },
            { name: "PHP", icon: "devicon-php-plain colored" },
            { name: "C++", icon: "devicon-cplusplus-plain colored" },
            { name: "HTML", icon: "devicon-html5-plain colored" },
            { name: "CSS", icon: "devicon-css3-plain colored" },
          ],
        },
        {
          name: "Frameworks",
          items: [
            { name: "Vue.js", icon: "devicon-vuejs-plain colored" },
            { name: "Node.js", icon: "devicon-nodejs-plain colored" },
            { name: "Tailwind", icon: "devicon-tailwindcss-original colored" },
            { name: "Bootstrap", icon: "devicon-bootstrap-plain colored" },
            { name: "Vuetify", icon: "devicon-vuetify-plain colored" },
          ],
        },
        {
          name: "Database",
          items: [
            { name: "MySQL", icon: "devicon-mysql-plain colored" },
            { name: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
            { name: "Firebase", icon: "devicon-firebase-plain colored" },
            { name: "Supabase", icon: "devicon-supabase-plain colored" },
          ],
        },
        {
          name: "DevOps & Tools",
          items: [
            { name: "Docker", icon: "devicon-docker-plain colored" },
            { name: "Jenkins", icon: "devicon-jenkins-plain colored" },
            { name: "Nginx", icon: "devicon-nginx-original colored" },
            { name: "Apache", icon: "devicon-apache-plain colored" },
            { name: "Git", icon: "devicon-git-plain colored" },
            { name: "Vercel", icon: "devicon-vercel-original" },
            { name: "PM2", icon: "devicon-pm2-plain colored" },
          ],
        },
      ],
    },
  },
  data() {
    return {
      typewriterTimeout: null,
    };
  },
  mounted() {
    this.startTypewriter();
  },
  beforeUnmount() {
    if (this.typewriterTimeout) clearTimeout(this.typewriterTimeout);
  },
  methods: {
    startTypewriter() {
      const text = this.subtitle.replace(/\n/g, " · ");
      let index = 0;
      const type = () => {
        if (this.$refs.typewriterEl) {
          this.$refs.typewriterEl.textContent = text.slice(0, index);
          if (index <= text.length) {
            index++;
            this.typewriterTimeout = setTimeout(type, 70);
          }
        }
      };
      this.typewriterTimeout = setTimeout(type, 900);
    },
  },
};
</script>

<style scoped>
/* ===== HERO ===== */
.hero {
  min-height: 100vh;
  padding: 120px 0 60px;
  display: flex;
  align-items: center;
  background-color: var(--color-bg);
  transition: background-color var(--transition);
  position: relative;
  overflow: hidden;
}

/* ===== AURORA BACKGROUND ===== */
.hero__aurora {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.hero__aurora-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.08;
}

[data-theme="dark"] .hero__aurora-blob {
  opacity: 0.22;
}

.hero__aurora-blob--1 {
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, #2563eb, transparent 65%);
  top: -200px;
  left: -200px;
  animation: blob-float-1 14s ease-in-out infinite;
}

.hero__aurora-blob--2 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #06b6d4, transparent 65%);
  bottom: -200px;
  right: -150px;
  animation: blob-float-2 18s ease-in-out infinite;
}

.hero__aurora-blob--3 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #0ea5e9, transparent 65%);
  top: 50%;
  left: 50%;
  animation: blob-float-3 12s ease-in-out infinite;
}

@keyframes blob-float-1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(40px, -50px) scale(1.05); }
  66% { transform: translate(-30px, 25px) scale(0.97); }
}

@keyframes blob-float-2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-50px, 30px) scale(1.07); }
  66% { transform: translate(30px, -40px) scale(0.93); }
}

@keyframes blob-float-3 {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  33% { transform: translate(calc(-50% + 40px), calc(-50% + 40px)) scale(1.1); }
  66% { transform: translate(calc(-50% - 30px), calc(-50% - 20px)) scale(0.9); }
}

/* ===== CONTAINER ===== */
.hero__container {
  width: 100%;
  position: relative;
  z-index: 1;
}

/* ===== TITLE ===== */
.hero__title {
  text-align: center;
  margin-bottom: 60px;
}

.hero__name {
  font-family: var(--font-serif);
  font-size: clamp(36px, 5vw, 60px);
  font-weight: 400;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
  background: linear-gradient(135deg, #f1f5f9 0%, #93c5fd 35%, #22d3ee 65%, #f1f5f9 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-text-flow 5s ease infinite;
}

/* light mode: keep name readable */
:root:not([data-theme="dark"]) .hero__name {
  background: linear-gradient(135deg, #1a1a1a 0%, #2563eb 40%, #06b6d4 70%, #1a1a1a 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-text-flow 5s ease infinite;
}

@keyframes gradient-text-flow {
  0%, 100% { background-position: 0% center; }
  50% { background-position: 100% center; }
}

.hero__subtitle-row {
  font-family: var(--font-serif);
  font-size: clamp(20px, 2.5vw, 32px);
  font-weight: 400;
  color: var(--color-text-secondary);
  line-height: 1.4;
  min-height: 1.5em;
}

.hero__cursor {
  display: inline-block;
  color: #60a5fa;
  margin-left: 1px;
  font-weight: 300;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* ===== CONTENT GRID ===== */
.hero__content {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr;
  gap: 32px;
  align-items: start;
}

.hero__left {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ===== GLASSMORPHISM CARDS ===== */
.hero__glass-card {
  position: relative;
  background: rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 20px;
  padding: 24px;
  overflow: hidden;
  transition: all 0.4s ease;
}

[data-theme="dark"] .hero__glass-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* top shimmer line */
.hero__glass-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.5), transparent);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.hero__glass-card:hover::before {
  opacity: 1;
}

.hero__glass-card:hover {
  border-color: rgba(96, 165, 250, 0.2);
  box-shadow: 0 8px 40px rgba(37, 99, 235, 0.1);
}

[data-theme="dark"] .hero__glass-card:hover {
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 8px 40px rgba(37, 99, 235, 0.15);
}

.hero__glass-card--right {
  text-align: right;
}

/* ===== LABELS ===== */
.hero__label {
  display: block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #60a5fa;
  margin-bottom: 12px;
}

/* ===== BIO ===== */
.hero__bio {
  font-size: 14px;
  line-height: 1.8;
  color: var(--color-text-secondary);
  white-space: pre-line;
}

/* ===== CONTACT ===== */
.hero__contact {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.hero__social-secondary {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hero__link-item {
  font-size: 13px;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 0.3s ease, transform 0.3s ease;
  width: fit-content;
}

.hero__link-item:hover {
  color: #60a5fa;
  transform: translateX(4px);
}

/* ===== CTA BUTTON ===== */
.hero__cta {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 14px 28px;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.12), rgba(6, 182, 212, 0.08));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: var(--color-text);
  border-radius: 100px;
  text-decoration: none;
  font-weight: 600;
  font-size: 13px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(96, 165, 250, 0.25);
}

.hero__cta::after {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: 100px;
  background: linear-gradient(135deg, #3b82f6, #2563eb, #06b6d4, #0ea5e9, #22d3ee, #3b82f6);
  background-size: 300% 300%;
  z-index: -1;
  animation: gradient-rotate 4s ease infinite;
  opacity: 0;
  transition: opacity 0.4s ease;
}

@keyframes gradient-rotate {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.hero__cta:hover::after {
  opacity: 1;
}

.hero__cta::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.15), transparent);
  transition: all 0.6s;
  z-index: 1;
}

.hero__cta:hover::before {
  left: 100%;
}

.hero__cta-text {
  position: relative;
  z-index: 1;
}

.hero__cta-icon {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  background: linear-gradient(135deg, #2563eb, #06b6d4);
  border-radius: 50%;
  transition: all 0.4s ease;
  flex-shrink: 0;
}

.hero__cta-icon svg {
  width: 12px;
  height: 12px;
  color: white;
  transition: transform 0.4s ease;
}

.hero__cta:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(37, 99, 235, 0.25);
}

.hero__cta:hover .hero__cta-icon {
  transform: translateX(3px) rotate(45deg);
}

.hero__cta:hover .hero__cta-icon svg {
  transform: rotate(-45deg);
}

.hero__actions .hero__cta {
  animation: float-button 3s ease-in-out infinite;
}

@keyframes float-button {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

/* ===== PROFILE IMAGE ===== */
.hero__center {
  display: flex;
  justify-content: center;
}

.hero__image-ring {
  padding: 3px;
  border-radius: 200px;
  background: linear-gradient(135deg, #3b82f6, #2563eb, #06b6d4, #0ea5e9, #22d3ee, #3b82f6);
  background-size: 300% 300%;
  animation: gradient-rotate 5s ease infinite;
  box-shadow:
    0 0 40px rgba(37, 99, 235, 0.4),
    0 0 80px rgba(6, 182, 212, 0.2),
    0 20px 60px rgba(0, 0, 0, 0.35);
  transition: box-shadow 0.5s ease;
}

.hero__image-ring:hover {
  box-shadow:
    0 0 60px rgba(37, 99, 235, 0.55),
    0 0 120px rgba(6, 182, 212, 0.3),
    0 25px 70px rgba(0, 0, 0, 0.45);
}

.hero__image-wrapper {
  position: relative;
  width: 100%;
  max-width: 250px;
  aspect-ratio: 3/4;
  border-radius: 198px;
  overflow: hidden;
  background: var(--color-bg);
}

.hero__image {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 200px;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero__image-ring:hover .hero__image {
  transform: scale(1.04);
}

/* ===== TECH STACK ===== */
.hero__tech {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.hero__tech-categories {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
}

.hero__tech-category {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
}

.hero__tech-category-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #60a5fa;
  text-transform: uppercase;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(96, 165, 250, 0.2);
  width: 100%;
  text-align: right;
}

.hero__tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-end;
}

.hero__tech-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px 10px;
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: default;
  min-width: 44px;
}

[data-theme="dark"] .hero__tech-item {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
}

.hero__tech-item:hover {
  transform: translateY(-5px) scale(1.05);
  background: rgba(37, 99, 235, 0.12);
  border-color: rgba(96, 165, 250, 0.35);
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.2);
}

.hero__tech-item i {
  font-size: 1rem;
  animation: float3d 3s ease-in-out infinite;
}

.hero__tech-item:hover i {
  animation: spin3d 0.8s ease-in-out;
}

@keyframes float3d {
  0%, 100% { transform: translateY(0) rotateX(0deg) rotateY(0deg); }
  25% { transform: translateY(-3px) rotateX(5deg) rotateY(5deg); }
  50% { transform: translateY(0) rotateX(0deg) rotateY(10deg); }
  75% { transform: translateY(-3px) rotateX(-5deg) rotateY(5deg); }
}

@keyframes spin3d {
  0% { transform: rotateY(0deg) scale(1); }
  50% { transform: rotateY(180deg) scale(1.2); }
  100% { transform: rotateY(360deg) scale(1); }
}

.hero__tech-name {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
  text-transform: uppercase;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 992px) {
  .hero__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px;
  }

  .hero__left {
    display: contents;
  }

  .hero__left > .hero__glass-card:first-child { order: 1; width: 100%; }
  .hero__left > .hero__glass-card:last-child  { order: 3; width: 100%; }
  .hero__center { order: 0; }
  .hero__tech   { order: 2; width: 100%; align-items: center; }

  .hero__glass-card--right {
    text-align: center;
  }

  .hero__tech-category { align-items: center; }
  .hero__tech-category-label { text-align: center; }
  .hero__tech-stack { justify-content: center; }
  .hero__label { text-align: center; }
  .hero__contact { align-items: center; }
  .hero__social-secondary { align-items: center; }
  .hero__actions { display: flex; justify-content: center; }
  .hero__link-item:hover { transform: translateY(-2px); }
}

@media (max-width: 768px) {
  .hero { padding: 100px 0 40px; }
  .hero__aurora-blob--1 { width: 400px; height: 400px; }
  .hero__aurora-blob--2 { width: 350px; height: 350px; }
  .hero__aurora-blob--3 { width: 300px; height: 300px; }
}
</style>
