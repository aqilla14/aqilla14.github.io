document.addEventListener('DOMContentLoaded', function() {
    
    // ====================================================================
    // 1. UTILITY & NAVIGATION
    // ====================================================================
    
    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.getAttribute('href') !== '#') {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Offset 70px untuk navbar
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, 
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    // Set Tahun di Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Navbar Scroll Effect & Toggle
    const header = document.getElementById('site-header');
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
        navLinks.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', !isExpanded);
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });


    // ====================================================================
    // 2. HERO SECTION ANIMATIONS
    // ====================================================================

    // A. Efek Ketik (Typed Effect)
    const typedTextElement = document.getElementById('typed');
    const strings = [ "HTML/CSS",
        "Dasar PHP & JavaScript",
        "Visual Designer (Canva & Photoshop)",
        "Laravel Dasar"];
    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 90;
    const deletingSpeed = 40;
    const delayBeforeNext = 1800;

    function type() {
        if (!typedTextElement) return;

        const currentString = strings[stringIndex];
        
        if (!isDeleting) {
            typedTextElement.textContent = currentString.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentString.length) {
                isDeleting = true;
                setTimeout(type, delayBeforeNext);
            } else {
                setTimeout(type, typingSpeed);
            }
        } else {
            typedTextElement.textContent = currentString.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                stringIndex = (stringIndex + 1) % strings.length;
                setTimeout(type, 600);
            } else {
                setTimeout(type, deletingSpeed);
            }
        }
    }
    type();

    // B. Animasi Tampilkan/Sembunyikan Foto Profil
    const btnProfile = document.getElementById('btn-profile');
    const profileWrap = document.getElementById('profile-wrap');

    // Default: Foto terlihat saat loading
    profileWrap.classList.add('visible'); 
    
    if (btnProfile) {
        btnProfile.addEventListener('click', (e) => {
            e.preventDefault();
            profileWrap.classList.toggle('visible');
            const isVisible = profileWrap.classList.contains('visible');
            btnProfile.textContent = isVisible ? 'HIDE PROFILE' : 'SHOW PROFILE';
            btnProfile.classList.toggle('btn-outline', isVisible); // Outline saat hide
            btnProfile.classList.toggle('btn-primary', !isVisible); // Primary saat show
        });
    }

    // ====================================================================
    // 3. ANIMASI SCROLL REVEAL ELEGANT (Staggered Effect)
    // ====================================================================
    
    // Mendefinisikan semua elemen yang akan di-staggered
    document.querySelectorAll('.reveal').forEach(parent => {
        // Selector untuk elemen anak di setiap section
        ['.hero-greeting', '.hero-title', '.hero-typed-container', '.lead', '.hero-cta', '.availability',
         '.timeline-item', '.skill', '.cert-card', '.project-card', '.item', '.chip', 
         '.form-group', '.info-block', '.btn', '.about-text', '.section-title'].forEach(selector => {
            parent.querySelectorAll(selector).forEach(child => {
                child.classList.add('reveal-item');
            });
        });
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const parent = entry.target;
                
                // Ambil semua elemen anak yang memiliki class 'reveal-item'
                const children = parent.querySelectorAll('.reveal-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('active');
                        
                        // Khusus untuk skill bar
                        if (child.classList.contains('skill')) {
                             const fillBar = child.querySelector('.skill-fill');
                             if (fillBar) {
                                 const fillPercentage = fillBar.getAttribute('data-fill');
                                 fillBar.style.width = fillPercentage;
                             }
                        }
                    }, index * 100); // Jeda 100ms antar elemen anak

                    // Hapus class agar tidak dihitung lagi pada iterasi selanjutnya
                    child.classList.remove('reveal-item'); 
                });
                
                observer.unobserve(parent);
            }
        });
    }, observerOptions);

    // Amati setiap section utama yang memiliki class 'reveal'
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});