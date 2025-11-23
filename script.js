document.addEventListener('DOMContentLoaded', () => {
    
    // 1. CUSTOM CURSOR
    const dot = document.querySelector('.cursor-dot');
    const circle = document.querySelector('.cursor-circle');

    // Only activate cursor logic on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            dot.style.left = `${posX}px`;
            dot.style.top = `${posY}px`;

            circle.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });
    }

    // 2. HOVER STATES
    const hoverTargets = document.querySelectorAll('.hover-target, a');
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        target.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });

    // 3. IMAGE HOVER REVEAL (Moves image within the row)
    const rows = document.querySelectorAll('.table-row');
    
    rows.forEach(row => {
        row.addEventListener('mousemove', (e) => {
            const img = row.querySelector('.hover-reveal-img');
            const rect = row.getBoundingClientRect();
            
            // Calculate mouse position relative to the row
            const x = e.clientX - rect.left;
            
            // Move the image slightly horizontally
            // Center it and apply a factor
            const moveX = (x - rect.width / 2) / 5;

            gsap.to(img, {
                x: moveX,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });

    // 4. ANIMATION ON LOAD (Fade Up)
    gsap.from(".hero-title h1", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.2
    });

    gsap.from(".table-row", {
        scrollTrigger: {
            trigger: ".project-table",
            start: "top 80%"
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8
    });
    
    gsap.from(".about-grid", {
        scrollTrigger: {
            trigger: ".about-section",
            start: "top 70%"
        },
        y: 50,
        opacity: 0,
        duration: 1
    });
});
