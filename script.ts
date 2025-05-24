// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded');

    // Initialize all functions
    initSmoothScrolling();
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
    }, {threshold: 0.1}); // Trigger when at least 10% of the element is visible

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