// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
const closeIcon = mobileMenuBtn.querySelector('.close-icon');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuIcon.classList.toggle('active');
    closeIcon.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuIcon.classList.remove('active');
        closeIcon.classList.remove('active');
    });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Countdown Timer
function updateCountdown() {
    const targetDate = new Date('2026-01-05T00:00:00').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Registration Modal
const registerBtn = document.getElementById('registerBtn');
const applyBtn = document.getElementById('applyBtn');
const registrationModal = document.getElementById('registrationModal');
const closeModalBtn = document.getElementById('closeModal');
const registrationForm = document.getElementById('registrationForm');
const successModal = document.getElementById('successModal');
const closeSuccessBtn = document.getElementById('closeSuccess');

function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

registerBtn.addEventListener('click', () => openModal(registrationModal));
applyBtn.addEventListener('click', () => openModal(registrationModal));

closeModalBtn.addEventListener('click', () => closeModal(registrationModal));

// Close modal when clicking backdrop
registrationModal.querySelector('.modal-backdrop').addEventListener('click', () => {
    closeModal(registrationModal);
});

successModal.querySelector('.modal-backdrop').addEventListener('click', () => {
    closeModal(successModal);
});

// Form Submission - Google Forms Integration (FIXED)
registrationForm.addEventListener('submit', (e) => {
    // DO NOT prevent default - let form submit to Google Sheets
    setTimeout(() => {
        closeModal(registrationModal);
        openModal(successModal);
        createConfetti();
        registrationForm.reset();
    }, 1000);  // Wait 1s for Google to process submission
});

closeSuccessBtn.addEventListener('click', () => closeModal(successModal));

// Confetti Animation
function createConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const confettiPieces = [];
    const colors = ['#87CEEB', '#4CAF50', '#FFD700', '#FF6B6B'];
    
    for (let i = 0; i < 50; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: -20,
            w: Math.random() * 10 + 5,
            h: Math.random() * 10 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 3 + 2,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 5 - 2.5
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confettiPieces.forEach((piece, index) => {
            piece.y += piece.speed;
            piece.rotation += piece.rotationSpeed;

            ctx.save();
            ctx.translate(piece.x, piece.y);
            ctx.rotate((piece.rotation * Math.PI) / 180);
            ctx.fillStyle = piece.color;
            ctx.fillRect(-piece.w / 2, -piece.h / 2, piece.w, piece.h);
            ctx.restore();

            if (piece.y > canvas.height) {
                confettiPieces.splice(index, 1);
            }
        });

        if (confettiPieces.length > 0) {
            requestAnimationFrame(animate);
        }
    }

    animate();
}

// Testimonial Carousel
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dots = document.querySelectorAll('.dot');
let currentTestimonial = 0;
let autoPlayInterval;

function showTestimonial(index) {
    testimonials.forEach(t => t.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    currentTestimonial = index;
}

function nextTestimonial() {
    const next = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(next);
}

function prevTestimonial() {
    const prev = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(prev);
}

prevBtn.addEventListener('click', () => {
    prevTestimonial();
    resetAutoPlay();
});

nextBtn.addEventListener('click', () => {
    nextTestimonial();
    resetAutoPlay();
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showTestimonial(index);
        resetAutoPlay();
    });
});

function startAutoPlay() {
    autoPlayInterval = setInterval(nextTestimonial, 5000);
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

startAutoPlay();

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all items
        faqItems.forEach(faq => faq.classList.remove('active'));
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe program cards
document.querySelectorAll('.program-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe stat cards
document.querySelectorAll('.stat-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Handle form validation (UPDATED for Google Forms)
const form = document.getElementById('registrationForm');
const checkboxes = form.querySelectorAll('input[name="entry.1846923513"]');
const submitBtn = form.querySelector('.submit-btn');

form.addEventListener('submit', (e) => {
    const checkedBoxes = Array.from(checkboxes).filter(cb => cb.checked);
    
    if (checkedBoxes.length === 0) {
        e.preventDefault();
        alert('Please select at least one track.');
        return false;
    }
});

// Keyboard accessibility for modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (registrationModal.classList.contains('active')) {
            closeModal(registrationModal);
        }
        if (successModal.classList.contains('active')) {
            closeModal(successModal);
        }
    }
});

// Handle window resize for canvas
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confettiCanvas');
    if (canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
});

// Add active states to buttons on touch devices
if ('ontouchstart' in window) {
    document.querySelectorAll('button, .cta-btn').forEach(btn => {
        btn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        btn.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

// Lazy load background images
const heroSection = document.querySelector('.hero');
const heroBg = document.querySelector('.hero-bg');

if (heroBg) {
    const bgImage = new Image();
    bgImage.src = 'https://images.unsplash.com/photo-1535127022272-dbe7ee35cf33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMGxhYm9yYXRvcnklMjByZXNlYXJjaHxlbnwxfHx8fDE3NjcwOTIwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080';
    
    bgImage.onload = () => {
        heroBg.style.backgroundImage = `url(${bgImage.src})`;
    };
}

// Track user engagement
let scrollDepth = 0;

window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const depth = Math.round((scrollTop + windowHeight) / documentHeight * 100);
    
    if (depth > scrollDepth) {
        scrollDepth = depth;
    }
});

// Preload critical images
window.addEventListener('load', () => {
    const criticalImages = [
        'https://images.unsplash.com/photo-1535127022272-dbe7ee35cf33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMGxhYm9yYXRvcnklMjByZXNlYXJjaHxlbnwxfHx8fDE3NjcwOTIwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Add print styles support
window.addEventListener('beforeprint', () => {
    // Close any open modals before printing
    closeModal(registrationModal);
    closeModal(successModal);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
    
    // Set initial testimonial
    showTestimonial(0);
    
    // Trigger initial countdown update
    updateCountdown();
});
