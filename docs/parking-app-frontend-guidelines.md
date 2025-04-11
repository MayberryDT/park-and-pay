# Frontend Guidelines for Parking Web App Redesign

This document outlines the design and development guidelines to transform the parking web app into a modern, professional, and user-friendly platform with a sophisticated green theme. The focus is on delivering an intuitive, trustworthy, and polished experience for users seeking parking solutions.

## Design Principles
- **Modern Aesthetics**: Emphasize clean layouts, subtle gradients, and smooth interactions for a professional look.
- **User-Centric**: Prioritize quick access to parking options, clear navigation, and actionable buttons.
- **Green Theme**: Use a refined green palette to convey trust, efficiency, and professionalism, balanced with neutral tones.
- **Responsive Design**: Ensure seamless functionality across desktop, tablet, and mobile devices.
- **Accessibility**: Comply with WCAG 2.1 standards (e.g., adequate contrast, keyboard navigation).

## Color Scheme
The following CSS variables define a professional green-themed palette. Apply these consistently across the app.

```css
:root {
  --slate-gray: #4a5e6aff;       /* Dark gray-blue for headers, footers, or text */
  --stone-gray: #8a9597ff;       /* Neutral gray for secondary text or backgrounds */
  --ivory: #f5f6f2ff;            /* Light ivory for backgrounds or cards */
  --sage-green: #5c8970ff;       /* Primary green for buttons, links, and highlights */
  --pine-green: #3a5f4dff;       /* Darker green for hover states or emphasis */
  --muted-teal: #6d8299ff;       /* Subtle teal for accents or secondary buttons */
  --soft-gold: #d9c2a7ff;        /* Warm gold for subtle highlights or icons */
}
```

### Color Usage
- **Primary Color**: `--sage-green` for CTAs (e.g., "Find Parking"), navigation highlights, and key headings.
- **Secondary Color**: `--pine-green` for hover effects, borders, or secondary actions.
- **Accents**: `--muted-teal` for subtle details (e.g., icons, form outlines); `--soft-gold` for highlights or badges.
- **Backgrounds**: `--ivory` for main content areas; `--slate-gray` for header/footer.
- **Text**: `--slate-gray` for primary text; `--stone-gray` for secondary text or captions.

## Typography
- **Font Family**: Use a polished, sans-serif font stack:
  - Primary: `"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
  - Fallback: `"Arial", Helvetica, sans-serif`
- **Font Sizes**:
  - H1: 2.5rem (40px) for main headings
  - H2: 2rem (32px)
  - H3: 1.5rem (24px)
  - Body: 1rem (16px)
  - Small text: 0.875rem (14px)
- **Font Weights**:
  - Headings: 700
  - Body: 400
  - Emphasis: 500
- **Line Height**: 1.6 for body text, 1.3 for headings.
- **Color**: Use `--slate-gray` for main text, `--sage-green` for links or highlighted text.

## Layout
- **Header**: 
  - Fixed navigation bar with `--slate-gray` background and `--ivory` text.
  - Logo on the left, navigation (e.g., "Find Parking", "Account") on the right.
  - Highlight active links with `--sage-green` underline or background.
- **Hero Section**: 
  - Full-width section with a subtle gradient (e.g., `--ivory` to `--stone-gray`).
  - Bold H1 in `--sage-green`, subheading in `--slate-gray`.
  - CTA button in `--sage-green` with `--pine-green` hover state.
- **Main Content**: 
  - Card or list layout for parking options (e.g., location, availability, rates).
  - Cards use `--ivory` background, `--slate-gray` text, and `--sage-green` buttons or icons.
- **Footer**: 
  - `--slate-gray` background, `--ivory` text.
  - Include links (e.g., "Help", "Terms"), contact info, and social icons in `--sage-green`.

## Components
### Buttons
- **Primary**: 
  - Background: `--sage-green`
  - Text: `--ivory`
  - Padding: 12px 24px
  - Border-radius: 6px
  - Hover: Background changes to `--pine-green`
- **Secondary**: 
  - Background: Transparent
  - Border: 2px solid `--sage-green`
  - Text: `--sage-green`
  - Hover: Background fills with `--sage-green`, text to `--ivory`
- **Accent**: 
  - Background: `--muted-teal`
  - Text: `--ivory`
  - Hover: Darken slightly with opacity or mix with `--pine-green`

### Links
- Default: `--sage-green`, no underline
- Hover: `--pine-green`, subtle underline

### Forms
- Input fields: `--ivory` background, `--slate-gray` border and text.
- Labels: `--slate-gray`, bold.
- Submit button: Matches primary button styles.

## Imagery
- Use professional visuals (e.g., parking structures, maps, or urban scenes) with a clean, modern style.
- Apply a faint `--sage-green` overlay or border to align with the theme.
- Optimize for fast loading (e.g., WebP format, max 250KB).

## CSS Guidelines
- Use a CSS preprocessor (e.g., SCSS) for maintainable styles.
- Adopt BEM or a similar naming convention.
- Example button styling:
```css
.btn--primary {
  background-color: var(--sage-green);
  color: var(--ivory);
  padding: 12px 24px;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}
.btn--primary:hover {
  background-color: var(--pine-green);
}
```

## Sample HTML Structure
```html
<header class="header" style="background: var(--slate-gray); color: var(--ivory);">
  <nav class="nav">
    <a href="/" class="nav__logo">ParkSmart</a>
    <ul class="nav__links">
      <li><a href="/find" style="color: var(--sage-green);">Find Parking</a></li>
      <li><a href="/account">Account</a></li>
      <li><a href="/support">Support</a></li>
    </ul>
  </nav>
</header>

<section class="hero" style="background: linear-gradient(to bottom, var(--ivory), var(--stone-gray));">
  <h1 style="color: var(--sage-green);">Effortless Parking Solutions</h1>
  <p style="color: var(--slate-gray);">Find and reserve your spot with ease.</p>
  <button class="btn--primary">Get Started</button>
</section>