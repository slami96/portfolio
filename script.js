document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // --- SMOOTH SCROLL FOR HEADER LINKS ---
    document.querySelectorAll('.main-header a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            gsap.to(window, { duration: 1.5, scrollTo: targetId, ease: 'power2.inOut' });
        });
    });

    // --- HERO SECTION ANIMATIONS ---
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
    
    heroTl.to('.hero-text .line', {
        y: 0,
        stagger: 0.15,
        delay: 0.2
    })
    .from('.hero-image', {
        scale: 0.8,
        opacity: 0,
        duration: 1.5
    }, "-=1");

    // Hero image parallax on scroll
    gsap.to('#profile-pic', {
        yPercent: -10,
        ease: 'none',
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
        const bgColor = panel.getAttribute('data-color');
        const initialBgColor = i === 0 ? '#0d0c0f' : projectPanels[i - 1].getAttribute('data-color');

        // Select the two views for text and images separately
        const detailView1 = panel.querySelector('.project-details .view-1');
        const detailView2 = panel.querySelector('.project-details .view-2');
        const imageView1 = panel.querySelector('.project-image-stack .view-1');
        const imageView2 = panel.querySelector('.project-image-stack .view-2');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: panel,
                pin: true,
                start: 'top top',
                end: '+=1500', 
                scrub: 1, 
                onEnter: () => gsap.to('body', { backgroundColor: bgColor, duration: 0.5, overwrite: 'auto' }),
                onLeaveBack: () => gsap.to('body', { backgroundColor: initialBgColor, duration: 0.5, overwrite: 'auto'}),
            }
        });

        // Animate from view-1 to view-2 for both text and images
        tl.fromTo(detailView1, { opacity: 1, y: 0 }, { opacity: 0, y: -20, ease: 'power2.in' })
          .fromTo(imageView1, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.95, ease: 'power2.in' }, "<")
          .fromTo(detailView2, { opacity: 0, y: 20 }, { opacity: 1, y: 0, ease: 'power2.out' })
          .fromTo(imageView2, { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, ease: 'power2.out' }, "<");
    });

    // --- CONTACT FORM ANIMATIONS ---
    const formElements = gsap.utils.toArray('.contact-content > *');

    gsap.from(formElements, {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });

    // --- CONTACT FORM SUBMISSION (NO BACKEND) ---
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => { formObject[key] = value; });

        console.log("Form Submitted! Data:", formObject);
        alert("Thank you! Your message has been logged to the console.");
        
        this.reset();
        document.activeElement.blur(); // Remove focus from the button
    });
});
