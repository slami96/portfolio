// Remove no-js class immediately
document.documentElement.classList.remove('no-js');

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// SET INITIAL STATES
gsap.set('.project-number', { scale: 0, opacity: 0 });
gsap.set('.project-title', { y: 30, opacity: 0 });
gsap.set('.project-description', { y: 20, opacity: 0 });
gsap.set('.tech-tag', { scale: 0, opacity: 0 });
gsap.set('.project-button', { scale: 0, opacity: 0 });

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

// Hero animations - Enhanced timing
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

// PROJECT SECTIONS - FIXED TIMING: 2s each image, THEN text appears
document.querySelectorAll('.project-section').forEach((section, index) => {
    const img1 = section.querySelector('.img-1');
    const img2 = section.querySelector('.img-2');
    
    // Create ScrollTrigger for this specific section
    ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        once: true,
        onEnter: () => {
            // PHASE 1: Show first image for 2 seconds
            console.log(`Project ${index + 1}: Starting image sequence`);
            
            // First image is already visible, wait 2 seconds
            setTimeout(() => {
                console.log(`Project ${index + 1}: Switching to second image`);
                
                // PHASE 2: Show second image for 2 seconds
                gsap.to(img2, { opacity: 0.7, duration: 0.5, ease: 'power2.inOut' });
                gsap.to(img1, { opacity: 0.3, duration: 0.5, ease: 'power2.inOut' });
                
                setTimeout(() => {
                    console.log(`Project ${index + 1}: Showing content`);
                    
                    // PHASE 3: After 4 seconds total (2s + 2s), show content
                    const timeline = gsap.timeline();
                    
                    timeline
                        .to(section.querySelector('.project-number'), {
                            scale: 1,
                            opacity: 0.15,
                            duration: 0.6,
                            ease: 'back.out(1.7)'
                        })
                        .to(section.querySelector('.project-title'), {
                            y: 0,
                            opacity: 1,
                            duration: 0.6,
                            ease: 'power3.out'
                        }, '-=0.3')
                        .to(section.querySelector('.project-description'), {
                            y: 0,
                            opacity: 1,
                            duration: 0.6,
                            ease: 'power3.out'
                        }, '-=0.3')
                        .to(section.querySelectorAll('.tech-tag'), {
                            scale: 1,
                            opacity: 1,
                            duration: 0.4,
                            stagger: 0.08,
                            ease: 'back.out(1.7)'
                        }, '-=0.2')
                        .to(section.querySelector('.project-button'), {
                            scale: 1,
                            opacity: 1,
                            duration: 0.8,
                            ease: 'elastic.out(1, 0.5)',
                            onComplete: () => {
                                // Ensure button is fully interactive after animation
                                const button = section.querySelector('.project-button');
                                button.style.pointerEvents = 'auto';
                                button.style.zIndex = '100';
                                
                                // START CONTINUOUS IMAGE CYCLING (every 3 seconds)
                                let currentImage = 2; // We're on image 2 now
                                setInterval(() => {
                                    if (currentImage === 1) {
                                        gsap.to(img2, { opacity: 0.7, duration: 1, ease: 'power2.inOut' });
                                        gsap.to(img1, { opacity: 0.3, duration: 1, ease: 'power2.inOut' });
                                        currentImage = 2;
                                    } else {
                                        gsap.to(img1, { opacity: 1, duration: 1, ease: 'power2.inOut' });
                                        gsap.to(img2, { opacity: 0, duration: 1, ease: 'power2.inOut' });
                                        currentImage = 1;
                                    }
                                }, 3000);
                            }
                        }, '-=0.1');
                }, 2000); // Wait 2 more seconds
            }, 2000); // Wait 2 seconds
        }
    });
});

// Contact section animations
gsap.set('.contact h2', { y: 50, opacity: 0 });
gsap.set('.contact-container > p', { y: 30, opacity: 0 });
gsap.set('.form-group', { y: 30, opacity: 0 });
gsap.set('.form-submit-button', { scale: 0, opacity: 0 });
gsap.set('.social-icon', { scale: 0, rotation: -180, opacity: 0 });

ScrollTrigger.create({
    trigger: '.contact',
    start: 'top 80%',
    once: true,
    onEnter: () => {
        gsap.timeline()
            .to('.contact h2', {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out'
            })
            .to('.contact-container > p', {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.5')
            .to('.form-group', {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.15,
                ease: 'power3.out'
            }, '-=0.4')
            .to('.form-submit-button', {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: 'elastic.out(1, 0.5)'
            }, '-=0.2')
            .to('.social-icon', {
                scale: 1,
                rotation: 0,
                opacity: 1,
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

// Enhanced button hover effects
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
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
    }, 1000);
});

// Parallax effect for big hero elements
gsap.utils.toArray('.big-element').forEach((element, i) => {
    gsap.to(element, {
        yPercent: -20 * (i % 3 + 1),
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });
});

// Contact parallax effect
gsap.utils.toArray('.contact-orb, .contact-geo').forEach((element, i) => {
    gsap.to(element, {
        yPercent: -15 * (i % 2 + 1),
        ease: 'none',
        scrollTrigger: {
            trigger: '.contact',
            start: 'top bottom',
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
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('a, button, .dot, .scroll-indicator').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.background = 'rgba(78, 205, 196, 0.1)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'transparent';
            });
        });
    }, 1000);
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

// Enhanced visibility check on load
window.addEventListener('load', () => {
    // Force refresh ScrollTrigger
    ScrollTrigger.refresh();
    
    // Check if sections are already in view and trigger animations immediately
    document.querySelectorAll('.project-section').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            // If section is already in view, trigger the animation immediately
            ScrollTrigger.getById(section.id)?.refresh();
        }
    });
    
    // Debug logging
    console.log('Fixed Portfolio loaded successfully');
    console.log('Project sections found:', document.querySelectorAll('.project-section').length);
    console.log('Big elements found:', document.querySelectorAll('.big-element').length);
});

// Mouse interaction effects for big floating elements
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Subtle mouse parallax for big floating elements
    gsap.utils.toArray('.big-element').forEach((element, i) => {
        const speed = (i + 1) * 0.2;
        gsap.to(element, {
            x: mouseX * speed * 30,
            y: mouseY * speed * 30,
            duration: 1.5,
            ease: 'power2.out'
        });
    });
    
    // Contact elements mouse interaction
    gsap.utils.toArray('.contact-orb').forEach((element, i) => {
        const speed = (i + 1) * 0.15;
        gsap.to(element, {
            x: mouseX * speed * 20,
            y: mouseY * speed * 20,
            duration: 2,
            ease: 'power2.out'
        });
    });
});

// Interactive hover effects for sections
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        // Hero section interactions
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => {
                gsap.to('.big-element', {
                    scale: 1.1,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'power2.out'
                });
            });
            
            heroSection.addEventListener('mouseleave', () => {
                gsap.to('.big-element', {
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power2.out'
                });
            });
        }
        
        // Contact section interactions
        const contactSection = document.querySelector('.contact');
        if (contactSection) {
            contactSection.addEventListener('mouseenter', () => {
                gsap.to('.contact-geo', {
                    scale: 1.2,
                    rotation: '+=45',
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
            
            contactSection.addEventListener('mouseleave', () => {
                gsap.to('.contact-geo', {
                    scale: 1,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
        }
    }, 1000);
});

// Smooth scrolling enhancement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
