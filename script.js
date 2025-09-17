// Remove no-js class immediately
document.documentElement.classList.remove('no-js');

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Dot Navigation - Update active state on scroll
const dots = document.querySelectorAll('.dot');
const sections = document.querySelectorAll('section');

function updateActiveDot() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    dots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('data-section') === current) {
            dot.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveDot);

// Smooth scroll for dot navigation
dots.forEach(dot => {
    dot.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-section');
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Hero animations
gsap.timeline()
    .to('.hero-text h1 span', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    })
    .to('.hero-text p', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.4')
    .to('.profile-img', {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.6');

// PROJECT SECTIONS - Elements start VISIBLE, we just animate them nicely
document.querySelectorAll('.project-section').forEach((section, index) => {
    const img1 = section.querySelector('.img-1');
    const img2 = section.querySelector('.img-2');
    const overlay = section.querySelector('.project-overlay');
    
    // Images are already visible, just add auto-switching
    let currentImage = 1;
    setInterval(() => {
        if (currentImage === 1) {
            gsap.to(img2, { opacity: 1, duration: 1.5 });
            gsap.to(img1, { opacity: 0.3, duration: 1.5 });
            currentImage = 2;
        } else {
            gsap.to(img1, { opacity: 1, duration: 1.5 });
            gsap.to(img2, { opacity: 0, duration: 1.5 });
            currentImage = 1;
        }
    }, 3000);
    
    // Animate overlay content on scroll (but overlay is already visible)
    ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        once: true,
        onEnter: () => {
            // Animate just the content inside, not the overlay opacity
            gsap.timeline()
                .from(overlay.querySelector('.project-number'), {
                    scale: 0,
                    opacity: 0,
                    duration: 0.5,
                    ease: 'back.out(1.7)'
                })
                .from(overlay.querySelector('.project-title'), {
                    y: 30,
                    opacity: 0,
                    duration: 0.5
                }, '-=0.3')
                .from(overlay.querySelector('.project-description'), {
                    y: 20,
                    opacity: 0,
                    duration: 0.5
                }, '-=0.3')
                .from(overlay.querySelectorAll('.tech-tag'), {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                    stagger: 0.05,
                    ease: 'back.out(1.7)'
                }, '-=0.2')
                .from(overlay.querySelector('.project-button'), {
                    scale: 0,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'elastic.out(1, 0.5)'
                }, '-=0.1');
        }
    });
});

// Contact section animations
ScrollTrigger.create({
    trigger: '.contact',
    start: 'top 80%',
    once: true,
    onEnter: () => {
        gsap.timeline()
            .from('.contact h2', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            })
            .from('.contact-container > p', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.5')
            .from('.form-group', {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: 'power3.out'
            }, '-=0.4')
            .from('.form-submit-button', {
                scale: 0,
                opacity: 0,
                duration: 0.8,
                ease: 'elastic.out(1, 0.5)'
            }, '-=0.2')
            .from('.social-icon', {
                scale: 0,
                rotation: -180,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'back.out(1.7)'
            }, '-=0.4');
    }
});

// Form submission handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            message: e.target.message.value
        };
        
        console.log('Form submitted:', formData);
        
        // Animate button on submit
        const btn = e.target.querySelector('.form-submit-button');
        gsap.timeline()
            .to(btn, {
                scale: 0.95,
                duration: 0.1
            })
            .to(btn, {
                scale: 1.05,
                duration: 0.3,
                ease: 'elastic.out(1, 0.5)'
            })
            .call(() => {
                btn.textContent = 'MESSAGE SENT! ✨';
            });
        
        // Reset form after 3 seconds
        setTimeout(() => {
            e.target.reset();
            btn.textContent = 'SEND MESSAGE';
        }, 3000);
    });
}

// Button hover effects
document.querySelectorAll('.project-button, .form-submit-button').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        gsap.to(btn, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Parallax effect for hero shapes
gsap.utils.toArray('.shape').forEach((shape, i) => {
    gsap.to(shape, {
        yPercent: -30 * (i + 1),
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });
});

// Custom cursor
const cursor = document.createElement('div');
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid #4ECDC4;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease-out;
    mix-blend-mode: difference;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

// Cursor grows on interactive elements
document.querySelectorAll('a, button, .dot').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursor.style.background = 'rgba(78, 205, 196, 0.1)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.background = 'transparent';
    });
});

// Performance optimization
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.timeScale(10);
}

// Refresh ScrollTrigger on resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});

// VISIBILITY CHECK ON LOAD
window.addEventListener('load', () => {
    // Check if sections are already in view
    document.querySelectorAll('.project-section').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
            const overlay = section.querySelector('.project-overlay');
            const images = section.querySelectorAll('.project-img');
            
            // Show everything immediately if already in view
            gsap.set(overlay, { opacity: 1 });
            gsap.set(images, { opacity: 0.7 });
        }
    });
    
    // Debug logging
    console.log('Portfolio loaded successfully');
    console.log('Project buttons found:', document.querySelectorAll('.project-button').length);
    console.log('Submit button found:', document.querySelector('.form-submit-button') ? 'YES' : 'NO');
    
    // Log project URLs
    document.querySelectorAll('.project-button').forEach((btn, i) => {
        console.log(`Project ${i+1}: ${btn.href}`);
    });
});
