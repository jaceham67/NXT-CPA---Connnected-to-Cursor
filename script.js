// All event listeners that need DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link, .dropdown-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
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

    // Add fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.card, .job-card, .internship-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

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
            ${blog.readTime ? `<span>${blog.readTime}</span>` : ''}
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
