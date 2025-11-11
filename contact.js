/**
 * Contact Page JavaScript
 * Author: Charles
 * Handles contact form functionality and interactions
 */

// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    console.log('Contact page loaded - initializing...');
    
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Initialize contact form
    initializeContactForm();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Add smooth scrolling for navigation links
    initializeSmoothScroll();
    
    console.log('Contact page initialization complete');
});

/**
 * Initialize contact form functionality
 */
function initializeContactForm() {
    console.log('Initializing contact form...');
    const contactForm = document.getElementById('contact-form');
    const submitBtn = contactForm?.querySelector('.submit-btn');
    const btnText = submitBtn?.querySelector('.btn-text');
    const btnLoading = submitBtn?.querySelector('.btn-loading');

    console.log('Form elements found:', {
        form: !!contactForm,
        submitBtn: !!submitBtn,
        btnText: !!btnText,
        btnLoading: !!btnLoading
    });

    if (!contactForm || !submitBtn || !btnText || !btnLoading) {
        console.error('Contact form elements not found!');
        return;
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateContactForm(contactForm)) {
            return;
        }

        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-block';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Reset button state
            btnText.style.display = 'inline-block';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            
            // Show success message
            showContactSuccess();
            
            // Reset form
            contactForm.reset();
        }, 2000);
    });

    // Add input animations
    const inputs = contactForm.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('form-group-focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('form-group-focused');
            }
        });
    });
}

/**
 * Validate contact form
 */
function validateContactForm(form) {
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const subject = form.querySelector('#subject').value;
    const message = form.querySelector('#message').value.trim();

    // Name validation
    if (name.length < 2) {
        showFormError('Please enter your full name (at least 2 characters)');
        return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormError('Please enter a valid email address');
        return false;
    }

    // Subject validation
    if (!subject) {
        showFormError('Please select a subject');
        return false;
    }

    // Message validation
    if (message.length < 10) {
        showFormError('Please enter a detailed message (at least 10 characters)');
        return false;
    }

    return true;
}

/**
 * Show form error message
 */
function showFormError(message) {
    // Create error element if it doesn't exist
    let errorElement = document.querySelector('.form-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        errorElement.style.cssText = `
            background: #fef2f2;
            border: 1px solid #fecaca;
            color: #dc2626;
            padding: 0.75rem 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            font-size: 0.875rem;
            animation: slideDown 0.3s ease;
        `;
        
        const form = document.getElementById('contact-form');
        form.parentNode.insertBefore(errorElement, form);
    }
    
    errorElement.textContent = message;
    
    // Remove error after 5 seconds
    setTimeout(() => {
        if (errorElement) {
            errorElement.remove();
        }
    }, 5000);
}

/**
 * Show contact success message
 */
function showContactSuccess() {
    const successElement = document.createElement('div');
    successElement.className = 'contact-success';
    successElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, var(--ubuntu-orange), var(--accent-color));
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(221, 72, 20, 0.3);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;
    successElement.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22,4 12,14.01 9,11.01"/>
            </svg>
            Message sent successfully! We'll get back to you soon.
        </div>
    `;
    
    document.body.appendChild(successElement);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successElement.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (successElement.parentNode) {
                successElement.parentNode.removeChild(successElement);
            }
        }, 300);
    }, 5000);
}

/**
 * Initialize mobile menu functionality
 */
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            this.classList.toggle('active');
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', (!expanded).toString());
        });
        
        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('.nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

/**
 * Initialize smooth scrolling for navigation links
 */
function initializeSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links (anchor links)
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    const navHeight = document.getElementById('navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            // External links will work normally - no preventDefault()
        });
    });
}

/**
 * Add CSS animations
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideInRight {
        from { opacity: 0; transform: translateX(100%); }
        to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes slideOutRight {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100%); }
    }
    
    .form-group-focused label {
        color: var(--ubuntu-orange) !important;
        transform: translateY(-2px);
    }
    
    .submit-btn:disabled {
        cursor: not-allowed;
        transform: none !important;
    }
    
    .submit-btn .btn-loading {
        display: inline-block;
        animation: pulse 1.5s ease-in-out infinite;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }
`;
document.head.appendChild(style);
