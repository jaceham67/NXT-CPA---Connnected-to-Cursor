# Blog Post Guide for Accrual Careers

## How to Add a New Blog Post

### Step 1: Add Blog Post Data

Open `blog-data.js` and add your blog post to the `blogPosts` array. Here's the format:

```javascript
{
    id: 1, // Unique number - increment for each new post
    title: "Your Blog Post Title",
    category: "freshman", // Choose: "freshman", "sophomore", or "junior"
    date: "2026-01-15", // Format: YYYY-MM-DD
    excerpt: "A brief 1-2 sentence summary of your blog post...",
    readTime: "5 min read", // Optional but recommended
    link: "blog/freshman/first-internship-guide.html" // Optional - if you create individual blog pages
}
```

### Step 2: Example Blog Post Entry

```javascript
{
    id: 1,
    title: "How to Land Your First Accounting Internship as a Freshman",
    category: "freshman",
    date: "2026-01-15",
    excerpt: "Discover the key strategies and tips for securing your first accounting internship during your freshman year, including where to look and how to stand out.",
    readTime: "5 min read",
    link: "" // Leave empty if you don't have a separate blog page yet
}
```

### Step 3: Where Your Blog Appears

1. **Homepage Carousel** - Your most recent 3 blog posts will appear in a carousel on the homepage (between hero and newsletter sections)

2. **Internship Pages** - Blog posts are automatically filtered and shown on the relevant pages:
   - Freshman posts → `freshman-internships.html`
   - Sophomore posts → `sophomore-internships.html`
   - Junior posts → `junior-internships.html`

### Important Notes:

- **Date Format**: Always use `YYYY-MM-DD` format (e.g., "2026-01-15")
- **ID Numbers**: Start at 1 and increment for each new post
- **Category**: Must be exactly "freshman", "sophomore", or "junior" (lowercase)
- **Excerpt**: Keep it to 1-2 sentences (around 150-200 characters works best)
- **Order**: The most recent posts (by date) appear first in the carousel

### Tips for Writing Blog Posts:

1. **Title**: Make it clear and specific (e.g., "5 Resume Tips for Freshman Accounting Internships")
2. **Excerpt**: Write a compelling summary that makes readers want to read more
3. **Content**: Focus on actionable advice and practical tips
4. **Length**: Aim for 500-1500 words per post for optimal engagement

### Future Enhancement (Optional):

If you want to create individual blog post pages later, you can:
1. Create HTML files in a `blog/` folder
2. Add the file path to the `link` property in `blog-data.js`
3. The blog cards will become clickable and link to those pages

---

**Ready to post your first blog?** Just edit `blog-data.js` and add your blog post entry!

