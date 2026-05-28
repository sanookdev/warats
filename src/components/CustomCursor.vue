<template>
  <div v-if="enabled" class="cursor" aria-hidden="true">
    <canvas ref="canvas" class="cursor__canvas"></canvas>
    <div ref="ring" class="cursor__ring"></div>
    <div ref="dot" class="cursor__dot"></div>
  </div>
</template>

<script>
export default {
  name: "CustomCursor",
  data() {
    return {
      enabled: false,
      mouse: { x: -100, y: -100 },
      ring: { x: -100, y: -100 },
      particles: [],
      ctx: null,
      raf: null,
    };
  },
  mounted() {
    if (!window.matchMedia || !window.matchMedia("(pointer: fine)").matches) return;
    this.enabled = true;
    document.documentElement.classList.add("has-custom-cursor");
    this.$nextTick(() => {
      this.resize();
      this.ctx = this.$refs.canvas.getContext("2d");
      window.addEventListener("mousemove", this.onMove);
      window.addEventListener("mousedown", this.onDown);
      window.addEventListener("mouseup", this.onUp);
      window.addEventListener("resize", this.resize);
      document.addEventListener("mouseover", this.onOver);
      this.loop();
    });
  },
  beforeUnmount() {
    cancelAnimationFrame(this.raf);
    window.removeEventListener("mousemove", this.onMove);
    window.removeEventListener("mousedown", this.onDown);
    window.removeEventListener("mouseup", this.onUp);
    window.removeEventListener("resize", this.resize);
    document.removeEventListener("mouseover", this.onOver);
    document.documentElement.classList.remove("has-custom-cursor");
  },
  methods: {
    resize() {
      const c = this.$refs.canvas;
      if (!c) return;
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    },
    onMove(e) {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      if (this.$refs.dot) {
        this.$refs.dot.style.transform =
          `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
      for (let i = 0; i < 2; i++) {
        this.particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 1.6,
          vy: (Math.random() - 0.5) * 1.6,
          life: 1,
          size: Math.random() * 2.5 + 1,
          hue: 195 + Math.random() * 30,
        });
      }
      if (this.particles.length > 220) {
        this.particles.splice(0, this.particles.length - 220);
      }
    },
    onOver(e) {
      const interactive = e.target.closest(
        'a, button, [role="button"], input, textarea, .hero__tech-item'
      );
      if (this.$refs.ring) {
        this.$refs.ring.classList.toggle("cursor__ring--hover", !!interactive);
      }
    },
    onDown() {
      if (this.$refs.ring) this.$refs.ring.classList.add("cursor__ring--down");
    },
    onUp() {
      if (this.$refs.ring) this.$refs.ring.classList.remove("cursor__ring--down");
    },
    loop() {
      this.ring.x += (this.mouse.x - this.ring.x) * 0.18;
      this.ring.y += (this.mouse.y - this.ring.y) * 0.18;
      if (this.$refs.ring) {
        this.$refs.ring.style.transform =
          `translate(${this.ring.x}px, ${this.ring.y}px) translate(-50%, -50%)`;
      }

      const ctx = this.ctx;
      if (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.globalCompositeOperation = "lighter";
        for (let i = this.particles.length - 1; i >= 0; i--) {
          const p = this.particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.96;
          p.vy *= 0.96;
          p.life -= 0.022;
          if (p.life <= 0) {
            this.particles.splice(i, 1);
            continue;
          }
          ctx.shadowBlur = 12;
          ctx.shadowColor = `hsla(${p.hue}, 90%, 65%, ${p.life})`;
          ctx.fillStyle = `hsla(${p.hue}, 95%, 70%, ${p.life * 0.7})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalCompositeOperation = "source-over";
      }
      this.raf = requestAnimationFrame(this.loop);
    },
  },
};
</script>

<style>
/* global: hide native cursor when custom cursor is active */
.has-custom-cursor,
.has-custom-cursor * {
  cursor: none !important;
}
</style>

<style scoped>
.cursor__canvas {
  position: fixed;
  inset: 0;
  z-index: 9500;
  pointer-events: none;
}

.cursor__dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #60a5fa;
  box-shadow: 0 0 10px rgba(96, 165, 250, 0.9);
  z-index: 9502;
  pointer-events: none;
  will-change: transform;
}

.cursor__ring {
  position: fixed;
  top: 0;
  left: 0;
  width: 34px;
  height: 34px;
  border: 1.5px solid rgba(96, 165, 250, 0.55);
  border-radius: 50%;
  z-index: 9501;
  pointer-events: none;
  will-change: transform, width, height;
  transition: width 0.25s ease, height 0.25s ease, border-color 0.25s ease,
    background 0.25s ease;
}

.cursor__ring--hover {
  width: 56px;
  height: 56px;
  background: rgba(6, 182, 212, 0.08);
  border-color: rgba(34, 211, 238, 0.8);
}

.cursor__ring--down {
  width: 26px;
  height: 26px;
  border-color: rgba(34, 211, 238, 0.9);
}
</style>
