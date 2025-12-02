// main.js - interações: hamburger, typing, counters, skill progress, form
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger?.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!expanded));
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// fecha menu ao clicar em link (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger?.setAttribute('aria-expanded', 'false');
  });
});

/* TYPING EFFECT */
const typingTextEl = document.getElementById('typingText');
const phrases = ['Full-Stack Developer', 'Front-end Enthusiast', 'Problem Solver', 'Criando experiências digitais'];
let currentPhrase = 0;
let currentChar = 0;
let removing = false;
let typingSpeed = 80;

function typeLoop(){
  if(!typingTextEl) return;
  const phrase = phrases[currentPhrase];
  if(!removing){
    typingTextEl.textContent = phrase.slice(0, currentChar + 1);
    currentChar++;
    if(currentChar === phrase.length){
      removing = true;
      setTimeout(typeLoop, 900);
    } else {
      setTimeout(typeLoop, typingSpeed);
    }
  } else {
    typingTextEl.textContent = phrase.slice(0, currentChar - 1);
    currentChar--;
    if(currentChar === 0){
      removing = false;
      currentPhrase = (currentPhrase + 1) % phrases.length;
      setTimeout(typeLoop, 400);
    } else {
      setTimeout(typeLoop, typingSpeed / 1.5);
    }
  }
}
typeLoop();

/* UTIL: check if element in viewport */
function isInViewport(el, offset = 0) {
  const rect = el.getBoundingClientRect();
  return rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset;
}

/* STATS COUNTER */
const counters = document.querySelectorAll('.stat-number');
let countersAnimated = false;
function animateCounters() {
  if (countersAnimated) return;
  const aboutSection = document.getElementById('about');
  if (!aboutSection) return;
  if (isInViewport(aboutSection, 100)) {
    counters.forEach(el => {
      const target = +el.dataset.target || 0;
      const duration = 1200;
      const start = 0;
      const startTime = performance.now();
      function step(time) {
        const progress = Math.min((time - startTime) / duration, 1);
        el.textContent = Math.floor(progress * (target - start) + start);
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
    countersAnimated = true;
  }
}

/* SKILL PROGRESS */
const skillProgressEls = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;
function animateSkills() {
  if (skillsAnimated) return;
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;
  if (isInViewport(skillsSection, 120)) {
    skillProgressEls.forEach(el => {
      const p = el.dataset.progress || '0';
      el.style.width = `${p}%`;
    });
    skillsAnimated = true;
  }
}

/* on scroll */
window.addEventListener('scroll', () => {
  animateCounters();
  animateSkills();
});
window.addEventListener('load', () => {
  // trigger on load if already visible
  animateCounters();
  animateSkills();
});

/* FORM - demo handling */
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formFeedback.textContent = 'Mensagem enviada (demo). Obrigado!';
    contactForm.reset();
    setTimeout(()=> formFeedback.textContent = '', 4500);
  });
}
