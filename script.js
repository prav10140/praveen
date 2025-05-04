// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize 3D background for hero section
    initVantaBackground();
    
    // Initialize tilt effect for project cards
    initTiltEffect();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize navbar scroll effect
    initNavbarScroll();
    
    // Smooth scroll for anchor links
    initSmoothScroll();
});

// Initialize 3D Net background for hero section
function initVantaBackground() {
    if (typeof VANTA !== 'undefined') {
        VANTA.NET({
            el: "#hero-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x6c63ff,
            backgroundColor: 0x121212,
            points: 10.00,
            maxDistance: 25.00,
            spacing: 16.00
        });
    } else {
        console.error('VANTA is not defined. Make sure the library is included.');
    }
}

// Initialize tilt effect for project cards
function initTiltEffect() {
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".project-card"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });
    } else {
        console.error('VanillaTilt is not defined. Make sure the library is included.');
    }
}

// Initialize scroll animations with GSAP
function initScrollAnimations() {
    // Register ScrollTrigger plugin
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate section titles
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                y: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: title,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        });
        
        // Animate project cards
        gsap.utils.toArray('.project-card').forEach((card, i) => {
            gsap.from(card, {
                y: 100,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.1,
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });
        });
        
        // Animate about section
        gsap.from(".about-image-wrapper", {
            x: -50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
              trigger: ".about-container",
              start: "top 75%",
              toggleActions: "play none none none",
            },
          })
      
          gsap.from(".about-content", {
            x: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
              trigger: ".about-container",
              start: "top 75%",
              toggleActions: "play none none none",
            },
          })
      
          // Animate skills
          gsap.utils.toArray(".skill").forEach((skill, i) => {
            gsap.from(skill, {
              scale: 0.5,
              opacity: 0,
              duration: 0.5,
              delay: i * 0.05,
              scrollTrigger: {
                trigger: ".skills",
                start: "top 85%",
                toggleActions: "play none none none",
              },
            })
          })
      
        // Animate contact section
        gsap.from('.contact-info', {
            x: -50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '.contact-container',
                start: "top 75%",
                toggleActions: "play none none none"
            }
        });
        
        gsap.from('.contact-form', {
            x: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '.contact-container',
                start: "top 75%",
                toggleActions: "play none none none"
            }
        });
        
        
    } else {
        console.error('GSAP and/or ScrollTrigger are not defined. Make sure the libraries are included.');
    }
}

// Initialize mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        // Toggle active class
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Initialize navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Initialize smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get the navbar height for offset
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                
                // Calculate the position to scroll to
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add 3D hover effect to CTA button
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('mousemove', (e) => {
        const rect = ctaButton.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        ctaButton.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });
    
    ctaButton.addEventListener('mouseleave', () => {
        ctaButton.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
    
    // Scroll to projects section when clicking the CTA button
    ctaButton.addEventListener('click', () => {
        const projectsSection = document.getElementById('projects');
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        window.scrollTo({
            top: projectsSection.offsetTop - navbarHeight,
            behavior: 'smooth'
        });
    });
}
