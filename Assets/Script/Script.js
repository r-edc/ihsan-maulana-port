/**
 * Portfolio Website - Interactive Animations
 * By: Ihsan Maulana, S.T.
 * 
 * Features:
 * - Smooth scroll animations
 * - Navbar scroll effects
 * - Counter animations
 * - Parallax effects
 * - Micro-interactions
 */

// ===== CONFIGURATION =====
const CONFIG = {
    scrollOffset: 100,
    counterDuration: 2000,
    observerThreshold: 0.1,
};

// ===== PAGE LOADER =====
function initPageLoader() {
    window.addEventListener('load', () => {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => loader.remove(), 500);
            }, 500);
        }
    });
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbarScroll() {
    const navbar = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== SMOOTH SCROLL FOR NAVIGATION =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SCROLL REVEAL ANIMATION =====
function initScrollReveal() {
    const observerOptions = {
        threshold: CONFIG.observerThreshold,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optionally unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with scroll animation classes
    document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right').forEach(el => {
        observer.observe(el);
    });
}

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, duration = CONFIG.counterDuration) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    const isDecimal = target % 1 !== 0;

    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = isDecimal ? start.toFixed(2) : Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toFixed(isDecimal ? 2 : 0);
        }
    };

    updateCounter();
}

function initCounters() {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseFloat(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                entry.target.classList.add('counted');
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter').forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ===== PARALLAX EFFECT FOR HERO =====
function initParallax() {
    const hero = document.querySelector('header');

    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            hero.style.opacity = 1 - (scrolled / 500);
        });
    }
}

// ===== ACTIVE NAV LINK HIGHLIGHT =====
function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-black', 'font-bold');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-black', 'font-bold');
            }
        });
    });
}

// ===== TIMELINE DOT ANIMATIONS =====
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.6s ease';
        timelineObserver.observe(item);
    });
}

// ===== PROJECT CARD HOVER EFFECTS =====
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== SKILL BADGE RIPPLE EFFECT =====
function initSkillBadges() {
    const skillBadges = document.querySelectorAll('.skill-badge');

    skillBadges.forEach(badge => {
        badge.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ===== MOTO CARD SEQUENTIAL ANIMATION =====
function initMotoAnimation() {
    const motoElements = document.querySelectorAll('.moto-card span, .moto-card i');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                motoElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, index * 150);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const motoCard = document.querySelector('.moto-card');
    if (motoCard) {
        motoElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(10px)';
            el.style.transition = 'all 0.5s ease';
        });
        observer.observe(motoCard);
    }
}

// ===== TYPING EFFECT FOR HERO TITLE =====
function initTypingEffect() {
    const heroTitle = document.querySelector('header h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';

        let index = 0;
        const typingSpeed = 100;

        function type() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(type, typingSpeed);
            }
        }

        setTimeout(type, 500);
    }
}

// ===== CURSOR TRAIL EFFECT (Optional - subtle) =====
function initCursorTrail() {
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll('.circle');

    if (circles.length > 0) {
        circles.forEach(circle => {
            circle.x = 0;
            circle.y = 0;
        });

        window.addEventListener('mousemove', (e) => {
            coords.x = e.clientX;
            coords.y = e.clientY;
        });

        function animateCircles() {
            let x = coords.x;
            let y = coords.y;

            circles.forEach((circle, index) => {
                circle.style.left = x - 12 + 'px';
                circle.style.top = y - 12 + 'px';
                circle.style.transform = `scale(${(circles.length - index) / circles.length})`;

                circle.x = x;
                circle.y = y;

                const nextCircle = circles[index + 1] || circles[0];
                x += (nextCircle.x - x) * 0.3;
                y += (nextCircle.y - y) * 0.3;
            });

            requestAnimationFrame(animateCircles);
        }

        animateCircles();
    }
}

// ===== BUTTON RIPPLE EFFECT =====
function initButtonRipples() {
    const buttons = document.querySelectorAll('.btn-primary');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== INITIALIZE ALL FUNCTIONS =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Portfolio Website Initialized');

    // Core animations
    initPageLoader();
    initNavbarScroll();
    initSmoothScroll();
    initScrollReveal();

    // Content animations
    initCounters();
    initTimelineAnimations();
    initMotoAnimation();

    // Interactive elements
    initProjectCards();
    initSkillBadges();
    initButtonRipples();
    initActiveNavLinks();

    // Optional effects (can be disabled for performance)
    // initParallax(); // Uncomment if parallax is desired
    // initTypingEffect(); // Uncomment if typing effect is desired
    // initCursorTrail(); // Requires cursor trail elements

    console.log('✨ All animations loaded successfully');
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add resize listener with debounce
window.addEventListener('resize', debounce(() => {
    console.log('Window resized - recalculating animations');
}, 250));
