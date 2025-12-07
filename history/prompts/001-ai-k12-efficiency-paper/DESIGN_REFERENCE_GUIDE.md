# 🎨 VISUAL DESIGN REFERENCE - COLOR & SPACING GUIDE

## Color Palette

### Primary Colors
```
Sky Blue       #3b82f6    ■ Professional, trustworthy
Navy Blue      #2563eb    ■ Gradient base, premium
Dark Blue      #1d4ed8    ■ Extra dark for contrast
Very Dark Blue #1e40af    ■ Maximum contrast
```

### Accent Colors
```
Cyan           #06b6d4    ■ Modern, tech-forward
Teal           #14b8a6    ■ Fresh, contemporary
Indigo         #4f46e5    ■ Sophisticated, premium
Slate Gray     #64748b    ■ Professional, neutral
```

### Neutral Colors (Light Mode)
```
Background     #fafbfc    ■ Off-white (better than #fff)
Cards          #ffffff    ■ Pure white
Text Primary   #424242    ■ Dark gray (readable)
Text Secondary #666666    ■ Medium gray (secondary)
Text Heading   #1a1a1a    ■ Nearly black (headlines)
Border         #e5e7eb    ■ Light gray borders
```

### Neutral Colors (Dark Mode)
```
Background     #0f1119    ■ Very dark navy
Cards          #1c2128    ■ Slightly lighter navy
Text Primary   #c9d1d9    ■ Light gray (readable)
Text Secondary #8b949e    ■ Muted gray (secondary)
Text Heading   #f0f6fc    ■ Almost white (headlines)
Border         #30363d    ■ Dark gray borders
```

---

## Spacing System

### Section Padding
```
Desktop:   padding: 72px 0      (Large screens)
Tablet:    padding: 56px 0      (Medium screens)
Mobile:    padding: 48px 0      (Small screens)
```

### Grid Gaps
```
Large Gap:   gap: 28px           (Desktop module grid)
Medium Gap:  gap: 24px           (Component spacing)
Small Gap:   gap: 16px           (Mobile spacing)
Tiny Gap:    gap: 8px            (Element spacing)
```

### Card Padding
```
Desktop:   padding: 32px         (Consistent)
Mobile:    padding: 32px         (No reduction needed)
```

### Component Spacing
```
Extra Large: 72px
Large:       48px
Medium:      32px
Small:       24px
Tiny:        16px
Micro:       8px
```

---

## Shadow System

### Level 1 - Subtle (Default Cards)
```css
box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
Use for: Minimal depth, background elements
```

### Level 2 - Medium (Cards at Rest)
```css
box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.08);
Use for: Standard cards, normal state
```

### Level 3 - Large (Cards on Hover)
```css
box-shadow: 0 12px 32px 0 rgba(0, 0, 0, 0.12);
Use for: Hover elevation, floating elements
```

### Level 4 - Extra Large (Premium Elements)
```css
box-shadow: 0 20px 48px 0 rgba(0, 0, 0, 0.15);
Use for: Hero cards, featured elements
```

---

## Typography System

### Font Family
```
Primary:   -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
Fallback:  Helvetica, Arial, sans-serif
```

### Font Weights
```
Black:      900    (Headlines)
Bold:       700    (Card titles, buttons)
Semibold:   600    (Labels, badges)
Normal:     400    (Body text, paragraphs)
Light:      300    (DEPRECATED - too thin)
```

### Font Sizes & Line Heights

#### Headings
```
H1 (Headline):
  Desktop:  text-7xl  (56px)   | line-height: 1.25
  Tablet:   text-6xl  (48px)   | line-height: 1.25
  Mobile:   text-5xl  (40px)   | line-height: 1.25

H2 (Section Header):
  Desktop:  text-5xl  (48px)   | line-height: 1.25
  Tablet:   text-4xl  (36px)   | line-height: 1.25
  Mobile:   text-3xl  (30px)   | line-height: 1.25

H3 (Card Title):
  Desktop:  text-xl   (20px)   | line-height: 1.25
  Mobile:   text-lg   (18px)   | line-height: 1.25

H4 (Subheading):
  Desktop:  text-lg   (18px)   | line-height: 1.5
```

#### Body Text
```
Paragraph:
  Size:            16px
  Line Height:     1.6      (Readable)
  Color:           #424242  (Light mode)
                   #c9d1d9  (Dark mode)

Small Text (Labels):
  Size:            14px
  Line Height:     1.5
  Font Weight:     600
```

---

## Border Radius

### Card Styling
```
Cards:           border-radius: 14px (rounded-2xl)
Buttons:         border-radius: 10px (rounded-lg)
Icons:           border-radius: 14px (rounded-xl)
Badges:          border-radius: 8px  (rounded-lg)
Small Elements:  border-radius: 6px  (rounded)
```

---

## Responsive Breakpoints

### Tailwind Breakpoints (Used)
```
sm:  640px   (Small phones)
md:  768px   (Tablets, large phones)
lg:  1024px  (Desktops)
xl:  1280px  (Large desktops)
2xl: 1536px  (Extra large)
```

### Our Specific Breakpoints
```
Mobile:   < 768px    (1-column layouts)
Tablet:   768-1200px (2-column layouts)
Desktop:  > 1200px   (4-column layouts)
```

---

## Transitions & Animations

### Standard Transition
```css
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
Use for: Smooth, premium feel
Duration: 300ms (was 200ms, now more elegant)
```

### Animations
```css
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
Duration: 400ms

@keyframes slideUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
}
Duration: 500ms

@keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-24px); }
    to { opacity: 1; transform: translateX(0); }
}
Duration: 500ms
```

---

## Hover Effects

### Card Hover
```css
/* On Hover */
transform: translateY(-6px);           /* Was -2px, now more prominent */
box-shadow: 0 12px 32px rgba(...);     /* Elevate */
border-color: #3b82f6;                 /* Highlight border */
```

### Icon Hover
```css
/* On Hover */
transform: scale(1.12) rotate(6deg);   /* Scale up and rotate */
box-shadow: 0 10px 28px rgba(...);     /* Better shadow */
```

### Button Hover
```css
/* On Hover */
background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);  /* Darker */
transform: translateY(-2px);                                      /* Lift */
box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);                 /* Shadow */
```

---

## Accessibility Standards

### Color Contrast (WCAG AA)
```
Text on Background:    4.5:1 minimum ratio
Large Text on BG:      3:1 minimum ratio
Button Text on BG:     4.5:1 minimum ratio

Our Combinations:
#1a1a1a on #fafbfc:    21:1  ✅ AAA (Maximum)
#424242 on #ffffff:    8.6:1 ✅ AAA
#c9d1d9 on #0f1119:    13:1  ✅ AAA
```

### Font Sizes
```
Minimum Size:  12px (allowed in special cases)
Standard:      16px (body text)
Headlines:     24px+ (good visual hierarchy)
Readability:   Line height 1.5+ (sufficient)
```

---

## Component Sizing

### Module Cards
```
Desktop (4-col):   1fr width in grid
Tablet (2-col):    1fr width in grid
Mobile (1-col):    100% width
Height:            Auto (flex content)
Padding:           32px (all sides)
Border Radius:     14px
```

### Icons
```
Size:              64×64 pixels
Border Radius:     14px
Background:        Gradient (module-specific)
Shadow:            0 6px 20px rgba(...)
Hover Scale:       1.12× (was 1.1×)
Hover Rotate:      6 degrees
```

### Buttons
```
Primary Button:
  Height:          56px (py-4)
  Padding:         32px (px-8)
  Font Size:       16px
  Border Radius:   10px
  Shadow:          0 4px 16px rgba(...)

Secondary Button:
  Height:          56px (py-4)
  Padding:         32px (px-8)
  Border:          2px solid
  Border Radius:   10px
```

---

## Grid System

### Hero Section Grid
```
Desktop:   2 columns | gap: 80px
Tablet:    1 column
Mobile:    1 column (stacked)
```

### Module Cards Grid
```
Desktop:   4 columns | gap: 28px
Tablet:    2 columns | gap: 28px
Mobile:    1 column  | gap: 20px
```

### Stats Grid (Hero)
```
Desktop:   3 columns | gap: 24px
Mobile:    3 columns | gap: 24px (no change)
```

---

## Container System

### Max Width
```
Hero Container:      max-w-6xl (80rem, 1280px)
Module Container:    max-w-6xl (80rem, 1280px)
Main Container:      100% (full width with padding)
```

### Horizontal Padding
```
Desktop:   px-8   (32px)
Tablet:    px-6   (24px)
Mobile:    px-4   (16px)
```

---

## Professional Color Gradients

### Hero Headline
```css
background: linear-gradient(
    to right,
    #3b82f6 0%,
    #06b6d4 100%
);
Result: Blue → Cyan (Modern, eye-catching)
```

### Primary Buttons
```css
background: linear-gradient(
    135deg,
    #3b82f6 0%,
    #2563eb 100%
);
Result: Sky Blue → Navy (Professional, premium)
```

### Module Card Icons
```css
/* Each module has its own gradient */
Module 1: from-blue-600 to-blue-500      (Blue)
Module 2: from-teal-600 to-teal-500      (Teal)
Module 3: from-cyan-600 to-cyan-500      (Cyan)
Module 4: from-indigo-600 to-indigo-500  (Indigo)
```

---

## Design Tokens Summary

| Token | Value | Usage |
|-------|-------|-------|
| Primary Color | #3b82f6 | Buttons, links, accents |
| Dark Primary | #2563eb | Button hover, gradients |
| Accent Cyan | #06b6d4 | Highlights, secondary |
| Text Primary | #424242 / #c9d1d9 | Body text |
| Text Heading | #1a1a1a / #f0f6fc | Headlines |
| Border | #e5e7eb / #30363d | Card borders |
| Shadow Small | 0 1px 3px rgba(...) | Subtle depth |
| Shadow Large | 0 12px 32px rgba(...) | Hover elevation |
| Radius Standard | 14px | Cards, containers |
| Spacing Unit | 8px | All measurements |
| Transition | 0.3s ease | Smooth interactions |

---

**Reference Guide Created:** December 7, 2025  
**Design System:** Professional Enterprise Grade  
**Ready for:** Production & Brand Guidelines  

This color and spacing guide ensures consistency across all future design work on the Physical AI Textbook platform.
