// ==================== Navbar Scroll Effect ====================
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==================== Download Tab Switching ====================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(tabName + '-content');
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // ==================== Smooth Scroll Navigation ====================
    const navLinks = document.querySelectorAll('.navbar-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's an anchor link
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const collapseBtn = document.querySelector('.navbar-toggler');
                        collapseBtn.click();
                    }
                    
                    // Scroll to target
                    const navHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ==================== Intersection Observer for Animations ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        observer.observe(card);
    });

    // Observe service items
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        observer.observe(item);
    });

    // Observe usage cards
    const usageCards = document.querySelectorAll('.usage-card');
    usageCards.forEach(card => {
        observer.observe(card);
    });

    // Observe download cards
    const downloadCards = document.querySelectorAll('.download-card');
    downloadCards.forEach(card => {
        observer.observe(card);
    });

    // ==================== Email Copy Functionality ====================
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            // Allow default behavior but add feedback
            const email = this.textContent;
            console.log('Email clicked:', email);
        });
    }

    // ==================== Button Ripple Effect ====================
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            // Remove existing ripples
            const existingRipple = this.querySelector('.ripple');
            if (existingRipple) {
                existingRipple.remove();
            }
            
            this.appendChild(ripple);
        });
    });

    // ==================== Scroll Progress Bar ====================
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(to right, #0066ff, #f72585);
        width: 0%;
        z-index: 9999;
        transition: width 0.2s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // ==================== Counter Animation ====================
    function animateCounter(element, start, end, duration = 2000) {
        let current = start;
        const increment = (end - start) / (duration / 16);
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                element.textContent = end;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // ==================== Form Validation ====================
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!this.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            this.classList.add('was-validated');
        });
    });

    // ==================== Dark Mode Toggle (Optional) ====================
    const initializeDarkMode = () => {
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const savedMode = localStorage.getItem('darkMode');
            
            if (savedMode === 'true' || (prefersDark && !savedMode)) {
                document.body.classList.add('dark-mode');
                darkModeToggle.checked = true;
            }
            
            darkModeToggle.addEventListener('change', function() {
                document.body.classList.toggle('dark-mode');
                localStorage.setItem('darkMode', this.checked);
            });
        }
    };
    
    initializeDarkMode();

    // ==================== Performance Optimization ====================
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img.lazy').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ==================== Mobile Menu ====================
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
    }

    // ==================== Utility Functions ====================
    window.copyToClipboard = function(text) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('已复制到剪贴板!', 'success');
        }).catch(() => {
            showNotification('复制失败', 'error');
        });
    };

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} notification`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // ==================== Event Tracking (Google Analytics style) ====================
    const trackEvent = (category, action, label) => {
        if (window.gtag) {
            gtag('event', action, {
                'event_category': category,
                'event_label': label
            });
        }
    };

    // Track button clicks
    document.querySelectorAll('.btn-primary, .btn-light, .btn-download').forEach(button => {
        button.addEventListener('click', function() {
            const text = this.textContent.trim();
            trackEvent('engagement', 'button_click', text);
        });
    });

    // ==================== Accessibility ====================
    // Add focus visible styles
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-active');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-active');
    });
});

// ==================== Additional CSS for Animations ====================
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .keyboard-active *:focus {
        outline: 2px solid #0066ff;
        outline-offset: 2px;
    }

    .notification {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        border-radius: 0.5rem;
        border: none;
    }

    img.lazy {
        background-color: #f0f0f0;
        opacity: 0.5;
    }

    img.lazy.loaded {
        opacity: 1;
        animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    /* Dark mode styles (optional) */
    body.dark-mode {
        background-color: #1a1a1a;
        color: #f0f0f0;
    }

    body.dark-mode .navbar,
    body.dark-mode .feature-card,
    body.dark-mode .contact-card {
        background-color: #2a2a2a;
        color: #f0f0f0;
        border-color: #404040;
    }

    body.dark-mode h1,
    body.dark-mode h2,
    body.dark-mode h3,
    body.dark-mode h4,
    body.dark-mode h5,
    body.dark-mode h6 {
        color: #f0f0f0;
    }

    body.dark-mode .text-muted {
        color: #b0b0b0 !important;
    }

    body.dark-mode .bg-light {
        background-color: #2a2a2a !important;
    }
`;

document.head.appendChild(style);

// ==================== Page Load Performance ====================
window.addEventListener('load', function() {
    // Remove loading class if exists
    document.body.classList.remove('loading');
    
    // Log performance metrics
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time:', pageLoadTime + 'ms');
    }
});
