// Blog Posts Data
// Add new blog posts here. They will automatically appear on the homepage carousel and relevant pages.

const blogPosts = [
    {
        id: 3,
        title: "From Nerves to Next-Level: Mastering the Virtual Interview",
        category: "freshman",
        date: "2026-01-28",
        excerpt: "Learn how to master virtual interviews for accounting internships. Tips and tricks to help you skip the learning curve and head straight to the offer.",
        readTime: "10 min read",
        link: "blog/mastering-virtual-interview.html"
    },
    {
        id: 4,
        title: "From Nerves to Next-Level: Mastering the Virtual Interview",
        category: "sophomore",
        date: "2026-01-28",
        excerpt: "Learn how to master virtual interviews for accounting internships. Tips and tricks to help you skip the learning curve and head straight to the offer.",
        readTime: "10 min read",
        link: "blog/mastering-virtual-interview.html"
    },
    {
        id: 5,
        title: "From Nerves to Next-Level: Mastering the Virtual Interview",
        category: "junior",
        date: "2026-01-28",
        excerpt: "Learn how to master virtual interviews for accounting internships. Tips and tricks to help you skip the learning curve and head straight to the offer.",
        readTime: "10 min read",
        link: "blog/mastering-virtual-interview.html"
    },
    {
        id: 2,
        title: "How to Own the Big Four Timeline",
        category: "sophomore",
        date: "2026-01-25",
        excerpt: "Understanding the early recruiting timelines for Big Four accounting internships. Learn when to apply for audit, tax, and advisory positions to secure your spot before it's too late.",
        readTime: "6 min read",
        link: "blog/big-four-timeline.html",
        author: "Jackson Denham"
    },
    {
        id: 1,
        title: "The Freshman Internship: Navigating the Search and Ignoring the Skeptics",
        category: "freshman",
        date: "2026-01-20",
        excerpt: "Securing an internship as a first-year student is challenging, but not impossible. Learn how to navigate the search process, ignore the skeptics, and secure valuable early professional experience.",
        readTime: "8 min read",
        link: "blog/freshman-internship-guide.html"
    },
];

// Helper function to get formatted date
function formatBlogDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Helper function to get blog posts by category
function getBlogsByCategory(category) {
    return blogPosts.filter(post => post.category === category);
}

// Helper function to get recent blog posts (for homepage)
function getRecentBlogs(limit = 3) {
    return blogPosts
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, limit);
}

