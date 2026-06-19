# Customization Guide

## Modifying Colors

All colors are controlled by CSS variables in `assets/css/style.css`. Edit the `:root {}` variables block at the top of the file to change your branding:

```css
:root {
  /* Brand Theme: Light Alabaster & Champagne Brass */
  --color-primary:       #C5A880; /* ← Your primary gold/brass accent */
  --color-primary-light: #D5B990; /* ← Lighter shade for hover states */
  --color-primary-dark:  #A48860; /* ← Darker shade for active states */
  --color-primary-tint:  rgba(197, 168, 128, 0.08); /* ← Background tint overlays */
}
```

Dark mode colors are controlled in `assets/css/dark-mode.css` under the `.dark {}` selector block.

Since the template utilizes Tailwind CSS, we have extended these variables into the inline Tailwind configuration inside each HTML file:

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C5A880', // Replace with your hex code
          light: '#D5B990',
          dark: '#A48860',
        }
      }
    }
  }
}
```

## Changing Typography

1. Add your custom font files (.woff2) inside `assets/fonts/`.
2. Update the `@font-face` declarations at the top of `assets/css/style.css`:

```css
@font-face {
  font-family: 'YourFontName';
  src: url('../fonts/your-font-file.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
```

3. Update the font variables in `style.css` and the font-family extend block in the inline tailwind config script inside all page files.

## Swapping the Logo

1. Sorb your logo file to `assets/images/ui/logo.svg`. Symmetrical vectors inside SVG are recommended.
2. Update all image tags referencing `assets/images/ui/logo.svg`.
3. Update the logo `alt` attribute to reflect your studio name.

## Replacing the Favicon

Replace the favicon file:
- `assets/images/ui/favicon.ico` (32×32)

Ensure it is correctly linked in the `<head>` of all HTML files.

## Connecting the Contact Form

The contact form in `pages/contact.html` is configured to use a standard POST request action. You can connect it to a form delivery service like:

**Formspree:**
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Netlify Forms:**
```html
<form name="contact" netlify>
```
