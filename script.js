/**
 * Sait Maden Website - Main JavaScript
 * Minimal JavaScript for mobile menu functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });

    // Initialize logo gallery if it exists
    if (document.querySelector('.logo-gallery')) {
        initLogoGallery();
    }
});

// Logo Gallery Functionality
function initLogoGallery() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const logos = document.querySelectorAll('.logo-item');
    
    // Add fade transition to logos
    logos.forEach(logo => {
        logo.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Apply filter with fade effect
            logos.forEach(logo => {
                if (filter === 'all' || logo.getAttribute('data-category') === filter) {
                    logo.style.opacity = '1';
                    logo.style.transform = 'translateY(0)';
                    logo.style.display = 'flex';
                } else {
                    logo.style.opacity = '0';
                    logo.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        logo.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}