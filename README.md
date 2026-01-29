# Accrual Careers Website

A website to help students find accounting internships and understand CPA firm opportunities.

## Setup Instructions for GitHub Pages

### Method 1: Using GitHub Desktop

1. **Open GitHub Desktop**
2. **Add Repository**: 
   - Click File → Add Local Repository
   - Select this folder: `C:\Users\jacks\OneDrive - Bentley University\Accrual Careers`
3. **Publish to GitHub**:
   - Click "Publish repository" button at the top
   - Name your repository (e.g., "Accrual Careers")
   - Make sure "Keep this code private" is unchecked if you want public access
   - Click "Publish repository"
4. **Enable GitHub Pages**:
   - Go to your repository on GitHub.com
   - Click Settings → Pages
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click Save
5. **Your site will be live at**: `https://[your-username].github.io/[repository-name]/`

### Method 2: Using Command Line

1. **Create a new repository on GitHub.com** (don't initialize with README)
2. **Connect and push**:
   ```bash
   git remote add origin https://github.com/[your-username]/[repository-name].git
   git branch -M main
   git push -u origin main
   ```
3. **Enable GitHub Pages** (same as Method 1, step 4)

## Making Changes

After you make changes in Cursor:
1. **Commit changes**:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
2. Changes will automatically appear on your GitHub Pages site within 1-2 minutes

## Files Structure

- `index.html` - Home page
- `types-of-firms.html` - Types of CPA Firms page
- `accounting-jobs.html` - Different Jobs Within CPA Firms page
- `freshman-internships.html` - Freshman Internships page
- `sophomore-internships.html` - Sophomore Internships page
- `junior-internships.html` - Junior Internships page
- `accounting-salaries.html` - Accounting Salaries page
- `styles.css` - Stylesheet
- `script.js` - JavaScript functionality

