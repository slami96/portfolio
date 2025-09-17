// Remove no-js class immediately to enable animations
document.documentElement.classList.remove('no-js');

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Dot Navigation
const dots = document.querySelectorAll('.dot');
const sections = document.querySelectorAll('section');

// Update active dot based on scroll
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
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    })
    .to('.hero-text p', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.5')
    .to('.profile-img', {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'elastic.out(1, 0.8)'
    }, '-=0.8');

// Parallax for hero image
gsap.to('.profile-wrapper', {
    yPercent: -20,
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    }
});

// Floating shapes parallax
gsap.utils.toArray('.shape').forEach((shape, i) => {
    gsap.to(shape, {
        yPercent: -50 * (i + 1),
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
});

// Auto-switch images for each project
document.querySelectorAll('.project-section').forEach(section => {
    const images = section.querySelectorAll('.project-bg img');
    let currentIndex = 0;

    // Image switching function
    function switchImage() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }

    // Start switching after 2.5 seconds, then every 2.5 seconds
    setInterval(switchImage, 2500);
});

// Project sections animations with visibility fix
gsap.utils.toArray('.project-section').forEach((section, i) => {
    const overlay = section.querySelector('.project-overlay');
    
    // Create timeline for project entrance
    ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        onEnter: () => {
            // Animate overlay entrance
            gsap.to(overlay, {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out'
            });
            
            // Then animate content inside
            gsap.timeline({ delay: 0.3 })
                .from(overlay.querySelector('.project-number'), {
                    scale: 0,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out'
                })
                .from(overlay.querySelector('.project-title'), {
                    x: -100,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out'
                }, '-=0.5')
                .from(overlay.querySelector('.project-description'), {
                    x: -100,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out'
                }, '-=0.7')
                .from(overlay.querySelectorAll('.tech-tag'), {
                    scale: 0,
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'back.out(1.7)'
                }, '-=0.5')
                .from(overlay.querySelector('.project-btn'), {
                    y: 30,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out'
                }, '-=0.3');
        },
        once: true
    });
});

// Contact section animations
ScrollTrigger.create({
    trigger: '.contact',
    start: 'top 80%',
    onEnter: () => {
        gsap.timeline()
            .from('.contact h2', {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            })
            .from('.contact p', {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            }, '-=0.7')
            .from('.form-group', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out'
            }, '-=0.5')
            .from('.submit-btn', {
                scale: 0,
                opacity: 0,
                duration: 1,
                ease: 'elastic.out(1, 0.8)'
            }, '-=0.3')
            .from('.social-icon', {
                scale: 0,
                rotation: -180,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'back.out(1.7)'
            }, '-=0.5');
    },
    once: true
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {
        name: e.target.name.value,
        email: e.target.email.value,
        message: e.target.message.value
    };
    console.log('Form submitted:', formData);
    
    // Animate button on submit
    const btn = e.target.querySelector('.submit-btn');
    gsap.timeline()
        .to(btn, {
            scale: 0.95,
            duration: 0.1
        })
        .to(btn, {
            scale: 1.1,
            duration: 0.3,
            ease: 'elastic.out(1, 0.5)'
        })
        .set(btn, {
            innerHTML: 'Message Sent! ✨'
        });
    
    // Reset form
    setTimeout(() => {
        e.target.reset();
        btn.innerHTML = 'Send Message';
    }, 3000);
});

// Add magnetic effect to buttons
document.querySelectorAll('.project-btn, .submit-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Add cursor follower for enhanced interactivity
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

document.querySelectorAll('a, button').forEach(el => {
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

// Refresh ScrollTrigger on window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});

// VISIBILITY FIX - Force buttons to be visible as fallback
document.addEventListener('DOMContentLoaded', () => {
    // Ensure all project buttons are visible
    document.querySelectorAll('.project-btn').forEach(btn => {
        btn.style.opacity = '1';
        btn.style.visibility = 'visible';
        btn.style.pointerEvents = 'auto';
    });
    
    // Ensure submit button is visible
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.style.opacity = '1';
        submitBtn.style.visibility = 'visible';
        submitBtn.style.pointerEvents = 'auto';
    }
    
    console.log('Portfolio loaded - buttons verified');
    console.log('Project buttons found:', document.querySelectorAll('.project-btn').length);
    console.log('Submit button found:', document.querySelector('.submit-btn') ? 'YES' : 'NO');
});
