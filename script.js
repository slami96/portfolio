document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // --- SMOOTH SCROLL FOR HEADER LINKS ---
    const navLinks = document.querySelectorAll('.main-header nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            gsap.to(window, { duration: 1.5, scrollTo: targetId, ease: 'power2.inOut' });
        });
    });

    // --- BACKGROUND SHAPES ANIMATION ---
    gsap.to(".shape", {
        x: 'random(-50, 50)',
        y: 'random(-50, 50)',
        scale: 'random(0.8, 1.2)',
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
    });

    // --- HERO SECTION ANIMATIONS ---
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
    
    heroTl.to('.hero-text .line', {
        y: 0,
        stagger: 0.2,
        delay: 0.2
    })
    .from('#profile-pic', {
        scale: 0.8,
        opacity: 0,
        duration: 1.5
    }, "-=1");

    // Hero image parallax effect
    gsap.to('#profile-pic', {
        y: -50,
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // --- PROJECTS SECTION PINNING & ANIMATIONS ---
    const projectPanels = document.querySelectorAll('.project-panel');

    projectPanels.forEach((panel, i) => {
        const view1 = panel.querySelector('.view-1');
        const view2 = panel.querySelector('.view-2');
        const bgColor = panel.getAttribute('data-color');
        const initialBgColor = i === 0 ? '#0d0c0f' : projectPanels[i-1].getAttribute('data-color');


        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: panel,
                pin: true,
                start: 'top top',
                end: '+=1500', // How long the pin lasts in pixels scrolled
                scrub: 1, // Smoothly syncs with scroll
                onEnter: () => gsap.to('body', { backgroundColor: bgColor, duration: 1, overwrite: 'auto' }),
                onLeaveBack: () => gsap.to('body', { backgroundColor: initialBgColor, duration: 1, overwrite: 'auto'}),
            }
        });

        // Animate from view-1 to view-2
        tl.to(view1, {
            scale: 0.9,
            opacity: 0,
            y: '-10%',
            ease: 'power2.inOut'
        })
        .from(view2, {
            scale: 1.1,
            opacity: 0,
            y: '10%',
            ease: 'power2.inOut'
        }, '<') // The '<' starts this animation at the same time as the previous one
        .from(view2.querySelector('.project-description'), {
            opacity: 0,
            y: 30,
            ease: 'power2.out'
        }, '-=0.5'); // Starts slightly after the view-2 image fades in
    });


    // --- CONTACT FORM ANIMATIONS ---
    const formElements = gsap.utils.toArray('.contact-section .form-group, .contact-section h2, .contact-section .submit-btn');

    gsap.from(formElements, {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.75)',
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 70%',
            toggleActions: 'play none none none' // Play animation once when it enters the viewport
        }
    });

    // --- CONTACT FORM SUBMISSION (NO BACKEND) ---
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        console.log("Form Submitted! Data:", formObject);
        alert("Thank you! Your message has been logged to the console.");
        
        this.reset();
        // Manually trigger label reset by removing focus
        document.activeElement.blur();
    });
});
