const menuToggle = document.querySelector('#menuToggle');
const mainNav = document.querySelector('#mainNav');
const body = document.body;
const navLinks = document.querySelectorAll('.main-nav a');
const video = document.querySelector('#portfolioVideo');
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
const contactForm = document.querySelector('#contactForm');

const overlay = document.createElement('div');
overlay.className = 'mobile-overlay';
body.appendChild(overlay);

function toggleMenu() {
    menuToggle.classList.toggle('active');
    mainNav.classList.toggle('active');
    overlay.classList.toggle('active');
    
    if (menuToggle.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
}

function closeMenuOnResize() {
    if (window.innerWidth >= 768 && mainNav.classList.contains('active')) {
        toggleMenu();
    }
}

function closeMenuOnNavClick() {
    if (window.innerWidth < 768 && mainNav.classList.contains('active')) {
        toggleMenu();
    }
}

function handleSmoothScroll(e) {
    const href = this.getAttribute('href');
    
    if (href === '#') return;
    
    const target = document.querySelector(href);
    
    if (target) {
        e.preventDefault();
        const header = document.querySelector('.main-header');
        const headerHeight = header.offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

function validateForm(e) {
    e.preventDefault();
    
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const message = document.querySelector('#message').value.trim();
    
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    alert('Thank you for your message!');
    contactForm.reset();
}

menuToggle.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);
window.addEventListener('resize', closeMenuOnResize);

navLinks.forEach(link => {
    link.addEventListener('click', closeMenuOnNavClick);
});

smoothScrollLinks.forEach(link => {
    link.addEventListener('click', handleSmoothScroll);
});

if (contactForm) {
    contactForm.addEventListener('submit', validateForm);
}