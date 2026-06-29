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

// ===== ADVANCED INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: [0, 0.25, 0.5, 0.75, 1],
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Calculate visibility percentage
            const visibilityPercent = (entry.intersectionRatio * 100);
            
            if (visibilityPercent > 10) {
                entry.target.classList.add('visible');
                
                // Add counter animation to visible elements
                if (entry.target.classList.contains('service-card') || 
                    entry.target.classList.contains('portfolio-item')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }
            } else {
                entry.target.classList.remove('visible');
                if (entry.target.classList.contains('service-card') || 
                    entry.target.classList.contains('portfolio-item')) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px) scale(0.95)';
                }
            }
        }
    });
}, observerOptions);

// Observe all elements with scroll-fade class on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll(
        '.service-card, .portfolio-item, .about-content, .section-header'
    );
    
    fadeElements.forEach(el => {
        el.classList.add('scroll-fade');
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px) scale(0.95)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        observer.observe(el);
    });

    // Add stagger animation to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.12}s`;
    });

    // Add stagger animation to portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.12}s`;
    });

    // Animate section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.style.transitionDelay = '0.1s';
    });
});

// ===== SMOOTH PARALLAX EFFECT WITH EASING =====
let ticking = false;
let lastScrollPosition = 0;

window.addEventListener('scroll', () => {
    lastScrollPosition = window.scrollY;
    
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Parallax for hero section - more dramatic
            const hero = document.querySelector('.hero');
            if (hero) {
                const heroHeight = hero.offsetHeight;
                const scrolled = lastScrollPosition;
                
                if (scrolled < heroHeight) {
                    // More dramatic parallax effect
                    const parallaxAmount = scrolled * 0.6;
                    hero.style.backgroundPosition = `center ${parallaxAmount}px`;
                    hero.style.transform = `translateY(${parallaxAmount * 0.3}px)`;
                }
            }

            // Parallax tilt effect on service cards
            const serviceCards = document.querySelectorAll('.service-card');
            serviceCards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible) {
                    const distanceFromCenter = window.innerHeight / 2 - rect.top;
                    const tilt = (distanceFromCenter / window.innerHeight) * 5;
                    card.style.transform = `perspective(1000px) rotateY(${tilt * 0.1}deg) translateZ(0)`;
                    card.style.transition = 'none';
                }
            });

            // Portfolio items parallax
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            portfolioItems.forEach((item, index) => {
                const rect = item.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible) {
                    const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) / 100;
                    item.style.transform = `translateY(${offset * 15}px) scale(0.98)`;
                    item.style.transition = 'none';
                }
            });

            ticking = false;
        });
        
        ticking = true;
    }
}, { passive: true });

// ===== MOUSE MOVE EFFECT ON CARDS =====
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 10;
            const angleY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
});

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
            emailReveal.style.animation = 'fadeIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        }
    }
}

// ===== SCROLL TO TOP INDICATOR =====
window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.documentElement.style.setProperty('--scroll-percent', scrollPercent + '%');
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

// ===== NAVBAR ACTIVE LINK INDICATOR WITH SMOOTH TRANSITION =====
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
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
    
    if (heroTitle) {
        heroTitle.style.animation = 'slideDown 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
    }
    if (heroSubtitle) {
        heroSubtitle.style.animation = 'fadeIn 1.5s ease 0.3s forwards';
    }
    if (ctaButton) {
        ctaButton.style.animation = 'fadeIn 1.8s ease 0.6s forwards';
    }
});

// ===== ELEMENT VISIBILITY TRACKING =====
const trackVisibility = () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const visibility = Math.max(0, Math.min(1, 1 - (rect.top / window.innerHeight)));
        section.style.setProperty('--visibility', visibility);
    });
};

window.addEventListener('scroll', trackVisibility, { passive: true });
window.addEventListener('resize', trackVisibility, { passive: true });
trackVisibility();

// ===== CONSOLE LOG FOR DEBUGGING =====
console.log('🌿 TimTuinen Website Loaded - Premium Design Active');
console.log('✨ Advanced smooth scroll animations enabled');
console.log('🎨 Luxury color palette: Gold & Dark theme');
console.log('🎬 Parallax effects, fade-ins, and 3D card effects active');
