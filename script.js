document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // --- CUSTOM CURSOR ---
    const cursor = document.querySelector('.cursor');
    const interactableElements = document.querySelectorAll('.interactable, a, button');

    window.addEventListener('mousemove', e => {
        gsap.to(cursor, { duration: 0.3, x: e.clientX, y: e.clientY });
    });
    
    interactableElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
    });

    // --- SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            gsap.to(window, { duration: 1.5, scrollTo: targetId, ease: 'power3.inOut' });
        });
    });

    // --- HERO ANIMATION ---
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' }});
    heroTl.from('.hero-image', { scale: 0.8, opacity: 0, duration: 1.2 })
          .from('.hero-title', { y: 50, opacity: 0, duration: 1 }, "-=0.8")
          .from('.scroll-indicator', { opacity: 0, duration: 1 }, "-=0.5");
          
    // --- PROJECT PANEL ANIMATIONS ---
    const projectPanels = document.querySelectorAll('.project-panel');

    projectPanels.forEach(panel => {
        // Animate elements into view when they enter the viewport
        const image = panel.querySelector('.project-image-wrapper');
        const details = panel.querySelectorAll('.project-details > *');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: panel,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
            }
        });

        tl.from(image, {
            x: panel.classList.contains('alt') ? 100 : -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        })
        .from(details, {
            x: panel.classList.contains('alt') ? -50 : 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        }, "-=0.8");

        // Subtle parallax effect on image while scrolling through the panel
        gsap.to(panel.querySelector('.project-image-wrapper img'), {
            yPercent: -10,
            ease: 'none',
            scrollTrigger: {
                trigger: panel,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            }
        });
    });

    // --- CONTACT FORM ANIMATION ---
    gsap.from('.contact-section > .container > *', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });


    // --- FORM SUBMISSION (NO BACKEND) ---
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => { formObject[key] = value; });

        console.log("Form Submitted! Data:", formObject);
        alert("Thank you! Your message has been logged to the console.");
        
        this.reset();
    });
});

