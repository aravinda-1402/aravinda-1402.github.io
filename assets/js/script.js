// Initialize AOS
AOS.init({
    disable: true,  // Disable all animations
    duration: 800,
    easing: 'ease-out',
    once: true,
    mirror: false,
    offset: 50,
    delay: 100,
    anchorPlacement: 'top-bottom'
});

// Dark mode toggle
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const moonIcon = darkModeToggle.querySelector('.fa-moon');
    const sunIcon = darkModeToggle.querySelector('.fa-sun');
    
    // Function to update icons
    const updateIcons = (isDark) => {
        moonIcon.classList.toggle('hidden', isDark);
        sunIcon.classList.toggle('hidden', !isDark);
    };
    
    // Function to toggle dark mode
    const toggleDarkMode = () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('darkMode', isDark);
        updateIcons(isDark);
    };
    
    // Initialize dark mode based on saved preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    document.documentElement.classList.toggle('dark', savedDarkMode);
    updateIcons(savedDarkMode);
    
    // Add click event listener
    darkModeToggle.addEventListener('click', toggleDarkMode);

    // Initialize mobile menu
    const mobileMenuBtn = document.querySelector('[data-mobile-menu]');
    const mobileMenu = document.querySelector('[data-menu]');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Add scroll to top button functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'fixed bottom-8 right-8 bg-blue-600 dark:bg-blue-500 text-white p-4 rounded-full shadow-lg transition-opacity duration-200 opacity-0 hover:bg-blue-700 dark:hover:bg-blue-600';
    scrollToTopBtn.style.display = 'none';
    document.body.appendChild(scrollToTopBtn);

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollToTopBtn.style.display = 'block';
            setTimeout(() => scrollToTopBtn.style.opacity = '1', 50);
        } else {
            scrollToTopBtn.style.opacity = '0';
            setTimeout(() => scrollToTopBtn.style.display = 'none', 200);
        }
    });
});

// Handle mobile menu
const mobileMenuButton = document.querySelector('[data-mobile-menu-button]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    // Add mobile menu functionality
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'md:hidden p-2 text-gray-600 hover:text-blue-600 transition';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
    
    const nav = document.querySelector('nav .container > div');
    nav.appendChild(mobileMenuBtn);

    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu fixed inset-0 bg-white transform translate-x-full transition-transform duration-300 ease-in-out md:hidden';
    mobileMenu.innerHTML = `
        <div class="p-6">
            <button class="close-menu float-right text-2xl">&times;</button>
            <div class="flex flex-col space-y-4 mt-12">
                <a href="#about" class="text-gray-600 hover:text-blue-600 transition">About</a>
                <a href="#projects" class="text-gray-600 hover:text-blue-600 transition">Projects</a>
                <a href="#publications" class="text-gray-600 hover:text-blue-600 transition">Publications</a>
                <a href="#contact" class="text-gray-600 hover:text-blue-600 transition">Contact</a>
                <a href="Aravinda_Jatavallabha_Resume - AIML.pdf" class="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition text-center">
                    Resume
                </a>
            </div>
        </div>
    `;
    document.body.appendChild(mobileMenu);

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('translate-x-full');
    });

    // Close menu on click
    mobileMenu.querySelectorAll('a, .close-menu').forEach(element => {
        element.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.add('translate-x-full');
        }
    });
});

// Smooth scroll for anchor links
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

// Add floating animation to profile image
const profileImage = document.querySelector('#hero img');
if (profileImage) {
    profileImage.classList.add('animate-float');
}

// Add project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '';
    });
});

// Add skill badge hover effects
document.querySelectorAll('.skill-badge').forEach(badge => {
    badge.addEventListener('mouseenter', () => {
        badge.style.transform = 'scale(1.1)';
    });

    badge.addEventListener('mouseleave', () => {
        badge.style.transform = 'scale(1)';
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('shadow-lg');
        return;
    }
    
    if (currentScroll > lastScroll) {
        // Scrolling down
        navbar.classList.add('shadow-lg');
    } else {
        // Scrolling up
        navbar.classList.remove('shadow-lg');
    }
    
    lastScroll = currentScroll;
});

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
});

// Add year to copyright
const yearSpan = document.querySelector('footer p');
if (yearSpan) {
    yearSpan.textContent = yearSpan.textContent.replace('2024', new Date().getFullYear());
}

// Handle View More/Less toggles
document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.toggle-content');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.previousElementSibling;
            content.classList.toggle('hidden');
            
            // Update button text and icon
            const icon = button.querySelector('i');
            if (content.classList.contains('hidden')) {
                button.innerHTML = '<i class="fas fa-plus-circle mr-2"></i> View More';
            } else {
                button.innerHTML = '<i class="fas fa-minus-circle mr-2"></i> View Less';
            }
        });
    });
}); 