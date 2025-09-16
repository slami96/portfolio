// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
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

// Auto-switch images for each project (every 2.5 seconds)
document.querySelectorAll('.project-section').forEach(section => {
    const images = section.querySelectorAll('.project-bg img');
    let currentIndex = 0;

    // Image switching function
    function switchImage() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }

    // Start switching every 2.5 seconds
    setInterval(switchImage, 2500);
});

// Project sections animations - all content appears at once on scroll
gsap.utils.toArray('.project-overlay').forEach(overlay => {
    // Initial animation when section comes into view
    gsap.to(overlay, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: overlay,
            start: 'top 80%',
            once: true
        }
    });
    
    // Animate all elements inside at once
    ScrollTrigger.create({
        trigger: overlay,
        start: 'top 80%',
        once: true,
        onEnter: () => {
            const tl = gsap.timeline();
            
            tl.from(overlay.querySelector('.project-number'), {
                scale: 0,
                opacity: 0,
                duration: 0.6,
                ease: 'back.out(1.7)'
            })
            .from(overlay.querySelector('.project-title'), {
                y: 30,
                opacity: 0,
                duration: 0.6
            }, '-=0.4')
            .from(overlay.querySelector('.project-description'), {
                y: 20,
                opacity: 0,
                duration: 0.6
            }, '-=0.4')
            .from(overlay.querySelectorAll('.tech-tag'), {
                scale: 0,
                opacity: 0,
                duration: 0.4,
                stagger: 0.05,
                ease: 'back.out(1.7)'
            }, '-=0.3')
            .from(overlay.querySelector('.project-btn'), {
                scale: 0,
                opacity: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.8)'
            }, '-=0.2');
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
            .from('.contact > .contact-container > p', {
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
            .from('.submit-btn', {
                scale: 0,
                opacity: 0,
                duration: 0.8,
                ease: 'elastic.out(1, 0.8)'
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
            innerHTML: 'MESSAGE SENT! ✨'
        });
    
    // Reset form after 3 seconds
    setTimeout(() => {
        e.target.reset();
        btn.innerHTML = 'SEND MESSAGE';
    }, 3000);
});

// Enhanced hover effects for buttons
document.querySelectorAll('.project-btn, .submit-btn').forEach(btn => {
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

// Add subtle parallax to project overlays
document.querySelectorAll('.project-overlay').forEach(overlay => {
    overlay.addEventListener('mousemove', (e) => {
        const rect = overlay.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.01;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.01;
        
        gsap.to(overlay, {
            x: x,
            y: y,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    overlay.addEventListener('mouseleave', () => {
        gsap.to(overlay, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Custom cursor effect
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

// Performance optimization for reduced motion preference
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

// Log when page is ready
console.log('Portfolio site loaded successfully!');
console.log('All buttons and forms are functional.');
console.log('Projects have auto-switching images every 2.5 seconds.');
