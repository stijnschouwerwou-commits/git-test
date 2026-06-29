// ===== SMOOTH SCROLL FUNCTION =====
function smoothScroll(targetId) {
    const element = document.getElementById(targetId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with scroll-fade class
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.service-card, .portfolio-item, .about-content');
    fadeElements.forEach(el => {
        el.classList.add('scroll-fade');
        observer.observe(el);
    });

    // Add stagger animation to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add stagger animation to portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
});

// ===== PARALLAX EFFECT =====
let lastScrollPosition = 0;

window.addEventListener('scroll', () => {
    lastScrollPosition = window.scrollY;
    
    // Parallax for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `center ${lastScrollPosition * 0.5}px`;
    }

    // Subtle parallax for section backgrounds
    const sections = document.querySelectorAll('.services, .portfolio');
    sections.forEach(section => {
        if (isElementInViewport(section)) {
            const scrolled = window.pageYOffset;
            const elementOffset = section.offsetTop;
            const parallax = (scrolled - elementOffset) * 0.1;
            section.style.transform = `translateY(${parallax}px)`;
        }
    });
}, { passive: true });

// ===== UTILITY FUNCTION =====
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= window.innerHeight &&
        rect.bottom >= 0
    );
}

// ===== REVEAL EMAIL FUNCTION =====
function revealEmail() {
    const emailReveal = document.getElementById('email-reveal');
    if (emailReveal) {
        const isHidden = emailReveal.style.display === 'none';
        emailReveal.style.display = isHidden ? 'block' : 'none';
        
        // Animate reveal
        if (isHidden) {
            emailReveal.style.animation = 'fadeIn 0.3s ease';
        }
    }
}

// ===== SCROLL TO TOP INDICATOR =====
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero && window.scrollY > hero.offsetHeight / 2) {
        document.body.style.opacity = '1';
    }
}, { passive: true });

// ===== ACCESSIBILITY: RESPECT PREFERS-REDUCED-MOTION =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.scrollBehavior = 'auto';
    
    const style = document.createElement('style');
    style.textContent = `
        * {
            animation: none !important;
            transition: none !important;
        }
    `;
    document.head.appendChild(style);
}

// ===== NAVBAR ACTIVE LINK INDICATOR =====
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, { passive: true });

// ===== BUTTON RIPPLE EFFECT =====
const buttons = document.querySelectorAll('.cta-button');

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// ===== SMOOTH PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Fade in hero content with stagger
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const ctaButton = document.querySelector('.cta-button');
    
    if (heroTitle) heroTitle.style.animation = 'slideDown 1s ease forwards';
    if (heroSubtitle) heroSubtitle.style.animation = 'fadeIn 1.5s ease 0.3s forwards';
    if (ctaButton) ctaButton.style.animation = 'fadeIn 1.8s ease 0.6s forwards';
});

// ===== PERFORMANCE OPTIMIZATION: Throttle scroll events =====
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== MOBILE MENU HANDLING =====
const navToggle = document.querySelector('.nav-toggle');
const navLinksContainer = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// ===== CONSOLE LOG FOR DEBUGGING =====
console.log('🌿 TimTuinen Website Loaded - Premium Design Active');
console.log('✨ Smooth scroll animations enabled');
console.log('🎨 Luxury color palette: Gold & Dark theme');
