
    // Animações de entrada ao scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    document.addEventListener('DOMContentLoaded', function() {
        const elementsToAnimate = document.querySelectorAll('.bio-header, .bio-section');
        elementsToAnimate.forEach(el => {
            observer.observe(el);
        });

        // Animação inicial do header
        setTimeout(() => {
            document.querySelector('.bio-header').classList.add('animate');
        }, 300);

        // Smooth scroll para links internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Efeito parallax suave no scroll
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            // Aplicar efeito parallax aos elementos de timeline
            const timelineItems = document.querySelectorAll('.timeline-item');
            timelineItems.forEach((item, index) => {
                const offset = (index % 2 === 0) ? rate * 0.1 : rate * -0.1;
                item.style.transform = `translateX(${offset}px)`;
            });
            
            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });

        // Contador animado para conquistas (se houver números)
        function animateCounters() {
            const counters = document.querySelectorAll('[data-count]');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
            });
        }

        // Efeito de typing para a missão
        function typeWriter(element, text, speed = 50) {
            let i = 0;
            element.textContent = '';
            
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            type();
        }

        // Aplicar efeito de typing na missão após um delay
        setTimeout(() => {
            const missionElement = document.querySelector('.bio-mission');
            const missionText = missionElement.textContent;
            typeWriter(missionElement, missionText, 30);
        }, 1500);

        // Adicionar efeito hover avançado aos cards de skills
        const skillCategories = document.querySelectorAll('.skill-category');
        skillCategories.forEach(category => {
            category.addEventListener('mouseenter', function() {
                const tags = this.querySelectorAll('.skill-tag');
                tags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.transform = 'scale(1.05) rotate(2deg)';
                    }, index * 50);
                });
            });

            category.addEventListener('mouseleave', function() {
                const tags = this.querySelectorAll('.skill-tag');
                tags.forEach(tag => {
                    tag.style.transform = 'scale(1) rotate(0deg)';
                });
            });
        });

        // Progress bars animadas para skills (opcional)
        function createProgressBars() {
            const skillLevels = {
                'React': 90,
                'Vue.js': 85,
                'JavaScript ES6+': 95,
                'TypeScript': 80,
                'Node.js': 88,
                'Python': 85,
                'Django': 82,
                'Figma': 92,
                'Adobe XD': 88
            };

            // Você pode implementar barras de progresso se desejar
            // Esta é apenas a estrutura base
        }

        // Detectar se o usuário prefere movimento reduzido
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            // Desabilitar animações complexas para usuários que preferem menos movimento
            document.documentElement.style.setProperty('--animation-duration', '0.1s');
        }

        // Easter egg - Konami Code
        let konamiCode = [];
        const correctCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
        
        document.addEventListener('keydown', function(e) {
            konamiCode.push(e.keyCode);
            if (konamiCode.length > correctCode.length) {
                konamiCode.shift();
            }
            
            if (konamiCode.toString() === correctCode.toString()) {
                // Easter egg ativado!
                document.body.style.animation = 'rainbow 2s infinite';
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 5000);
            }
        });

        // Adicionar animação rainbow para o easter egg
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    });

    // Função para compartilhar perfil (Web Share API)
    function shareProfile() {
        if (navigator.share) {
            navigator.share({
                title: 'Jeffeson Brito - Desenvolvedor Full Stack',
                text: 'Conheça o trabalho de Jeffeson Brito, desenvolvedor full stack e designer UX/UI',
                url: window.location.href
            });
        } else {
            // Fallback para navegadores que não suportam Web Share API
            navigator.clipboard.writeText(window.location.href).then(() => {
                // Mostrar notificação de sucesso
                const notification = document.createElement('div');
                notification.textContent = 'Link copiado para a área de transferência!';
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #2c2c2c;
                    color: white;
                    padding: 15px 20px;
                    border-radius: 5px;
                    z-index: 1001;
                    animation: slideIn 0.3s ease;
                `;
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.remove();
                }, 3000);
            });
        }
    }

    // Adicionar CSS para a animação de notificação
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(notificationStyle);
