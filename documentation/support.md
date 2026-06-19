# Support Desk

## Getting Help

### Check Documentation First

Before raising a support ticket, please verify:
- [Installation Guide](installation.md) — local hosting, servers setup.
- [Customization Guide](customization.md) — custom colors, logo replacements.
- [Page Structure](page-structure.md) — HTML file structure descriptions.

### Frequently Asked Questions

**Q: Can I remove the footer credit note?**
A: Yes. Under the commercial license, you are free to modify or remove the credit notice in the footer.

**Q: Sourcing fonts locally fails to render in browser. What do I do?**
A: Ensure you are loading the website through a local server (e.g. VS Code Live Server, Python host) and not opening files directly as file paths. Browser security rules block loading local woff2 files directly via the file protocol. See [Installation Guide](installation.md).

**Q: How do I change the default theme color?**
A: Update the CSS color variables in `assets/css/style.css` and the colors theme extension inside Tailwind config scripts in all HTML page headers. See [Customization Guide](customization.md).

## Submitting Bugs & Issues

If you find a layout alignment bug, please email `support@auradesignstudio.com` with:
1. Browser name & version.
2. Operating system (Windows, macOS, iOS).
3. Screenshot or screen recording showing the issue.
4. Steps to reproduce the bug.

## Response Timings

We strive to reply to all support queries within **1–2 business days**.
