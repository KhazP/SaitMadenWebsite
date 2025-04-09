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
    
    // Initialize quote carousel if it exists
    if (document.querySelector('.quote-carousel')) {
        initQuoteCarousel();
    }
    
    // Add icons to characteristic items if they exist
    addCharacteristicIcons();
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

// Quote Carousel Functionality
function initQuoteCarousel() {
    const quotes = document.querySelectorAll('.quote-carousel blockquote');
    const nextBtn = document.querySelector('.quote-next');
    const prevBtn = document.querySelector('.quote-prev');
    const dotsContainer = document.querySelector('.quote-dots');
    
    if (!quotes.length) return;
    
    let currentQuote = 0;
    
    // Create navigation dots
    if (dotsContainer) {
        quotes.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('quote-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToQuote(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    // Initial display
    showQuote(currentQuote);
    
    // Event listeners for buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentQuote = (currentQuote + 1) % quotes.length;
            showQuote(currentQuote);
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentQuote = (currentQuote - 1 + quotes.length) % quotes.length;
            showQuote(currentQuote);
        });
    }
    
    // Auto-rotate every 5 seconds
    setInterval(() => {
        if (!document.querySelector('.quote-carousel:hover')) {
            currentQuote = (currentQuote + 1) % quotes.length;
            showQuote(currentQuote);
        }
    }, 5000);
    
    // Helper functions
    function showQuote(index) {
        quotes.forEach((quote, i) => {
            quote.style.opacity = '0';
            quote.style.display = 'none';
            
            const dot = dotsContainer?.children[i];
            if (dot) dot.classList.remove('active');
        });
        
        quotes[index].style.display = 'block';
        setTimeout(() => {
            quotes[index].style.opacity = '1';
        }, 10);
        
        const dot = dotsContainer?.children[index];
        if (dot) dot.classList.add('active');
    }
    
    function goToQuote(index) {
        currentQuote = index;
        showQuote(currentQuote);
    }
}

// Add icons to characteristic items
function addCharacteristicIcons() {
    const items = document.querySelectorAll('.characteristic-item');
    
    // Define icons for each characteristic
    const icons = {
        'Şıklık ve Estetik Duyarlılık': '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>',
        'Titizlik ve Mükemmeliyetçilik': '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>',
        'Alçakgönüllülük ve İçsel Zenginlik': '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>',
        'Bağımsızlık ve İlkeli Duruş': '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"/></svg>',
        'Öğrenme ve Öğretme Tutkusu': '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 11.55C9.64 9.35 6.48 8 3 8v11c3.48 0 6.64 1.35 9 3.55 2.36-2.19 5.52-3.55 9-3.55V8c-3.48 0-6.64 1.35-9 3.55zM12 8c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"/></svg>',
        'Disiplin ve Çalışkanlık': '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',
        'İçtenlik ve Dürüstlük': '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>'
    };
    
    // Add icons to characteristic items
    items.forEach(item => {
        const title = item.querySelector('h5').textContent;
        const iconDiv = document.createElement('div');
        iconDiv.classList.add('characteristic-icon');
        iconDiv.innerHTML = icons[title] || '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>';
        
        // Insert icon at the beginning of the item
        if (item.firstChild) {
            item.insertBefore(iconDiv, item.firstChild);
        } else {
            item.appendChild(iconDiv);
        }
    });
}