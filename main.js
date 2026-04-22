/* main.js - 권지연 피아노 */

document.addEventListener('DOMContentLoaded', () => {

    /* ─────────────────────────────
       1. Header Scroll Effect
    ───────────────────────────── */
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    /* ─────────────────────────────
       2. Hero Slider
    ───────────────────────────── */
    const heroImgs    = document.querySelectorAll('.hero-img');
    const indicators  = document.querySelectorAll('.indicator');
    let currentSlide  = 0;
    let sliderTimer   = null;

    function goToSlide(idx) {
        heroImgs[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');
        currentSlide = (idx + heroImgs.length) % heroImgs.length;
        heroImgs[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    function startSlider() {
        sliderTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
    }

    if (heroImgs.length > 1) {
        startSlider();
        indicators.forEach(btn => {
            btn.addEventListener('click', () => {
                clearInterval(sliderTimer);
                goToSlide(parseInt(btn.dataset.index));
                startSlider();
            });
        });
    }

    /* ─────────────────────────────
       3. Mobile Navigation
    ───────────────────────────── */
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        hamburger.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
        // Animate hamburger icon
        const spans = hamburger.querySelectorAll('span');
        if (isOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity  = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        }
    });

    // Close nav when link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        });
    });

    /* ─────────────────────────────
       4. Smooth Scroll
    ───────────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = header.offsetHeight + 8;
                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ─────────────────────────────
       5. AOS (Animate on Scroll)
    ───────────────────────────── */
    const aosElements = document.querySelectorAll('[data-aos]');

    const aosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                aosObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    aosElements.forEach(el => aosObserver.observe(el));

    /* ─────────────────────────────
       6. Gallery Touch (Mobile)
    ───────────────────────────── */
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('touchstart', () => {
            // Toggle overlay on mobile tap
            const overlay = item.querySelector('.gallery-overlay');
            const isVisible = overlay.style.opacity === '1';
            overlay.style.opacity = isVisible ? '0' : '1';
        }, { passive: true });
    });

    /* ─────────────────────────────
       7. Parallax subtle effect on hero
    ───────────────────────────── */
    const heroOverlay = document.querySelector('.hero-overlay');
    window.addEventListener('scroll', () => {
        if (window.scrollY < window.innerHeight) {
            const ratio = window.scrollY / window.innerHeight;
            if (heroOverlay) {
                heroOverlay.style.opacity = 0.6 + ratio * 0.4;
            }
        }
    }, { passive: true });

});
