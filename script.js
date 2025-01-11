// GSAP animations for hero section
gsap.from(".hero-content", { opacity: 0, y: 100, duration: 1, ease: "power3.out" });
gsap.from(".btn-main", { opacity: 0, scale: 0.5, duration: 1, delay: 1, ease: "power3.out" });

// ScrollMagic Controller
var controller = new ScrollMagic.Controller();

// Animate Project Cards on Scroll
document.querySelectorAll(".project-card").forEach(function(card) {
    gsap.from(card, { opacity: 0, y: 100, duration: 1 });
    new ScrollMagic.Scene({ triggerElement: card, triggerHook: 0.9 })
        .setTween(card, { opacity: 1, y: 0 })
        .addTo(controller);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});

// Highlight active navigation link based on scroll position
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let currentPosition = window.scrollY;
    sections.forEach((section, index) => {
        let sectionTop = section.offsetTop;
        let sectionHeight = section.offsetHeight;
        
        if (currentPosition >= sectionTop - sectionHeight / 3 && currentPosition < sectionTop + sectionHeight - sectionHeight / 3) {
            navLinks[index].classList.add('active');
        } else {
            navLinks[index].classList.remove('active');
        }
    });
});
