document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuBtn && navLinks) {
        const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
        const closeIcon = mobileMenuBtn.querySelector('.close-icon');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (menuIcon) menuIcon.classList.toggle('active');
            if (closeIcon) closeIcon.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (menuIcon) menuIcon.classList.remove('active');
                if (closeIcon) closeIcon.classList.remove('active');
            });
        });
    }

    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // ========================================
    // COUNTDOWN TIMER
    // ========================================
    function updateCountdown() {
        const targetDate = new Date('2026-01-01T00:00:00').getTime();
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');

            if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
            if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
            if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
            if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ========================================
    // MODAL MANAGEMENT (Registration Modal)
    // ========================================
    const registerBtn = document.getElementById('registerBtn');
    const applyBtn = document.getElementById('applyBtn');
    const registrationModal = document.getElementById('registrationModal');
    const closeModalBtn = document.getElementById('closeModal');
    const registrationForm = document.getElementById('registrationForm');
    const successModal = document.getElementById('successModal');
    const closeSuccessBtn = document.getElementById('closeSuccess');

    function openModal(modal) {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal(modal) {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (registerBtn) registerBtn.addEventListener('click', () => openModal(registrationModal));
    if (applyBtn) applyBtn.addEventListener('click', () => openModal(registrationModal));
    if (closeModalBtn) closeModalBtn.addEventListener('click', () => closeModal(registrationModal));
    if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', () => closeModal(successModal));

    if (registrationModal) {
        const backdrop = registrationModal.querySelector('.modal-backdrop');
        if (backdrop) backdrop.addEventListener('click', () => closeModal(registrationModal));
    }
    
    if (successModal) {
        const backdrop = successModal.querySelector('.modal-backdrop');
        if (backdrop) backdrop.addEventListener('click', () => closeModal(successModal));
    }

    // ========================================
    // FORM SUBMISSION
    // ========================================
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const checkboxes = registrationForm.querySelectorAll('input[name="entry.1846923513"]:checked');
            if (checkboxes.length === 0) {
                alert('Please select at least one track!');
                return;
            }

            const submitBtn = document.getElementById('submitBtn');
            if (submitBtn) {
                submitBtn.textContent = 'Submitting...';
                submitBtn.disabled = true;
            }

            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.name = 'formTarget_' + Date.now();
            document.body.appendChild(iframe);

            registrationForm.target = iframe.name;
            registrationForm.submit();

            setTimeout(() => {
                closeModal(registrationModal);
                openModal(successModal);
                createConfetti();
                registrationForm.reset();
                
                if (submitBtn) {
                    submitBtn.textContent = 'Submit Application';
                    submitBtn.disabled = false;
                }
                
                if (iframe.parentNode) {
                    document.body.removeChild(iframe);
                }
            }, 1000);
        });
    }

    // ========================================
    // CONFETTI ANIMATION
    // ========================================
    window.createConfetti = function() {
        const canvas = document.getElementById('confettiCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const confettiPieces = [];
        const colors = ['#87CEEB', '#4CAF50', '#FFD700', '#FF6B6B', '#FF69B4', '#00CED1'];

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
    };

    // ========================================
    // TESTIMONIAL CAROUSEL
    // ========================================
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;
    let autoPlayInterval;

    function showTestimonial(index) {
        testimonials.forEach(t => t.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        if (testimonials[index]) testimonials[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
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

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextTestimonial, 5000);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { prevTestimonial(); resetAutoPlay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextTestimonial(); resetAutoPlay(); });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
            resetAutoPlay();
        });
    });

    if (testimonials.length > 0) {
        showTestimonial(0);
        autoPlayInterval = setInterval(nextTestimonial, 5000);
    }

    // ========================================
    // ✅ FAQ ACCORDION - FIXED
    // ========================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all FAQs
                faqItems.forEach(faq => faq.classList.remove('active'));
                
                // Open clicked if wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // ========================================
    // SMOOTH SCROLL NAVIGATION
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target && navbar) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // INTERSECTION OBSERVER - SCROLL ANIMATIONS
    // ========================================
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

    document.querySelectorAll('.program-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    document.querySelectorAll('.stat-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // ========================================
    // KEYBOARD ACCESSIBILITY
    // ========================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (registrationModal?.classList.contains('active')) {
                closeModal(registrationModal);
            }
            if (successModal?.classList.contains('active')) {
                closeModal(successModal);
            }
        }
    });

    // ========================================
    // RESPONSIVE CANVAS RESIZE
    // ========================================
    window.addEventListener('resize', () => {
        const canvas = document.getElementById('confettiCanvas');
        if (canvas) {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
    });

    // ========================================
    // TOUCH DEVICE BUTTON STATES
    // ========================================
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

    // ========================================
    // LAZY LOAD BACKGROUND IMAGES
    // ========================================
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        const bgImage = new Image();
        bgImage.src = 'https://images.unsplash.com/photo-1535127022272-dbe7ee35cf33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMGxhYm9yYXRvcnklMjByZXNlYXJjaHxlbnwxfHx8fDE3NjcwOTIwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080';
        
        bgImage.onload = () => {
            heroBg.style.backgroundImage = `url(${bgImage.src})`;
        };
    }

    // ========================================
    // PAGE LOAD INDICATOR
    // ========================================
    document.body.classList.add('loaded');

}); // END DOMContentLoaded
