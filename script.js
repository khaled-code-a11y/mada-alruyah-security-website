/**
 * MADA AL-RUYAH ESTABLISHMENT FOR SECURITY SYSTEMS & IT
 * مؤسسة مدى الرؤية للأنظمة الأمنية وتقنية المعلومات
 * Main JavaScript File
 * =============================================
 */

'use strict';

/* ===== STATE ===== */
let currentLang = 'ar';
let isMenuOpen = false;
let animatedCounters = new Set();

/* ===== PRELOADER ===== */
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        // Start hero parallax
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) heroBg.classList.add('loaded');
        // Init particles
        createParticles();
    }, 1600);
});

/* ===== PARTICLES ===== */
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const count = window.innerWidth < 768 ? 15 : 30;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 3 + 1;
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}%;
            animation-duration: ${Math.random() * 12 + 8}s;
            animation-delay: ${Math.random() * 8}s;
            opacity: ${Math.random() * 0.5 + 0.2};
        `;
        container.appendChild(particle);
    }
}

/* ===== NAVBAR SCROLL BEHAVIOR ===== */
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // Scrolled class for background
    if (currentScroll > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Scroll to top button
    const scrollBtn = document.getElementById('scroll-top');
    if (scrollBtn) {
        if (currentScroll > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    }

    // Active nav links
    updateActiveNavLink();

    lastScroll = currentScroll;
});

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

/* ===== MOBILE MENU ===== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        isMenuOpen = !isMenuOpen;
        hamburger.classList.toggle('active', isMenuOpen);
        mobileMenu.classList.toggle('active', isMenuOpen);
        const icon = hamburger.querySelector('i');
        if (icon) {
            icon.className = isMenuOpen ? 'fas fa-xmark' : 'fas fa-bars';
        }
        if (isMenuOpen) {
            document.documentElement.classList.add('menu-open');
        } else {
            document.documentElement.classList.remove('menu-open');
        }
    });
}

function closeMobileMenu() {
    isMenuOpen = false;
    if (hamburger) {
        hamburger.classList.remove('active');
        const icon = hamburger.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
    }
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
    }
    document.documentElement.classList.remove('menu-open');
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (isMenuOpen && navbar && !navbar.contains(e.target)) {
        closeMobileMenu();
    }
});

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#top') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const navHeight = navbar.offsetHeight;
            const targetPos = target.offsetTop - navHeight - 20;
            window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
    });
});

/* ===== SCROLL TO TOP ===== */
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ===== SCROLL ANIMATIONS ===== */
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
            const delay = idx * 100;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animate-on-scroll elements
const animateElements = document.querySelectorAll('.animate-on-scroll');
animateElements.forEach(el => scrollObserver.observe(el));

/* ===== COUNTER ANIMATION ===== */
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !animatedCounters.has(entry.target)) {
            animatedCounters.add(entry.target);
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => {
    counterObserver.observe(el);
});

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

/* ===== LANGUAGE TOGGLE ===== */
function toggleLanguage() {
    if (currentLang === 'ar') {
        switchToEnglish();
    } else {
        switchToArabic();
    }
}

function switchToEnglish() {
    currentLang = 'en';
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
    document.body.classList.remove('rtl');
    document.body.classList.add('ltr');

    // Show English, hide Arabic
    document.querySelectorAll('.lang-ar').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.lang-en').forEach(el => el.style.display = '');

    // Update lang button
    const btnAr = document.querySelector('#lang-btn .lang-ar');
    const btnEn = document.querySelector('#lang-btn .lang-en');
    if (btnAr) btnAr.style.display = 'none';
    if (btnEn) btnEn.style.display = '';

    // Update form placeholders
    updatePlaceholders('en');

    // Update select options
    updateSelectOptions('en');

    // Update page title
    document.title = "Mada Al-Ruyah Establishment | Security Systems & IT - Saudi Arabia";
    document.querySelector('meta[name="description"]').content =
        "Specialists in comprehensive security systems, CCTV cameras, networks, and IT solutions in Saudi Arabia. Contact us now!";

    // Save preference
    localStorage.setItem('lang', 'en');

    // Update ticker direction
    document.querySelector('.ticker-track').style.animationName = 'tickerSlideEN';
}

function switchToArabic() {
    currentLang = 'ar';
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
    document.body.classList.remove('ltr');
    document.body.classList.add('rtl');

    // Show Arabic, hide English
    document.querySelectorAll('.lang-en').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.lang-ar').forEach(el => el.style.display = '');

    // Update lang button
    const btnAr = document.querySelector('#lang-btn .lang-ar');
    const btnEn = document.querySelector('#lang-btn .lang-en');
    if (btnAr) btnAr.style.display = '';
    if (btnEn) btnEn.style.display = 'none';

    // Update form placeholders
    updatePlaceholders('ar');

    // Update select options
    updateSelectOptions('ar');

    // Update page title
    document.title = "مؤسسة مدى الرؤية للأنظمة الأمنية وتقنية المعلومات | كاميرات مراقبة وشبكات - السعودية";
    document.querySelector('meta[name="description"]').content =
        "مؤسسة مدى الرؤية للأنظمة الأمنية وتقنية المعلومات: متخصصون في كاميرات المراقبة، الشبكات، الأمن السيبراني، وأنظمة الأمن المتكاملة في السعودية. اتصل بنا!";

    // Save preference
    localStorage.setItem('lang', 'ar');

    // Update ticker direction
    document.querySelector('.ticker-track').style.animationName = 'tickerSlide';
}

function updatePlaceholders(lang) {
    document.querySelectorAll('[placeholder-ar], [placeholder-en]').forEach(el => {
        const placeholder = el.getAttribute(`placeholder-${lang}`);
        if (placeholder) el.placeholder = placeholder;
    });
}

function updateSelectOptions(lang) {
    const select = document.getElementById('service');
    if (!select) return;

    const options = {
        ar: [
            { value: '', text: '-- اختر الخدمة --' },
            { value: 'cctv', text: 'كاميرات مراقبة وحلول أمنية' },
            { value: 'fiber', text: 'تأسيس ألياف بصرية وشبكات' },
            { value: 'pbx', text: 'أنظمة سنترال واتصالات' },
            { value: 'biometric', text: 'أجهزة حضور وانصراف (بصمة)' },
            { value: 'smarthome', text: 'حلول سمارت هوم ومغالق ذكية' },
            { value: 'maintenance', text: 'تأسيس مشاريع وعقود صيانة' },
            { value: 'other', text: 'استشارة أمنية أخرى' }
        ],
        en: [
            { value: '', text: '-- Select Service --' },
            { value: 'cctv', text: 'CCTV & Security Solutions' },
            { value: 'fiber', text: 'Fiber Optics & Networks' },
            { value: 'pbx', text: 'PBX & Communication Systems' },
            { value: 'biometric', text: 'Biometric Attendance Systems' },
            { value: 'smarthome', text: 'Smart Home & Smart Locks' },
            { value: 'maintenance', text: 'Project Setup & Maintenance' },
            { value: 'other', text: 'Other Security Consulting' }
        ]
    };

    const currentValue = select.value;
    select.innerHTML = options[lang].map(opt =>
        `<option value="${opt.value}">${opt.text}</option>`
    ).join('');
    select.value = currentValue;
}

/* ===== FORM HANDLER ===== */
function handleFormSubmit(e) {
    e.preventDefault();

    const btn = document.getElementById('submit-btn');
    const form = document.getElementById('contact-form');
    const success = document.getElementById('form-success');

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !phone) {
        showFormError(currentLang === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
        return;
    }

    // Phone validation (Saudi format)
    const phoneRegex = /^(\+966|0096|966|0)?5[0-9]{8}$/;
    const cleanPhone = phone.replace(/\s/g, '');
    if (!phoneRegex.test(cleanPhone)) {
        showFormError(currentLang === 'ar' ? 'يرجى إدخال رقم هاتف سعودي صحيح' : 'Please enter a valid Saudi phone number');
        return;
    }

    // Show loading state
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${currentLang === 'ar' ? 'جاري الإرسال...' : 'Sending...'}`;
    btn.disabled = true;

    // Send Form data via FormSubmit AJAX to madaalruwya1@gmail.com
    const formData = new FormData(form);
    formData.append('_subject', 'طلب استشارة جديد من موقع مدى الرؤية للأنظمة الأمنية');
    formData.append('_captcha', 'false');

    fetch('https://formsubmit.co/ajax/madaalruwya1@gmail.com', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Show success
        form.style.display = 'none';
        success.style.display = 'block';

        // Open WhatsApp as extra option
        const waMessage = `مرحباً، اسمي: ${name}%0Aرقم هاتفي: ${phone}%0Aالخدمة المطلوبة: ${service}%0Aملاحظات: ${message || 'لا يوجد'}`;
        window.open(`https://wa.me/966538386412?text=${waMessage}`, '_blank');

        // Reset after 6 seconds
        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            success.style.display = 'none';
            btn.innerHTML = `<i class="fas fa-paper-plane"></i> <span class="lang-ar">إرسال الطلب</span><span class="lang-en" style="display:none">Send Request</span>`;
            btn.disabled = false;
        }, 6000);
    })
    .catch(error => {
        // Fallback: still show success & open WhatsApp
        form.style.display = 'none';
        success.style.display = 'block';
        const waMessage = `مرحباً، اسمي: ${name}%0Aرقم هاتفي: ${phone}%0Aالخدمة المطلوبة: ${service}%0Aملاحظات: ${message || 'لا يوجد'}`;
        window.open(`https://wa.me/966538386412?text=${waMessage}`, '_blank');

        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            success.style.display = 'none';
            btn.innerHTML = `<i class="fas fa-paper-plane"></i> <span class="lang-ar">إرسال الطلب</span><span class="lang-en" style="display:none">Send Request</span>`;
            btn.disabled = false;
        }, 6000);
    });
}

function showFormError(message) {
    // Remove existing error
    const existing = document.querySelector('.form-error-msg');
    if (existing) existing.remove();

    const error = document.createElement('div');
    error.className = 'form-error-msg';
    error.style.cssText = `
        background: rgba(230, 57, 70, 0.15);
        border: 1px solid rgba(230, 57, 70, 0.4);
        color: #ff6b6b;
        padding: 12px 16px;
        border-radius: 8px;
        font-size: 14px;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        gap: 8px;
    `;
    error.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;

    const form = document.getElementById('contact-form');
    form.insertBefore(error, form.firstChild);

    setTimeout(() => error.remove(), 4000);
}

/* ===== HERO PARALLAX ===== */
window.addEventListener('scroll', () => {
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrolled * 0.3}px) scale(1)`;
        }
    }
});

/* ===== CARD TILT EFFECT (Desktop only) ===== */
if (window.innerWidth > 768) {
    document.querySelectorAll('.service-card, .product-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

/* ===== INIT PLACEHOLDERS ===== */
function initPlaceholders() {
    document.querySelectorAll('[placeholder-ar]').forEach(el => {
        el.placeholder = el.getAttribute('placeholder-ar');
    });
}

/* ===== SAVE/RESTORE LANGUAGE PREFERENCE ===== */
function initLanguage() {
    const savedLang = localStorage.getItem('lang') || 'ar';
    if (savedLang === 'en') {
        switchToEnglish();
    } else {
        initPlaceholders();
    }
}

/* ===== FLOATING WHATSAPP PULSE ===== */
function initWhatsAppPulse() {
    const btn = document.getElementById('float-whatsapp');
    if (!btn) return;

    let pulseEl = document.createElement('span');
    pulseEl.style.cssText = `
        position: absolute;
        inset: 0;
        border-radius: 50%;
        background: rgba(37, 211, 102, 0.4);
        animation: waPulse 2s infinite;
    `;
    btn.style.position = 'fixed';
    btn.appendChild(pulseEl);

    // Add pulse keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes waPulse {
            0% { transform: scale(1); opacity: 0.7; }
            100% { transform: scale(1.8); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

/* ===== INITIALIZE ===== */
document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initWhatsAppPulse();

    // Staggered animation for cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.1}s`;
    });

    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.1}s`;
    });
});

/* ===== PERFORMANCE: Lazy Load Images ===== */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}
