// Blog Posts Data
// Add new blog posts here. They will automatically appear on the homepage carousel and relevant pages.

const blogPosts = [
    {
        id: 4,
        title: "How to Approach Accounting Firms at a Career Fair",
        category: "freshman",
        date: "2026-01-30",
        excerpt: "Feeling nervous about career fairs? Learn how to approach accounting firms with confidence, build rapport with recruiters, and stand out from the competition.",
        readTime: "8 min read",
        link: "blog/career-fair-guide.html",
        author: "Jackson Denham"
    },
    {
        id: 3,
        title: "From Nerves to Next-Level: Mastering the Virtual Interview",
        category: "freshman",
        date: "2026-01-28",
        excerpt: "Learn how to master virtual interviews for accounting internships. Tips and tricks to help you skip the learning curve and head straight to the offer.",
        readTime: "10 min read",
        link: "blog/mastering-virtual-interview.html",
        author: "Jackson Denham"
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
    return blogPosts.filter(post => {
        // Show "Mastering the Virtual Interview" on all category pages
        if (post.link === "blog/mastering-virtual-interview.html") {
            return true;
        }
        return post.category === category;
    });
}

// Helper function to get recent blog posts (for homepage)
// Deduplicates by title/link to avoid showing the same post multiple times
function getRecentBlogs(limit = 3) {
    const seen = new Set();
    const uniquePosts = [];
    
    // Sort by date first
    const sortedPosts = blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Filter out duplicates based on title (or link if title is same)
    for (const post of sortedPosts) {
        const key = post.link || post.title;
        if (!seen.has(key)) {
            seen.add(key);
            uniquePosts.push(post);
            if (uniquePosts.length >= limit) break;
        }
    }
    
    return uniquePosts;
}

