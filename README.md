# Jhonathan Barrios - Portfolio

A modern, minimalist portfolio landing page showcasing full-stack development skills and professional background.

## Features

- **Bilingual Support**: Toggle between English and Spanish with persistent language preference
- **Smooth Animations**: Parallax scrolling effects and fade-in transitions powered by Framer Motion
- **Responsive Design**: Fully responsive layout optimized for all devices
- **Interactive Navigation**: Scroll indicator for easy section navigation
- **Modern Stack**: Built with Next.js 14, TypeScript, and Tailwind CSS

## Sections

1. **Hero Section**: Introduction with professional title and tagline
2. **About Section**: Professional background, skills, and contact information

## Tech Stack

- **Framework**: Next.js 14.2.3 with App Router
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 3.4.1
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## Project Structure

```
app/
├── components/          # React components
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── LanguageToggle.tsx
│   └── ScrollIndicator.tsx
├── contexts/           # React Context providers
│   └── LanguageContext.tsx
├── translations/       # i18n content
│   └── translations.ts
├── layout.tsx          # Root layout
├── page.tsx           # Home page
└── global.css         # Global styles
```

## Features Breakdown

### Language Toggle
- Persistent preference using localStorage
- Automatic browser detection for optimal emoji/text display
- Smooth transitions between languages

### Scroll Animations
- Parallax effects with different speeds per element
- Intersection Observer-based fade-in animations
- Staggered animations for content reveal

### Navigation
- Two-dot scroll indicator
- Clickable dots for section navigation
- Auto-highlighting based on scroll position

## Contact

- **Email**: jhonps396@gmail.com
- **GitHub**: [jhonDavid20](https://github.com/jhonDavid20)
- **LinkedIn**: [jhondavidbp](https://www.linkedin.com/in/jhondavidbp/)
- **Company**: [ClutchDevs](https://clutchdevs.com)

## License

All rights reserved © 2025 Jhonathan Barrios
