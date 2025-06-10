// Animation au scroll
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation des éléments au scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .inscription-content, .hours table, .map-container');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialisation des styles pour l'animation
    const animatedElements = document.querySelectorAll('.service-card, .inscription-content, .hours table, .map-container');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Déclenchement au chargement et au scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Adaptation du menu en fonction de la taille de l'écran
    window.addEventListener('resize', function() {
        const nav = document.querySelector('nav ul');
        if (window.innerWidth > 768) {
            nav.style.display = 'flex';
        } else {
            nav.style.display = 'none';
        }
    });

    // Gestion du slider
    const slides = document.querySelectorAll('.slide');
    const prev = document.querySelector('.slider-container .prev');
    const next = document.querySelector('.slider-container .next');
    let current = 0;
    let autoSlide;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function goToPrev() {
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
    }

    function goToNext() {
        current = (current + 1) % slides.length;
        showSlide(current);
    }

    prev.addEventListener('click', () => {
        goToPrev();
        resetAutoSlide();
    });

    next.addEventListener('click', () => {
        goToNext();
        resetAutoSlide();
    });

    // Auto slide
    function startAutoSlide() {
        autoSlide = setInterval(goToNext, 4000);
    }
    function resetAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
    }
    startAutoSlide();

    // Touch events for mobile swipe
    let startX = 0;
    let isSwiping = false;
    const slider = document.querySelector('.slider-container');

    slider.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        isSwiping = true;
    });

    slider.addEventListener('touchmove', function(e) {
        if (!isSwiping) return;
        let diff = e.touches[0].clientX - startX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                goToPrev();
            } else {
                goToNext();
            }
            resetAutoSlide();
            isSwiping = false;
        }
    });

    slider.addEventListener('touchend', function() {
        isSwiping = false;
    });

    const hamburger = document.querySelector('.hamburger');
    const mainMenu = document.querySelector('.main-menu');
    const nav = document.querySelector('nav');

    // Hamburger menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mainMenu.classList.toggle('show');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    // Fermer le menu au clic sur un lien
    mainMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mainMenu.classList.remove('show');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});

// Changement d'image de la galerie au hover (optionnel)
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        // Vous pouvez ajouter ici un effet de zoom ou de changement d'image
        this.style.transform = 'scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});