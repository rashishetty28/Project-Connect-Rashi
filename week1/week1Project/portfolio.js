// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
navToggle.addEventListener('click', () => {
  const expanded = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', expanded);
});

// Skip link focus target
document.querySelector('.skip-link').addEventListener('click', e => {
  document.getElementById('main-content').focus();
});

// Theme switcher with persistence
const themeBtn = document.getElementById('toggle-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
function setTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    themeBtn.textContent = '☀️';
  } else {
    document.body.classList.remove('dark-mode');
    themeBtn.textContent = '🌙';
  }
  localStorage.setItem('theme', theme);
}
themeBtn.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark-mode');
  setTheme(isDark ? 'light' : 'dark');
});
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) setTheme(savedTheme);
  else setTheme(prefersDark ? 'dark' : 'light');
});

// Contact form validation
const form = document.getElementById('contact-form');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  let valid = true;

  // Name validation
  const name = document.getElementById('contact-name');
  const nameError = document.getElementById('name-error');
  if (!name.value.trim()) {
    nameError.textContent = 'Name is required.';
    name.setAttribute('aria-invalid', 'true');
    valid = false;
  } else {
    nameError.textContent = '';
    name.removeAttribute('aria-invalid');
  }

  // Email validation
  const email = document.getElementById('contact-email');
  const emailError = document.getElementById('email-error');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim()) {
    emailError.textContent = 'Email is required.';
    email.setAttribute('aria-invalid', 'true');
    valid = false;
  } else if (!emailPattern.test(email.value.trim())) {
    emailError.textContent = 'Please enter a valid email.';
    email.setAttribute('aria-invalid', 'true');
    valid = false;
  } else {
    emailError.textContent = '';
    email.removeAttribute('aria-invalid');
  }

  // Message validation
  const message = document.getElementById('contact-message');
  const messageError = document.getElementById('message-error');
  if (!message.value.trim()) {
    messageError.textContent = 'Message is required.';
    message.setAttribute('aria-invalid', 'true');
    valid = false;
  } else {
    messageError.textContent = '';
    message.removeAttribute('aria-invalid');
  }

  if (valid) {
    form.reset();
    alert('Form submitted successfully!');
  }
});

// Gallery slider (keyboard + button navigation)
const galleryImages = [
  {src: 'images/forecastai.jpeg', alt: 'Gallery image 1'},
  {src: 'images/on-th-go-ev.jpeg', alt: 'Gallery image 2'},
  {src: 'images/motorizedroller.jpeg', alt: 'Gallery image 3'}
];
let galleryIdx = 0;
const galleryImg = document.getElementById('gallery-image');
const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');

function showGallery(idx) {
  galleryImg.src = galleryImages[idx].src;
  galleryImg.alt = galleryImages[idx].alt;
}
prevBtn.addEventListener('click', () => {
  galleryIdx = (galleryIdx - 1 + galleryImages.length) % galleryImages.length;
  showGallery(galleryIdx);
});
nextBtn.addEventListener('click', () => {
  galleryIdx = (galleryIdx + 1) % galleryImages.length;
  showGallery(galleryIdx);
});
// Keyboard navigation
document.querySelector('.gallery-slider').addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    prevBtn.click();
  } else if (e.key === 'ArrowRight') {
    nextBtn.click();
  }
});