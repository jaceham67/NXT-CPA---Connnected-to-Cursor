// All event listeners that need DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isActive = navMenu.classList.contains('active');
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (!isActive) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Position dropdown menus dynamically to avoid clipping by hero section
    // Only apply fixed positioning when needed to prevent clipping
    document.querySelectorAll('.nav-item.dropdown').forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        if (dropdownMenu) {
            let isFixed = false;
            
            dropdown.addEventListener('mouseenter', function() {
                // Reset any inline styles first to let CSS work
                if (!isFixed) {
                    dropdownMenu.style.position = '';
                    dropdownMenu.style.top = '';
                    dropdownMenu.style.left = '';
                    dropdownMenu.style.width = '';
                }
                
                // Check if we need fixed positioning after a brief delay
                setTimeout(() => {
                    const rect = this.getBoundingClientRect();
                    const menuRect = dropdownMenu.getBoundingClientRect();
                    
                    // Only use fixed if dropdown would be clipped
                    if (menuRect.bottom > window.innerHeight || menuRect.top < 0) {
                        dropdownMenu.style.top = `${rect.bottom}px`;
                        dropdownMenu.style.left = `${rect.left}px`;
                        dropdownMenu.style.position = 'fixed';
                        dropdownMenu.style.width = `${Math.max(250, rect.width)}px`;
                        isFixed = true;
                    } else {
                        isFixed = false;
                    }
                }, 10);
            });
            
            dropdown.addEventListener('mouseleave', function() {
                setTimeout(() => {
                    if (!dropdown.matches(':hover') && !dropdownMenu.matches(':hover')) {
                        dropdownMenu.style.position = '';
                        dropdownMenu.style.top = '';
                        dropdownMenu.style.left = '';
                        dropdownMenu.style.width = '';
                        isFixed = false;
                    }
                }, 100);
            });
            
            dropdownMenu.addEventListener('mouseleave', function() {
                setTimeout(() => {
                    if (!dropdown.matches(':hover') && !dropdownMenu.matches(':hover')) {
                        dropdownMenu.style.position = '';
                        dropdownMenu.style.top = '';
                        dropdownMenu.style.left = '';
                        dropdownMenu.style.width = '';
                        isFixed = false;
                    }
                }, 100);
            });
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link, .dropdown-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
            // Restore body scroll when menu closes
            document.body.style.overflow = '';
        });
    });

    // Smooth scroll for navigation links
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

    // Enhanced scroll animations with Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Stop observing once animated
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animations to various elements
    function initScrollAnimations() {
        // Sections with fade-in
        document.querySelectorAll('.content-section, .hero').forEach((section, index) => {
            section.classList.add('scroll-fade-in');
            if (index > 0) section.classList.add(`delay-${Math.min(index % 4, 3)}`);
            scrollObserver.observe(section);
        });

        // Headings with slide-up
        document.querySelectorAll('h1, h2').forEach((heading, index) => {
            if (!heading.closest('.hero')) { // Don't animate hero headings twice
                heading.classList.add('scroll-slide-up');
                if (index > 0) heading.classList.add(`delay-${Math.min(index % 3, 2)}`);
                scrollObserver.observe(heading);
            }
        });

        // Cards with fade-in and stagger (exclude dropdown menus)
        document.querySelectorAll('.job-card, .blog-card, .internship-card, .card').forEach((card, index) => {
            // Don't animate dropdown menu items
            if (!card.closest('.dropdown-menu')) {
                card.classList.add('scroll-fade-in');
                card.classList.add(`delay-${Math.min(index % 4, 3)}`);
                scrollObserver.observe(card);
            }
        });

        // Grid items with staggered animations
        document.querySelectorAll('.jobs-grid > *, .content-grid > *').forEach((item, index) => {
            item.classList.add('scroll-fade-in');
            item.classList.add(`delay-${Math.min(index % 4, 3)}`);
            scrollObserver.observe(item);
        });

        // Lists with slide-up
        document.querySelectorAll('.internship-info ul, .internship-info ol').forEach((list, index) => {
            list.classList.add('scroll-slide-up');
            if (index > 0) list.classList.add(`delay-${Math.min(index % 3, 2)}`);
            scrollObserver.observe(list);
        });

        // Paragraphs with fade-in
        document.querySelectorAll('.intro-text, .job-description').forEach((para, index) => {
            para.classList.add('scroll-fade-in');
            if (index > 0) para.classList.add(`delay-${Math.min(index % 3, 2)}`);
            scrollObserver.observe(para);
        });

        // Tables with scale-in
        document.querySelectorAll('table').forEach((table) => {
            table.classList.add('scroll-scale-in');
            scrollObserver.observe(table);
        });

        // Buttons with fade-in
        document.querySelectorAll('.cta-button, .cta-button-coaching').forEach((button, index) => {
            button.classList.add('scroll-fade-in');
            if (index > 0) button.classList.add(`delay-${Math.min(index % 2, 1)}`);
            scrollObserver.observe(button);
        });
    }

    // Initialize scroll animations only on landing page (index.html)
    const currentPath = window.location.pathname;
    const isLandingPage = currentPath.endsWith('index.html') || 
                          currentPath === '/' || 
                          currentPath.endsWith('/index.html') ||
                          (currentPath === '' && window.location.href.includes('index.html'));
    
    if (isLandingPage) {
        initScrollAnimations();

        // Check for elements already in viewport on page load
        function checkInitialViewport() {
            const animatedElements = document.querySelectorAll('.scroll-fade-in, .scroll-slide-up, .scroll-slide-left, .scroll-slide-right, .scroll-scale-in');
            animatedElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                if (isVisible) {
                    // Small delay to ensure smooth animation
                    setTimeout(() => {
                        el.classList.add('animated');
                    }, 100);
                }
            });
        }

        // Run check after a short delay to ensure DOM is ready
        setTimeout(checkInitialViewport, 200);
    }

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Blog Carousel Functionality
    initializeBlogCarousel();
});

// Blog Carousel Functions
function initializeBlogCarousel() {
    const carouselContainer = document.getElementById('blog-carousel-container');
    const carouselControls = document.querySelector('.blog-carousel-controls');
    const carouselDots = document.getElementById('blog-carousel-dots');
    const prevBtn = document.getElementById('blog-prev');
    const nextBtn = document.getElementById('blog-next');

    if (!carouselContainer) return;

    // Get recent blog posts
    const recentBlogs = typeof getRecentBlogs !== 'undefined' ? getRecentBlogs(3) : [];

    if (recentBlogs.length === 0) {
        return; // Keep placeholder message
    }

    // Remove placeholder
    const placeholder = carouselContainer.querySelector('.blog-placeholder');
    if (placeholder) {
        placeholder.remove();
    }

    // Generate blog cards
    recentBlogs.forEach((blog, index) => {
        const blogCard = createBlogCard(blog);
        carouselContainer.appendChild(blogCard);
    });

    // Show controls and dots if more than 1 blog
    if (recentBlogs.length > 1) {
        if (carouselControls) carouselControls.style.display = 'flex';
        if (carouselDots) {
            carouselDots.style.display = 'flex';
            createDots(recentBlogs.length, carouselDots);
        }
    }

    // Carousel navigation
    if (prevBtn && nextBtn) {
        let currentIndex = 0;
        const cardWidth = carouselContainer.querySelector('.blog-card').offsetWidth;
        const gap = 32; // 2rem gap
        const scrollAmount = cardWidth + gap;

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                carouselContainer.scrollLeft = currentIndex * scrollAmount;
                updateDots(currentIndex);
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < recentBlogs.length - 1) {
                currentIndex++;
                carouselContainer.scrollLeft = currentIndex * scrollAmount;
                updateDots(currentIndex);
            }
        });

        // Update dots on scroll
        carouselContainer.addEventListener('scroll', () => {
            const newIndex = Math.round(carouselContainer.scrollLeft / scrollAmount);
            if (newIndex !== currentIndex) {
                currentIndex = newIndex;
                updateDots(currentIndex);
            }
        });

        // Update button states
        const updateButtons = () => {
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === recentBlogs.length - 1;
        };
        updateButtons();
        prevBtn.addEventListener('click', updateButtons);
        nextBtn.addEventListener('click', updateButtons);
    }
}

function createBlogCard(blog) {
    const card = document.createElement('div');
    card.className = 'blog-card';
    
    const categoryColors = {
        freshman: '#0052CC',
        sophomore: '#0066FF',
        junior: '#1E88E5'
    };

    const categoryNames = {
        freshman: 'Freshman',
        sophomore: 'Sophomore',
        junior: 'Junior'
    };

    card.innerHTML = `
        <div class="blog-card-category" style="background-color: ${categoryColors[blog.category] || '#0052CC'}">
            ${categoryNames[blog.category] || blog.category}
        </div>
        <h3 class="blog-card-title">${blog.title}</h3>
        <p class="blog-card-excerpt">${blog.excerpt}</p>
        <div class="blog-card-meta">
            <span>${formatBlogDate(blog.date)}</span>
        </div>
    `;

    // Make card clickable if link is provided
    if (blog.link) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            window.location.href = blog.link;
        });
    }

    return card;
}

function createDots(count, container) {
    for (let i = 0; i < count; i++) {
        const dot = document.createElement('button');
        dot.className = 'blog-carousel-dot';
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('data-index', i);
        dot.addEventListener('click', () => {
            const cardWidth = document.querySelector('.blog-card').offsetWidth;
            const gap = 32;
            const scrollAmount = cardWidth + gap;
            document.getElementById('blog-carousel-container').scrollLeft = i * scrollAmount;
        });
        container.appendChild(dot);
    }
}

function updateDots(activeIndex) {
    const dots = document.querySelectorAll('.blog-carousel-dot');
    dots.forEach((dot, index) => {
        if (index === activeIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Add active class to navigation links on scroll (runs immediately)
const sections = document.querySelectorAll('.content-section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
