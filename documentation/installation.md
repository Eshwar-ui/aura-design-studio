# Installation Guide

## Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A code editor (VS Code recommended)
- No build tools, Node.js, or package managers required

## Quick Start

1. Download and unzip the template package.
2. Open the `luxury-interior-designer` folder in your code editor.
3. Open `index.html` in your browser to trigger the automatic redirect to `pages/index.html`.

## File Structure

```text
luxury-interior-designer/
├── assets/
│   ├── css/          ← style.css, dark-mode.css, rtl.css
│   ├── js/           ← main.js, dashboard.js
│   ├── images/       ← Local high-res rooms and ui logos
│   └── fonts/        ← Local Inter and Playfair Display .woff2 files
├── pages/            ← All HTML page files
├── documentation/    ← Markdown guides
├── sitemap.xml
├── robots.txt
├── index.html        ← Root redirect file
└── README.md
```

## Local Development Server

To avoid relative path and CORS restrictions when loading local fonts and icons, running a local dev server is highly recommended:

**VS Code Live Server:**
1. Install the "Live Server" extension in VS Code.
2. Right-click the root `index.html` file → select "Open with Live Server".

**Python Dev Server (any version):**
Run from the template directory:
```bash
# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```
Then visit `http://localhost:8080` in your browser.

## Deployment

**Netlify (Recommended):**
1. Drag and drop the root `luxury-interior-designer` folder into [netlify.com/drop](https://netlify.com/drop).
2. Your website is deployed and live instantly.

**Vercel:**
1. Import your repository at [vercel.com](https://vercel.com).
2. Choose default settings (no build configurations needed — static host).

## Production Launch Checklist

Before launching your studio site, update the following items:
- [ ] Replace all dummy `auradesignstudio.com` URLs with your actual domain in `sitemap.xml`.
- [ ] Update the sitemap link in `robots.txt`.
- [ ] Replace `canonical` links inside the `<head>` of all HTML files.
- [ ] Replace logo files in `assets/images/ui/` with your custom studio logo.
- [ ] Update `og-image.webp` (1200×630px) in `assets/images/ui/`.
- [ ] Connect the contact form post action in `contact.html` to a form handler (e.g., Formspree, Netlify Forms).
