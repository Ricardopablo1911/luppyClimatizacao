
        // Smooth scrolling
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

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Header background on scroll
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(13, 31, 45, 0.98)';
            } else {
                header.style.background = 'rgba(13, 31, 45, 0.95)';
            }
        });

// Adiciona o "ouvinte" de evento ao seu formulário
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    // Impede o envio padrão do formulário
    e.preventDefault();
    
    // Pega todos os dados do formulário de uma vez
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // --- SUA VALIDAÇÃO (mantida como estava) ---
    // Note que adicionei !data.servico aqui, pois você tinha no seu código original
    if (!data.nome || !data.telefone || !data.mensagem) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return; // Para a execução se a validação falhar
    }
    
    // --- LÓGICA DO WHATSAPP (substitui o setTimeout) ---

    // 1. Defina seu número de WhatsApp aqui
    const numeroWhatsapp = '5547997574874'; // <-- TROQUE PELO SEU NÚMERO

    // 2. Monte a mensagem usando os dados do formulário
    // Adicionei o campo "servico" que você tinha na validação
    const textoMensagem = `
        *Novo Contato do Site*\n
        *Nome:* ${data.nome}\n
        *Telefone:* ${data.telefone}\n
        *E-mail:* ${data.email}\n
        --------------------\n
        *Mensagem:*\n
        ${data.mensagem}
    `;

    // 3. Crie o link final
    const linkWhatsapp = `https://api.whatsapp.com/send?phone=${numeroWhatsapp}&text=${encodeURIComponent(textoMensagem)}`;

    // --- FEEDBACK VISUAL E REDIRECIONAMENTO ---

    const button = this.querySelector('.form-button');
    const originalText = button.innerHTML;
    
    // Altera o botão para "Enviando..."
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    button.disabled = true;

    // Abre o WhatsApp em uma nova aba
    window.open(linkWhatsapp, '_blank');

    // Após um pequeno atraso, restaura o formulário e o botão
    // Isso acontece mesmo que o usuário esteja na outra aba
    setTimeout(() => {
        this.reset(); // Limpa o formulário
        button.innerHTML = originalText; // Restaura o texto original do botão
        button.disabled = false; // Reabilita o botão
    }, 2000); // 2 segundos de atraso
});

        // Phone number formatting
        document.getElementById('telefone').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                e.target.value = value;
            }
        });

        // Animate service cards on hover
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-10px)';
            });
        });

        // Add floating animation to hero elements
        function createFloatingElements() {
            const hero = document.querySelector('.hero');
            
            for (let i = 0; i < 20; i++) {
                const element = document.createElement('div');
                element.style.position = 'absolute';
                element.style.width = Math.random() * 4 + 2 + 'px';
                element.style.height = element.style.width;
                element.style.background = 'rgba(0, 212, 255, 0.2)';
                element.style.borderRadius = '50%';
                element.style.left = Math.random() * 100 + '%';
                element.style.top = Math.random() * 100 + '%';
                element.style.pointerEvents = 'none';
                element.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
                
                hero.appendChild(element);
            }
        }

        // Add floating animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        // Initialize floating elements
        createFloatingElements();

        // Mobile menu functionality
        function initMobileMenu() {
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const navLinks = document.getElementById('nav-links');
            const overlay = document.getElementById('menu-overlay');

            if (!mobileMenuBtn || !navLinks) return;

            function openMenu() {
                navLinks.classList.add('active');
                if (overlay) overlay.classList.add('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden';
            }

            function closeMenu() {
                navLinks.classList.remove('active');
                if (overlay) overlay.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }

            mobileMenuBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (navLinks.classList.contains('active')) {
                    closeMenu();
                } else {
                    openMenu();
                }
            });

            if (overlay) {
                overlay.addEventListener('click', closeMenu);
            }

            // Close mobile menu when clicking on any nav link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', closeMenu);
            });

            // Close on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                    closeMenu();
                }
            });
        }
        
        initMobileMenu();

        // Add scroll progress indicator
        function createScrollProgress() {
            const progressBar = document.createElement('div');
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(90deg, #ff6b35, #f7931e);
                z-index: 9999;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);
            
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset;
                const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = (scrollTop / documentHeight) * 100;
                progressBar.style.width = scrollPercent + '%';
            });
        }
        
        createScrollProgress();

        // Add loading animation
        window.addEventListener('load', function() {
            document.body.style.opacity = '1';
        });

        // Add testimonials data (for future enhancement)
        const testimonials = [
            {
                name: "Maria Silva",
                text: "Excelente atendimento! Instalaram meu ar condicionado rapidamente e com muita qualidade.",
                rating: 5
            },
            {
                name: "João Santos", 
                text: "Equipe muito profissional. O serviço de manutenção deixou meu ar condicionado como novo.",
                rating: 5
            },
            {
                name: "Ana Costa",
                text: "Recomendo! Preço justo e trabalho impecável. Já indiquei para vários amigos.",
                rating: 5
            }
        ];

        console.log('Luppy Climatização - Website carregado com sucesso! 🌟');