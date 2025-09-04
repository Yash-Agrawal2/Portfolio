
const words = ['Blockchain Developer', 'CyberSecuirity Enthusiast', 'Full-Stack Developer', 'Problem Solver'];
let i = 0;
let j = 0;
let forward = true;
const typewriter = document.getElementById('typewriter');

function type() {
  const speed = forward ? 70 : 30;
  typewriter.textContent = words[i].slice(0, j);

  if (forward) {
    j++;
    if (j > words[i].length) {
      forward = false;
      setTimeout(type, 1200);
      return;
    }
  } else {
    j--;
    if (j === 0) {
      forward = true;
      i = (i + 1) % words.length;
      setTimeout(type, 600);
      return;
    }
  }
  setTimeout(type, speed);
}
type();

const observer = new IntersectionObserver(
  entries =>
    entries.forEach(e => e.isIntersecting && e.target.classList.add('reveal')),
  { threshold: 0.2 }
);
document.querySelectorAll('.section').forEach(el => observer.observe(el));

const toggleBtn = document.getElementById('theme-toggle');
const bodyEl = document.body;

toggleBtn.addEventListener('click', () => {
  bodyEl.classList.toggle('light'); // toggle on body
  const icon = toggleBtn.querySelector('i');
  icon.setAttribute(
    'data-lucide',
    bodyEl.classList.contains('light') ? 'moon' : 'sun'
  );
  lucide.createIcons();
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

/* Close nav on link click (mobile UX improvement) */
document.querySelectorAll('.nav-links a').forEach(link =>
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  })
);

document.getElementById('rec-form').addEventListener('submit', e => {
  e.preventDefault();
  const [text, name] = [...e.target.elements].map(el => el.value.trim());
  if (!text) return;

  const card = document.createElement('div');
  card.className = 'rec-card';
  card.innerHTML = `<blockquote>“${text}”</blockquote><footer>— ${
    name || 'Anonymous'
  }</footer>`;
  document.querySelector('.rec-slider').appendChild(card);

  e.target.reset();
});
document.getElementById('year').textContent = new Date().getFullYear();

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = 'rgba(34,211,238,0.5)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  particles = [];
  for (let i = 0; i < 80; i++) particles.push(new Particle());
}
init();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();
