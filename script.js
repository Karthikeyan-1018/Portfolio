// ───── PARTICLES ─────
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.r = Math.random() * 1.8 + 0.3;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.alpha = Math.random() * 0.5 + 0.1;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(33, 150, 243, ${this.alpha})`;
    ctx.fill();
  }
}

for (let i = 0; i < 120; i++) particles.push(new Particle());

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(33, 150, 243, ${0.12 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animate);
}
animate();

// ───── TYPEWRITER ─────
const roles = [
  'Full-Stack Developer 🚀',
  'Backend Developer (Node.js) ⚙️',
  'Problem Solver 💡',
  'Machine Learning Learner 🤖',
  'C++ Programmer 💻'
];
let ri = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');

function typewrite() {
  const current = roles[ri];
  if (!deleting) {
    ci++;
    tw.innerHTML = current.slice(0, ci) + '<span class="cursor"></span>';
    if (ci === current.length) { deleting = true; setTimeout(typewrite, 1800); return; }
  } else {
    ci--;
    tw.innerHTML = current.slice(0, ci) + '<span class="cursor"></span>';
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(typewrite, deleting ? 50 : 90);
}
typewrite();

// ───── NAVBAR SCROLL ─────
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

// ───── HAMBURGER ─────
function toggleNav() {
  document.getElementById('nav-links').classList.toggle('open');
}
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('nav-links').classList.remove('open'));
});

// ───── SCROLL REVEAL ─────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

// ───── SKILL BARS ─────
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-grid').forEach(el => barObserver.observe(el));

const API_URL = "https://portfolio-backend-n55i.onrender.com/api";

// ✅ Matches your actual HTML


const form = document.getElementById("contactForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Button clicked ✅");
});
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    console.log("Sending data...");

    const data = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value
    };

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      console.log("Response:", result);

      document.querySelector(".submit-btn").innerText = "Sent ✅";
      form.reset();
      if (!data.email || !data.message) {
  alert("Fill all fields");
  return;
}


    } catch (err) {
      console.error("Error:", err);
      alert("Failed to send message ❌");
    }
  });
});
