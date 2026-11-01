
<div align="center">

# ARKÉ

### ARCHITECTURE THAT ENDURES

**Spaces with purpose. Architecture with meaning.**

A modern architectural studio concept built around timeless design,
visual storytelling, and immersive digital experiences.

<br />

[![Version](https://img.shields.io/badge/Version-v0.3.0--mobile--animations-1a1a1a?style=for-the-badge)](https://github.com/VilarysHQ/Arke-Architecture/releases/tag/v0.3.0-mobile-animations)
![React](https://img.shields.io/badge/React-19-1a1a1a?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-1a1a1a?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-1a1a1a?style=for-the-badge&logo=tailwindcss&logoColor=white)

<br />

**[Overview](#overview) · [Features](#features) · [Technology](#technology-stack) · [Getting Started](#getting-started) · [Credits](#credits)**

</div>

---

## Overview

**ARKÉ** is a conceptual architecture studio website designed to explore the intersection of architecture, nature, and modern digital experiences.

Built with a strong emphasis on visual composition, responsive layouts, subtle motion, and editorial typography, ARKÉ delivers an immersive experience inspired by contemporary architectural design.

The project is developed as a frontend portfolio showcase by **Vilarys**, demonstrating modern web development practices and attention to visual detail.

> Architecture is more than creating spaces. It is about shaping experiences, connecting people, and designing environments that endure.

---

## Features

### Cinematic Hero Experience

- Full-screen architectural photography.
- Automatic image slideshow.
- Smooth transitions between featured projects.
- Manual navigation and playback controls.
- Responsive image positioning.
- Animated typography and call-to-action buttons.

### Architectural Portfolio

- Featured project gallery.
- Responsive image layouts.
- Interactive project cards.
- Smooth hover transitions.
- Detailed project modals.
- Keyboard navigation and accessible controls.

### Motion & Interactions

- Scroll-triggered reveal animations.
- Staggered content transitions.
- Subtle image zoom effects.
- Animated statistics counters.
- Illuminated process timeline.
- Responsive hover interactions.
- Reduced-motion accessibility support.

### Responsive Experience

Designed to adapt to different screen sizes:

| Device | Experience |
|:---|:---|
| Mobile | Optimized typography, stacked layouts, touch-friendly navigation |
| Tablet | Adaptive grids and balanced spacing |
| Desktop | Immersive photography and multi-column layouts |
| Large Displays | Spacious editorial composition |

### Contact Experience

- Editorial contact section.
- Responsive project inquiry form.
- Basic browser-side form validation.
- Email draft preparation through the user's mail application.
- Contact information and social links.

**Note:** The contact form currently uses an email-client workflow. It does not submit inquiries to a backend service.

---

## Technology Stack

| Technology | Purpose |
|:---|:---|
| React 19 | Component-based user interface |
| Vite 8 | Development server and production bundling |
| Tailwind CSS 4 | Responsive styling and design system |
| Motion for React | Animations and transitions |
| Lucide React | Minimal iconography |
| JavaScript | Application logic |
| HTML & CSS | Structure and styling |

---

## Website Sections

The ARKÉ experience is organized into the following sections:

**01 — Home**

A cinematic introduction featuring architectural imagery, animated headlines, and a full-screen image slider.

**02 — Studio Values**

A collection of key principles presented through minimalist informational cards.

**03 — Projects**

A curated architectural portfolio with featured imagery and detailed project exploration.

**04 — About**

An editorial introduction to the studio's philosophy and design approach.

**05 — Services**

A responsive presentation of architectural and design services.

**06 — Testimonials**

Client-focused storytelling accompanied by animated statistics.

**07 — Process**

An interactive timeline illustrating the stages of an architectural project.

**08 — Contact**

A dedicated space for visitors to explore contact information and prepare project inquiries.

---

## Project Structure

The main frontend application is located in the `frontend` directory.

```text
Arke-Architecture/
│
└── frontend/
    ├── public/
    │
    ├── src/
    │   ├── assets/
    │   │   ├── About/
    │   │   ├── Contact/
    │   │   ├── Home/
    │   │   └── Testimonial/
    │   │
    │   ├── components/
    │   │   ├── Home/
    │   │   ├── InfoCards/
    │   │   ├── Projects/
    │   │   ├── SocialIcons/
    │   │   ├── Process.jsx
    │   │   ├── Services.jsx
    │   │   └── Testimonial.jsx
    │   │
    │   ├── data/
    │   │   ├── heroSlides.js
    │   │   ├── projectsData.js
    │   │   ├── servicesData.js
    │   │   └── ...
    │   │
    │   ├── hooks/
    │   │   └── Hero/
    │   │
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── About.jsx
    │   │   ├── Projects.jsx
    │   │   ├── Contact.jsx
    │   │   └── Footer.jsx
    │   │
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    │
    ├── package.json
    ├── package-lock.json
    └── vite.config.js
```

The project follows a component-based architecture, keeping UI components, content data, assets, and reusable logic organized separately.

---

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js (a version compatible with Vite 8)
- npm
- Git

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/VilarysHQ/Arke-Architecture.git
```

**2. Navigate to the frontend directory**

```bash
cd Arke-Architecture/frontend
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

Open the local URL displayed in your terminal.

### Production Build

```bash
npm run build
```

The optimized application will be generated in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

### Code Quality

Run ESLint:

```bash
npm run lint
```

---

## Design Philosophy

ARKÉ follows a visual philosophy inspired by architectural minimalism.

**Timeless aesthetics**

A restrained visual language built around carefully selected typography, spacing, and composition.

**Purposeful motion**

Animations support storytelling and navigation rather than distracting from the content.

**Photography first**

Large architectural imagery communicates atmosphere, materiality, and scale.

**Responsive by design**

Layouts adapt to the available space while maintaining visual consistency.

**Attention to detail**

Subtle interactions, smooth transitions, and balanced spacing create a cohesive experience.

---

## Version History

| Version | Description |
|:---|:---|
| `v0.1.0` | Initial project version |
| `v0.2.0-mobile` | Initial mobile-responsive improvements |
| `v0.3.0-mobile-animations` | Responsive refinements and cinematic animations |

### Current Version

**v0.3.0 — Mobile & Cinematic Animations**

This release introduces:

- Animated responsive hero slider.
- Staggered section reveal animations.
- Improved mobile layouts.
- Interactive project gallery and modal transitions.
- Animated testimonial counters.
- Illuminated process timeline.
- Redesigned contact experience.
- Refined footer interactions.

[View Release Tag](https://github.com/VilarysHQ/Arke-Architecture/releases/tag/v0.3.0-mobile-animations)

---

## Roadmap

Potential improvements for future iterations:

- [ ] Optimize architectural images using WebP or AVIF.
- [ ] Improve Core Web Vitals and loading performance.
- [ ] Complete accessibility testing.
- [ ] Integrate a production-ready contact submission service.
- [ ] Perform final cross-browser and responsive testing.
- [ ] Deploy the portfolio experience.

---

## Credits

<div align="center">

### Designed & Developed by Vilarys

**Digital experiences crafted with purpose.**

ARKÉ is a conceptual portfolio project developed to demonstrate the design and frontend development capabilities of **Vilarys**.

[GitHub Organization](https://github.com/VilarysHQ)

<br />

**ARKÉ — Architecture That Endures**

<sub>© 2026 Vilarys. Portfolio concept project.</sub>

</div>
