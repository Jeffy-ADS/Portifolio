/* static/js/scripts.js */
// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    
    // Configuração de fallback para imagem de perfil
    const profileImg = document.getElementById('profileImg');
    const fallbackImageSVG = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjZTBkNWNiIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNTAiIGZpbGw9IiM5Yjg5N2EiLz4KPHBhdGggZD0iTTEyMCAzMDBjMC01NSAzNi0xMDAgODAtMTAwczgwIDQ1IDgwIDEwMHYxMDBIMTIwVjMwMFoiIGZpbGw9IiM5Yjg5N2EiLz4KPC9zdmc+';
    
    // Configura fallback para imagem de perfil
    if (profileImg) {
        profileImg.onerror = function() {
            this.src = fallbackImageSVG;
        };
    }

    // Smooth scroll para links da navegação
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Se for um hash link, aplica smooth scroll
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });

        // Adiciona efeito de hover com som (opcional)
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Efeitos para links sociais
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const socialType = this.getAttribute('data-social');
            const socialUrls = {
                instagram: 'https://www.instagram.com/j3ff3son',
                facebook: 'https://www.facebook.com/j3ff3son',
                twitter: 'https://www.twitter.com/j3ff3son',
                linkedin: 'https://www.linkedin.com/in/j3ff3son'
            };

            // Simula redirecionamento (você pode substituir pelas URLs reais)
            if (socialUrls[socialType]) {
                console.log(`Redirecionando para: ${socialUrls[socialType]}`);
                // window.open(socialUrls[socialType], '_blank');
            }
        });

        // Efeito de pulso ao clicar
        link.addEventListener('click', function() {
            this.style.animation = 'pulse 0.3s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });

    // Efeito de digitação no nome (opcional)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        element.style.opacity = '1';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Aplica efeito de digitação no nome (descomente se quiser usar)
    // const profileName = document.querySelector('.profile-name');
    // if (profileName) {
    //     const originalText = profileName.textContent;
    //     typeWriter(profileName, originalText, 80);
    // }

    // Parallax suave no scroll
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.profile-container');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
        
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Animação de entrada dos elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observa elementos para animação
    const animatedElements = document.querySelectorAll('.profile-info > *');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Efeito de hover na imagem de perfil
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02) rotate(1deg)';
        });

        profileImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }

    // Loading animation
    window.addEventListener('load', function() {
        const profileContainer = document.querySelector('.profile-container');
        if (profileContainer) {
            profileContainer.style.opacity = '1';
            profileContainer.style.transform = 'translateY(0)';
        }
    });

    // Adiciona classe de animação ao CSS dinamicamente
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .profile-container {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.8s ease;
        }
    `;
    document.head.appendChild(style);

    console.log('Portfolio Jeffeson Brito - Carregado com sucesso!');
});