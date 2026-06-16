// Blog Store - CRUD operations via localStorage
const STORAGE_KEY = 'portfolio_blogs'

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim() + '-' + Date.now().toString(36)
}

function getSeedBlogs() {
  return [
    {
      id: generateId(),
      title: 'เริ่มต้นกับ Vue 3 Composition API',
      slug: 'getting-started-vue3-composition-api',
      excerpt: 'เรียนรู้การใช้งาน Composition API ใน Vue 3 ตั้งแต่พื้นฐาน ref, reactive ไปจนถึง composables ที่ช่วยให้โค้ดสะอาดและ reuse ได้ง่าย',
      content: '<h2>ทำไมต้อง Composition API?</h2><p>Vue 3 นำเสนอ Composition API เป็นทางเลือกใหม่ในการเขียน component logic ที่ช่วยให้เราจัดระเบียบโค้ดได้ดีขึ้น โดยเฉพาะกับ component ที่มีความซับซ้อน</p><h3>ref vs reactive</h3><p><code>ref</code> ใช้สำหรับค่า primitive เช่น string, number, boolean ส่วน <code>reactive</code> ใช้สำหรับ object</p><pre class="ql-syntax">import { ref, reactive } from \'vue\'\n\nconst count = ref(0)\nconst state = reactive({ name: \'Vue\', version: 3 })</pre><h3>Composables</h3><p>Composables คือ function ที่ใช้ Composition API เพื่อ encapsulate และ reuse stateful logic ได้ง่ายๆ เหมือนกับ custom hooks ใน React</p><blockquote>Composition API ทำให้โค้ดอ่านง่ายขึ้น และ maintain ได้ดีกว่า Options API ในโปรเจคขนาดใหญ่</blockquote>',
      coverImage: '',
      tags: ['Vue.js', 'JavaScript', 'Frontend'],
      author: 'Warat Supaporn',
      createdAt: new Date('2025-12-15').toISOString(),
      updatedAt: new Date('2025-12-20').toISOString()
    },
    {
      id: generateId(),
      title: 'Docker สำหรับ Developer เริ่มต้น',
      slug: 'docker-for-beginner-developers',
      excerpt: 'ทำความรู้จัก Docker ตั้งแต่ concept พื้นฐาน, Dockerfile, Docker Compose ไปจนถึงการ deploy application จริง',
      content: '<h2>Docker คืออะไร?</h2><p>Docker เป็น platform สำหรับ containerization ที่ช่วยให้เราสามารถ package application พร้อมกับ dependencies ทั้งหมดไว้ใน container เพื่อให้ทำงานได้เหมือนกันทุกที่</p><h3>ข้อดีของ Docker</h3><ul><li>Consistency - ทำงานเหมือนกันทุก environment</li><li>Isolation - แต่ละ container แยกจากกัน</li><li>Scalability - ขยายระบบได้ง่าย</li><li>CI/CD - ทำงานร่วมกับ pipeline ได้ดี</li></ul><h3>Dockerfile ตัวอย่าง</h3><pre class="ql-syntax">FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nEXPOSE 3000\nCMD ["node", "server.js"]</pre><p>เริ่มต้นง่ายๆ แค่เขียน Dockerfile แล้ว build image ด้วยคำสั่ง <code>docker build -t myapp .</code></p>',
      coverImage: '',
      tags: ['Docker', 'DevOps', 'Deployment'],
      author: 'Warat Supaporn',
      createdAt: new Date('2026-01-10').toISOString(),
      updatedAt: new Date('2026-01-15').toISOString()
    },
    {
      id: generateId(),
      title: 'สร้าง REST API ด้วย Node.js + Express',
      slug: 'build-rest-api-nodejs-express',
      excerpt: 'สร้าง RESTful API ที่มีประสิทธิภาพด้วย Node.js และ Express พร้อม middleware, error handling, และ best practices',
      content: '<h2>สร้าง API กับ Express</h2><p>Express.js เป็น web framework ยอดนิยมสำหรับ Node.js ที่ช่วยให้สร้าง API ได้อย่างรวดเร็ว</p><h3>โครงสร้างโปรเจค</h3><pre class="ql-syntax">src/\n├── controllers/\n├── middleware/\n├── models/\n├── routes/\n└── server.js</pre><h3>ตัวอย่าง Route</h3><pre class="ql-syntax">const express = require(\'express\')\nconst router = express.Router()\n\nrouter.get(\'/api/users\', async (req, res) => {\n  const users = await User.find()\n  res.json(users)\n})</pre><h3>Middleware</h3><p>Middleware เป็น function ที่ทำงานก่อนที่ request จะถึง route handler ใช้ได้หลากหลาย เช่น authentication, logging, error handling</p>',
      coverImage: '',
      tags: ['Node.js', 'Express', 'Backend', 'API'],
      author: 'Warat Supaporn',
      createdAt: new Date('2026-02-05').toISOString(),
      updatedAt: new Date('2026-02-10').toISOString()
    },
    {
      id: generateId(),
      title: 'CSS Modern Layout: Grid vs Flexbox',
      slug: 'css-modern-layout-grid-vs-flexbox',
      excerpt: 'เปรียบเทียบ CSS Grid และ Flexbox ว่าเมื่อไหร่ควรใช้อะไร พร้อมตัวอย่าง layout ที่ใช้จริงในงาน',
      content: '<h2>Grid vs Flexbox</h2><p>ทั้ง CSS Grid และ Flexbox เป็น layout system ที่ทรงพลัง แต่มีจุดแข็งต่างกัน</p><h3>Flexbox - 1 มิติ</h3><p>เหมาะสำหรับ layout แบบ row หรือ column เดียว เช่น navigation bar, card layout</p><pre class="ql-syntax">.flex-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}</pre><h3>CSS Grid - 2 มิติ</h3><p>เหมาะสำหรับ layout ที่ต้องการควบคุมทั้ง row และ column เช่น dashboard, magazine layout</p><pre class="ql-syntax">.grid-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 24px;\n}</pre><blockquote>ใช้ Flexbox สำหรับ component level layout และ Grid สำหรับ page level layout</blockquote>',
      coverImage: '',
      tags: ['CSS', 'Frontend', 'Web Design'],
      author: 'Warat Supaporn',
      createdAt: new Date('2026-03-01').toISOString(),
      updatedAt: new Date('2026-03-08').toISOString()
    },
    {
      id: generateId(),
      title: 'PostgreSQL Tips สำหรับ Developer',
      slug: 'postgresql-tips-for-developers',
      excerpt: 'รวม tips และ tricks การใช้ PostgreSQL ที่ developer ควรรู้ ตั้งแต่ indexing, query optimization ไปจนถึง JSON operations',
      content: '<h2>PostgreSQL Tips</h2><p>PostgreSQL เป็น relational database ที่ทรงพลังและเป็นที่นิยม มี features มากมายที่ช่วยให้การทำงานง่ายขึ้น</p><h3>1. JSONB Columns</h3><p>PostgreSQL รองรับ JSONB ที่สามารถ query และ index ได้อย่างมีประสิทธิภาพ</p><pre class="ql-syntax">SELECT data->\'name\' as name\nFROM users\nWHERE data @> \'{"role": "admin"}\';</pre><h3>2. Indexing Strategy</h3><ul><li>B-Tree - ใช้สำหรับ equality และ range queries</li><li>GIN - ใช้สำหรับ full-text search และ JSONB</li><li>GiST - ใช้สำหรับ geometric data</li></ul><h3>3. Window Functions</h3><pre class="ql-syntax">SELECT name, salary,\n  RANK() OVER (ORDER BY salary DESC) as rank\nFROM employees;</pre><p>Window functions ช่วยให้ทำ analytical queries ได้โดยไม่ต้องใช้ subquery</p>',
      coverImage: '',
      tags: ['PostgreSQL', 'Database', 'Backend'],
      author: 'Warat Supaporn',
      createdAt: new Date('2026-04-12').toISOString(),
      updatedAt: new Date('2026-04-18').toISOString()
    }
  ]
}

function loadBlogs() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      return JSON.parse(data)
    }
  } catch (e) {
    console.error('Failed to load blogs:', e)
  }
  // Seed initial data
  const seeds = getSeedBlogs()
  saveBlogs(seeds)
  return seeds
}

function saveBlogs(blogs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs))
}

export function useBlogStore() {
  function getBlogs() {
    return loadBlogs().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  }

  function getLatestBlogs(limit = 5) {
    return getBlogs().slice(0, limit)
  }

  function getBlogBySlug(slug) {
    const blogs = loadBlogs()
    return blogs.find(b => b.slug === slug) || null
  }

  function getBlogById(id) {
    const blogs = loadBlogs()
    return blogs.find(b => b.id === id) || null
  }

  function createBlog({ title, excerpt, content, coverImage, tags }) {
    const blogs = loadBlogs()
    const now = new Date().toISOString()
    const blog = {
      id: generateId(),
      title,
      slug: generateSlug(title),
      excerpt: excerpt || '',
      content: content || '',
      coverImage: coverImage || '',
      tags: tags || [],
      author: 'Warat Supaporn',
      createdAt: now,
      updatedAt: now
    }
    blogs.push(blog)
    saveBlogs(blogs)
    return blog
  }

  function updateBlog(id, updates) {
    const blogs = loadBlogs()
    const index = blogs.findIndex(b => b.id === id)
    if (index === -1) return null
    blogs[index] = {
      ...blogs[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    if (updates.title && updates.title !== blogs[index].title) {
      blogs[index].slug = generateSlug(updates.title)
    }
    saveBlogs(blogs)
    return blogs[index]
  }

  function deleteBlog(id) {
    let blogs = loadBlogs()
    blogs = blogs.filter(b => b.id !== id)
    saveBlogs(blogs)
  }

  function getRelatedBlogs(currentSlug, tags, limit = 3) {
    const blogs = getBlogs().filter(b => b.slug !== currentSlug)
    if (!tags || tags.length === 0) return blogs.slice(0, limit)
    
    // Score by matching tags
    const scored = blogs.map(blog => {
      const matchCount = blog.tags.filter(t => tags.includes(t)).length
      return { ...blog, matchScore: matchCount }
    })
    scored.sort((a, b) => b.matchScore - a.matchScore)
    return scored.slice(0, limit)
  }

  return {
    getBlogs,
    getLatestBlogs,
    getBlogBySlug,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    getRelatedBlogs
  }
}
