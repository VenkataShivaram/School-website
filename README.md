# Vijay Vidhyanikethan High School — Official Website

> **"Empowering Young Minds for a Better Tomorrow"**

A complete, modern, premium and fully responsive school website built with pure HTML5, CSS3, and Vanilla JavaScript. No frameworks, no dependencies beyond Google Fonts and Font Awesome.

---

## 📁 Project Structure

```
vijay-vidhyanikethan-school/
│
├── index.html              ← Main HTML file (single-page website)
├── css/
│   └── style.css           ← Complete stylesheet (light + dark mode)
├── js/
│   └── script.js           ← All JavaScript features
│
├── images/
│   ├── school-campus.jpg   ← Wide campus shot (building + buses in background)
│   ├── school-event.jpg    ← Cultural dance program (night event)
│   └── school-buses.jpg    ← Three yellow Eicher buses close-up
│
└── README.md               ← This file
```

---

## 🖼️ Image Mapping

| Filename             | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| `school-campus.jpg`  | Wide-angle shot of the school building with yellow buses on either side, blue sky. Used in the **Hero section** and **About** section. |
| `school-event.jpg`   | Students performing a colourful cultural dance at a night event with fairy lights. Used in the **Events** section and Gallery. |
| `school-buses.jpg`   | Close-up of three yellow Eicher school buses (one prominently shows "VIJAY VIDHYANIKETHAN"). Used in the **Transport** section and Gallery. |

---

## ✨ Features

### Design
- Deep Navy + Royal Blue + Gold accent color palette
- Poppins (headings) + Inter (body) Google Fonts
- Full **Light Mode** and **Dark Mode** (persisted via `localStorage`)
- Glassmorphism navbar with blur effect
- Smooth hero background zoom animation
- Rounded cards with soft shadows and hover effects

### Sections
1. **Hero** — Full-screen with campus photo, gradient overlay, tagline, CTA buttons
2. **Quick Stats** — 30+ years, Classes 1–10, State Board, Safe Transport
3. **About Us** — School story, campus image, feature pills
4. **Our Facilities** — 6 facility cards with icons and hover animations
5. **Admissions** — 3-step process + enquiry form with validation
6. **Transport** — Bus fleet photo + 4 feature highlights
7. **Events** — Cultural event photo (lightbox) + 4 event categories
8. **Photo Gallery** — Filterable gallery with lightbox viewer
9. **Contact** — Contact info, Google Maps link, contact form
10. **Footer** — Links, social, location, copyright

### JavaScript Features
| Feature | Description |
|---------|-------------|
| Dark/Light Toggle | Sun/Moon icon, saves to `localStorage` |
| Hamburger Menu | Smooth open/close, closes on Escape / outside click |
| Sticky Navbar | Glass effect on scroll, active link highlighting |
| Smooth Scrolling | All anchor links scroll smoothly |
| Scroll Animations | `IntersectionObserver` fade-up with stagger |
| Counter Animation | "30+" animated number |
| Gallery Filter | All / Campus / Events / Transport tabs |
| Lightbox | Full-screen image viewer, keyboard accessible |
| Form Validation | Required fields, 10-digit phone regex, friendly messages |
| Back to Top | Appears after 500px scroll, smooth return |

### Accessibility
- Proper heading hierarchy (h1 → h2 → h3 → h4)
- `alt` text on all images
- `aria-label`, `aria-expanded`, `aria-current`, `aria-live`
- Keyboard navigable (focus-visible outlines)
- `prefers-reduced-motion` respected

### Performance
- `loading="lazy"` on all below-fold images
- CSS custom properties for consistent design tokens
- Minimal JavaScript — no jQuery, no frameworks
- Font Awesome via CDN (loaded from Cloudflare)

---

## 🚀 Getting Started

1. **Open** `index.html` in any modern browser — no build step required.
2. Or serve locally with any static server:
   ```bash
   # Python
   python -m http.server 8080

   # Node (npx)
   npx serve .
   ```
3. Open `http://localhost:8080` in your browser.

---

## ✏️ What Needs to Be Updated

Before publishing as the official school website, replace these placeholders:

| Placeholder | Location | What to add |
|-------------|----------|-------------|
| `[Contact school for phone number]` | Contact section | School phone number |
| `[Contact school for email address]` | Contact section | School email address |
| `<!-- Replace with official school YouTube URL -->` | Footer | YouTube channel URL |

---

## 🔗 Connecting a Backend / Form Submissions

The admission and contact forms are fully set up for backend integration.

In `js/script.js`, look for the comment blocks labelled:

```js
// --- BACKEND HOOK ---
// Replace this block with an actual fetch/API call to your backend:
// ...
// --- END BACKEND HOOK ---
```

Replace those blocks with a `fetch()` call to your API endpoint.

---

## 📍 Google Maps

The school's Google Maps link is:
`https://maps.app.goo.gl/UXfQNpuX3U9tM7zH9`

This link is used in:
- The **Contact** section "View on Google Maps" button
- The map preview card
- The **Footer** "Get Directions" link

---

## 🎨 Design System

### Colors
| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| Background | `#f8f9fc` | `#080f1d` |
| Surface | `#ffffff` | `#0f1c32` |
| Navy | `#0a1628` | `#0a1628` |
| Blue | `#1a3a6e` | `#1a3a6e` |
| Blue Bright | `#2563eb` | `#3b82f6` |
| Gold Accent | `#c9a227` | `#e6b93e` |

### Typography
- **Headings**: Poppins (weight 600–800)
- **Body**: Inter (weight 300–600)

---

## 🌐 Browser Support

Tested to work on:
- Chrome 90+
- Firefox 88+
- Edge 90+
- Safari 14+
- Mobile Chrome (Android)
- Mobile Safari (iOS)

---

## 📞 School Information

| Detail | Value |
|--------|-------|
| School Name | Vijay Vidhyanikethan High School |
| Established | 1996 |
| Classes | 1st to 10th |
| Board | Telangana State Board |
| Location | Thandriyal, Telangana, India |
| Maps | [Google Maps](https://maps.app.goo.gl/UXfQNpuX3U9tM7zH9) |

---

© 2026 Vijay Vidhyanikethan High School. All Rights Reserved.
