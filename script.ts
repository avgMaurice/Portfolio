// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded');
    
    // Initialize all functions
    initSmoothScrolling();
    initFormValidation();
    initScrollAnimations();
    initMobileNav();
});

/**
 * Initialize smooth scrolling for navigation links
 */
function initSmoothScrolling(): void {
    const navLinks = document.querySelectorAll('.nav-links a, .cta-button');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get the target section id from the href attribute
            const href = (link as HTMLAnchorElement).getAttribute('href');

            
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Calculate position to scroll to (with offset for fixed header)
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize form validation for the contact form
 */
function initFormValidation(): void {
    const contactForm = document.getElementById('contact-form') as HTMLFormElement;
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form inputs
            const nameInput = document.getElementById('name') as HTMLInputElement;
            const emailInput = document.getElementById('email') as HTMLInputElement;
            const messageInput = document.getElementById('message') as HTMLTextAreaElement;
            
            // Simple validation
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Name is required');
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            if (!emailInput.value.trim()) {
                showError(emailInput, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email');
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Message is required');
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            // If form is valid, simulate form submission
            if (isValid) {
                // In a real application, you would send the form data to a server
                // For this demo, we'll just show a success message
                showFormSuccess(contactForm);
            }
        });
    }
}

/**
 * Show error message for an input
 */
function showError(input: HTMLInputElement | HTMLTextAreaElement, message: string): void {
    // Remove any existing error
    removeError(input);
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#e74c3c';
    errorElement.style.fontSize = '0.9rem';
    errorElement.style.marginTop = '5px';
    
    // Insert error message after the input
    input.parentNode?.insertBefore(errorElement, input.nextSibling);
    
    // Add error styling to input
    input.style.borderColor = '#e74c3c';
}

/**
 * Remove error message from an input
 */
function removeError(input: HTMLInputElement | HTMLTextAreaElement): void {
    // Remove error styling
    input.style.borderColor = '';
    
    // Remove error message if it exists
    const parent = input.parentNode;
    if (parent) {
        const errorElement = parent.querySelector('.error-message');
        if (errorElement) {
            parent.removeChild(errorElement);
        }
    }
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show success message after form submission
 */
function showFormSuccess(form: HTMLFormElement): void {
    // Hide the form
    form.style.display = 'none';
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <h3 style="color: #27ae60;">Message Sent Successfully!</h3>
        <p>Thank you for contacting me. I'll get back to you as soon as possible.</p>
        <button id="reset-form" style="
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        ">Send Another Message</button>
    `;
    
    // Insert success message
    form.parentNode?.insertBefore(successMessage, form);
    
    // Add event listener to reset button
    const resetButton = document.getElementById('reset-form');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            // Remove success message
            successMessage.remove();
            
            // Reset and show form
            form.reset();
            form.style.display = 'block';
        });
    }
}

/**
 * Initialize scroll animations for elements
 */
function initScrollAnimations(): void {
    // Elements to animate
    const elementsToAnimate = document.querySelectorAll('.skill-card, .project-card, .about-content, .contact-content');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when element is in viewport
                entry.target.classList.add('animate');
                // Stop observing the element after it's animated
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Trigger when at least 10% of the element is visible
    
    // Observe each element
    elementsToAnimate.forEach(element => {
        // Add initial styles
        (element as HTMLElement).style.opacity = '0';
        (element as HTMLElement).style.transform = 'translateY(20px)';
        (element as HTMLElement).style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Start observing
        observer.observe(element);
    });
    
    // Add CSS class for animated elements
    const style = document.createElement('style');
    style.textContent = `
        .animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize mobile navigation
 */
function initMobileNav(): void {
    // Create mobile menu button
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    if (header && nav && navLinks) {
        const mobileMenuBtn = document.createElement('div');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        mobileMenuBtn.style.display = 'none';
        mobileMenuBtn.style.flexDirection = 'column';
        mobileMenuBtn.style.justifyContent = 'space-between';
        mobileMenuBtn.style.width = '30px';
        mobileMenuBtn.style.height = '22px';
        mobileMenuBtn.style.cursor = 'pointer';
        
        // Style the spans (hamburger lines)
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans.forEach(span => {
            (span as HTMLElement).style.height = '3px';
            (span as HTMLElement).style.width = '100%';
            (span as HTMLElement).style.backgroundColor = '#333';
            (span as HTMLElement).style.transition = 'all 0.3s ease';
        });
        
        // Add mobile menu button to nav
        nav.appendChild(mobileMenuBtn);
        
        // Add mobile menu functionality
        mobileMenuBtn.addEventListener('click', () => {
            // Toggle active class
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Animate hamburger to X
            if (mobileMenuBtn.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
                
                // Show nav links
                (navLinks as HTMLElement).style.display = 'flex';
                (navLinks as HTMLElement).style.flexDirection = 'column';
                (navLinks as HTMLElement).style.position = 'absolute';
                (navLinks as HTMLElement).style.top = '100%';
                (navLinks as HTMLElement).style.left = '0';
                (navLinks as HTMLElement).style.width = '100%';
                (navLinks as HTMLElement).style.backgroundColor = '#fff';
                (navLinks as HTMLElement).style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
                (navLinks as HTMLElement).style.padding = '20px';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                
                // Hide nav links
                (navLinks as HTMLElement).style.display = '';
            }
        });
        
        // Show mobile menu button on small screens
        const updateMobileMenu = () => {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.style.display = 'flex';
                (navLinks as HTMLElement).style.display = mobileMenuBtn.classList.contains('active') ? 'flex' : 'none';
            } else {
                mobileMenuBtn.style.display = 'none';
                (navLinks as HTMLElement).style.display = '';
                (navLinks as HTMLElement).style.position = '';
                (navLinks as HTMLElement).style.top = '';
                (navLinks as HTMLElement).style.left = '';
                (navLinks as HTMLElement).style.width = '';
                (navLinks as HTMLElement).style.backgroundColor = '';
                (navLinks as HTMLElement).style.boxShadow = '';
                (navLinks as HTMLElement).style.padding = '';
            }
        };
        
        // Initial check
        updateMobileMenu();
        
        // Update on window resize
        window.addEventListener('resize', updateMobileMenu);
    }
}