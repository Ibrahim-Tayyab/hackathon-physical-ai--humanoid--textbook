---
id: 0008
title: Design Spec Acknowledged
stage: general
date: 2025-12-07
surface: agent
model: GPT-5.1-Codex-Mini (Preview)
feature: none
branch: gh-pages
user: user
command: n/a
labels: [design,spec,homepage]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - none
tests:
 - not run
---

## Prompt

<context>
The current date is December 7, 2025.
There have been some changes between the last request and now.
Some edits were made, by the user or possibly by a formatter or another automated tool, to:
- e:\Hackathon_AI\hackathon-youtube\physical-ai-textbook\docusaurus.config.ts
So be sure to check the current file contents before making any new edits.
Terminals:
Terminal: cmd
Terminal: powershell
Last Command: cd e:\Hackathon_AI\hackathon-youtube\physical-ai-textbook ; npm run build
Cwd: E:\Hackathon_AI\hackathon-youtube
Exit Code: 0
<editorContext>
The user's current file is chat-editing-snapshot-text-model:/e%3A/Hackathon_AI/hackathon-youtube/physical-ai-textbook/postcss.config.js?%7B%22sessionId%22%3A%226d3c1de6-d352-4bf7-9593-8fd717f5ddcd%22%2C%22requestId%22%3A%22request_c430db3f-5792-40ef-afc1-6444023754c1%22%2C%22undoStop%22%3A%22__epoch_9007199254740991%22%7D.
</editorContext>
<reminderInstructions>

</reminderInstructions>
<userRequest>
# Physical AI & Humanoid Robotics Textbook - Design Specification

## 🎯 Project Overview

This document contains the **complete design specification** for integrating a custom homepage design into a Docusaurus project. The goal is to recreate the exact same professional, modern textbook landing page with pixel-perfect accuracy.

---

## 📋 AI Implementation Prompt

Use the following prompt when working with AI to implement this design in Docusaurus:

---

### **COMPLETE DESIGN IMPLEMENTATION PROMPT**

```
I need you to create a custom homepage for my Docusaurus project that matches the exact design 
specifications below. Pay extreme attention to every styling detail, spacing, color, and interaction. 
The design must be pixel-perfect - no deviations, no creative interpretations, just exact implementation.

## PROJECT CONTEXT

- Framework: Docusaurus (latest version)
- Custom homepage to replace default Docusaurus landing page
- Must be fully responsive and accessible
- Must maintain Docusaurus navigation integration
```

---

## 🎨 EXACT DESIGN SPECIFICATIONS

### **COLOR PALETTE (Use EXACTLY these hex codes)**

```css
/* Background Colors */
--bg-darker: #050810          /* Main background - darkest navy */
--bg-dark: #0a0e1a            /* Section alternating background */
--bg-card: #111827            /* Card background */
--bg-card-hover: #1a2332      /* Card hover state */

/* Primary Colors */
--primary: #3b82f6            /* Primary blue for buttons and links */
--primary-hover: #2563eb      /* Hover state for primary elements */

/* Text Colors */
--text-primary: #ffffff       /* Primary text - pure white */
--text-secondary: #9ca3af     /* Secondary text - light gray */
--text-muted: #6b7280         /* Muted text - darker gray */

/* Border Colors */
--border: #1f2937             /* Card borders */
--border-light: #374151       /* Hover borders */
```

---

## 📐 LAYOUT STRUCTURE

### **1. NAVIGATION BAR**

**Position:** Sticky top, stays visible on scroll  
**Background:** `var(--bg-dark)` with `backdrop-filter: blur(10px)`  
**Border Bottom:** `1px solid var(--border)`  
**Padding:** `1rem 0`  
**Max Width:** 1400px centered  
**z-index:** 100

**Left Side:**
- Robot emoji: 🤖 (font-size: 1.5rem)
- Brand text: "Physical AI & Humanoid Robotics Textbook"
- Font weight: 600
- Gap between icon and text: 0.75rem

**Right Side (Nav Links):**
- "Textbook" link
- "GitHub ↗" link (external)
- "🌐 English ▼" dropdown indicator
- Moon icon button: 🌙 (theme toggle)
- Gap between items: 2rem
- Font size: 0.95rem
- Color: `var(--text-secondary)`
- Hover color: `var(--text-primary)`
- Transition: 0.2s

**Mobile Behavior:**
- Reduce gaps to 1rem
- Font size: 0.85rem
- Brand text: 0.9rem

---

### **2. HERO SECTION**

**Background:** Linear gradient from `var(--bg-dark)` to `var(--bg-darker)`  
**Padding:** `6rem 0 8rem` (desktop), `4rem 0 5rem` (mobile)  
**Text Align:** Center  
**Max Width:** 900px centered

**Radial Glow Effect (::before pseudo-element):**
- Position: absolute, top -50%, centered
- Width: 800px, Height: 800px
- Background: `radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)`
- Pointer events: none

**Hero Title:**
- Font family: 'Space Grotesk', sans-serif
- Font size: `clamp(2.5rem, 5vw, 3.5rem)`
- Font weight: 700
- Line height: 1.2
- Margin bottom: 1.5rem
- Gradient text: `linear-gradient(135deg, #fff 0%, #3b82f6 100%)`
- Use `-webkit-background-clip: text` and `-webkit-text-fill-color: transparent`

**Hero Description:**
- Font size: 1.25rem
- Line height: 1.8
- Color: `var(--text-secondary)`
- Margin bottom: 2.5rem
- Max width: 800px centered

**CTA Button ("Start Reading →")**:
- Display: inline-block
- Background: `var(--primary)`
- Color: white
- Padding: `1rem 2rem`
- Border radius: 0.5rem
- Font weight: 600
- Font size: 1.1rem
- Text decoration: none
- Box shadow: `0 4px 20px rgba(59, 130, 246, 0.3)`

**CTA Button Hover:**
- Background: `var(--primary-hover)`
- Transform: `translateY(-2px)`
- Box shadow: `0 6px 25px rgba(59, 130, 246, 0.4)`
- Transition: all 0.3s

---

### **3. "WHAT THIS TEXTBOOK COVERS" SECTION**

**Background:** `var(--bg-darker)`  
**Padding:** `4rem 0`

**Section Title:**
- Font family: 'Space Grotesk', sans-serif
- Font size: 2rem
- Font weight: 700
- Text align: center
- Margin bottom: 1.5rem
- Color: `var(--text-primary)`

**Section Description:**
- Text align: center
- Max width: 900px centered
- Font size: 1.125rem
- Line height: 1.8
- Color: `var(--text-secondary)`

---

### **4. MODULES SECTION**

**Background:** `var(--bg-dark)`  
**Padding:** `5rem 0`

**Section Title:**
- Font family: 'Space Grotesk', sans-serif
- Font size: 2rem
- Font weight: 700
- Text align: center
- Margin bottom: 3rem
- Color: `var(--text-primary)`
- Text: "Explore All Modules"

**Modules Grid:**
- Display: CSS Grid
- Grid template columns: `repeat(auto-fit, minmax(350px, 1fr))`
- Gap: 1.5rem
- Margin top: 2rem

**Total Cards:** 7 (Module 1-6 + Appendix)

---

### **5. MODULE CARD DESIGN (CRITICAL - EXACT SPECIFICATIONS)**

**Card Container:**
- Background: `var(--bg-card)`
- Border: `1px solid var(--border)`
- Border radius: 0.75rem
- Padding: 2rem
- Transition: all 0.3s

**Card Hover State:**
- Background: `var(--bg-card-hover)`
- Border color: `var(--border-light)`
- Transform: `translateY(-4px)`
- Box shadow: `0 10px 30px rgba(0, 0, 0, 0.4)`

**Module Title:**
- Font family: 'Space Grotesk', sans-serif
- Font size: 1.5rem
- Font weight: 600
- Margin bottom: 1rem
- Color: `var(--text-primary)`
- Examples:
  - "Module 1: ROS 2 Foundations"
  - "Module 2: Simulation & Digital Twins"
  - "Module 3: Hardware & Intelligence"
  - "Module 4: VLA — Vision, Language, Action"
  - "Module 5: Advanced AI & Motion Control"
  - "Module 6: Designing Humanoid Robots"
  - "Appendix" (special styling)

**Module Description:**
- Color: `var(--text-secondary)`
- Line height: 1.7
- Margin bottom: 1.5rem
- Font size: 1rem

**"Open Module →" Button:**
- Display: inline-block
- Background: `var(--primary)`
- Color: white
- Padding: `0.75rem 1.5rem`
- Border radius: 0.5rem
- Font weight: 600
- Font size: 0.95rem
- Text decoration: none
- Transition: all 0.3s

**Button Hover:**
- Background: `var(--primary-hover)`
- Transform: `translateX(4px)` (slides to the right)

**Appendix Card (Special):**
- Border: `1px solid rgba(59, 130, 246, 0.3)`
- Background: `rgba(59, 130, 246, 0.05)` (subtle blue tint)

**Mobile Behavior:**
- Grid: 1 column only

---

### **6. "WHY THIS TEXTBOOK IS AI-NATIVE" SECTION**

**Background:** `var(--bg-darker)`  
**Padding:** `5rem 0`

**Section Title:**
- Font family: 'Space Grotesk', sans-serif
- Font size: 2rem
- Font weight: 700
- Text align: center
- Margin bottom: 3rem
- Text: "Why This Textbook is AI-Native & Future-Focused"

**Features Grid:**
- Display: CSS Grid
- Grid template columns: `repeat(auto-fit, minmax(300px, 1fr))`
- Gap: 2rem
- Margin top: 2.5rem

**Feature Card (3 cards total):**
- Background: `var(--bg-card)`
- Border: `1px solid var(--border)`
- Border radius: 0.75rem
- Padding: 2rem
- Text align: center

**Feature Title:**
- Font family: 'Space Grotesk', sans-serif
- Font size: 1.25rem
- Font weight: 600
- Margin bottom: 1rem
- Color: `var(--text-primary)`

**Feature Text:**
- Color: `var(--text-secondary)`
- Line height: 1.7

**Three Features:**
1. **"AI-Driven Design"** - Built fully around modern LLMs, AI agents, RAG systems...
2. **"Hands-On Learning"** - Every module includes practical labs, projects, simulators...
3. **"Industry-Inspired Curriculum"** - Curriculum reflects real-world demands...

---

### **7. "BEGIN YOUR ROBOTICS JOURNEY" CTA SECTION**

**Background:** `var(--bg-dark)`  
**Padding:** `5rem 0`  
**Text Align:** Center

**Container:**
- Max width: 800px centered
- Padding: `0 2rem`

**CTA Title:**
- Font family: 'Space Grotesk', sans-serif
- Font size: 2.5rem
- Font weight: 700
- Margin bottom: 1.5rem
- Color: `var(--text-primary)`

**CTA Text:**
- Font size: 1.25rem
- Color: `var(--text-secondary)`
- Line height: 1.8
- Margin bottom: 2.5rem

**Large CTA Button ("Start Reading →")**:
- Display: inline-block
- Background: `var(--primary)`
- Color: white
- Padding: `1.25rem 2.5rem`
- Border radius: 0.5rem
- Font weight: 600
- Font size: 1.15rem
- Box shadow: `0 4px 20px rgba(59, 130, 246, 0.3)`

**Button Hover:**
- Background: `var(--primary-hover)`
- Transform: `translateY(-2px)`
- Box shadow: `0 6px 25px rgba(59, 130, 246, 0.4)`
- Transition: all 0.3s

---

### **8. FOOTER**

**Background:** `var(--bg-darker)`  
**Border Top:** `1px solid var(--border)`  
**Padding:** `3rem 0`

**Footer Container:**
- Max width: 1200px centered
- Padding: `0 2rem`
- Display: CSS Grid
- Grid template columns: `repeat(auto-fit, minmax(200px, 1fr))`
- Gap: 2rem

**Footer Section (3 sections):**
- Display: flex column
- Gap: 0.75rem

**Section 1: "Docs"**
- Link: "Introduction ↗"

**Section 2: "Social Profiles"**
- Links: "Instagram ↗", "LinkedIn ↗", "(X)Twitter ↗"

**Section 3: "More"**
- Link: "GitHub ↗"

**Footer Heading:**
- Font weight: 600
- Font size: 0.95rem
- Color: `var(--text-primary)`
- Margin bottom: 0.5rem

**Footer Links:**
- Color: `var(--text-secondary)`
- Font size: 0.9rem
- Text decoration: none
- Transition: color 0.2s

**Footer Link Hover:**
- Color: `var(--primary)`

**Mobile Behavior:**
- Grid: 1 column

---

## 🔤 TYPOGRAPHY

### **Font Families**
```css
/* Primary font for body text */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Display font for headings */
font-family: 'Space Grotesk', sans-serif;
```

### **Import Fonts (Add to <head>)**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### **Font Sizes (Exact)**
- Hero Title: `clamp(2.5rem, 5vw, 3.5rem)`
- Section Titles: `2rem` (Space Grotesk)
- CTA Title: `2.5rem` (Space Grotesk)
- Module Card Title: `1.5rem` (Space Grotesk)
- Feature Title: `1.25rem` (Space Grotesk)
- Hero Description: `1.25rem`
- Section Description: `1.125rem`
- Module Description: `1rem`
- Nav Links: `0.95rem`
- Buttons: `1.1rem` (large), `0.95rem` (module buttons)
- Footer Heading: `0.95rem`
- Footer Links: `0.9rem`

### **Font Weights**
- Headings: 700 (bold)
- Buttons: 600 (semi-bold)
- Nav Brand: 600
- Body Text: 400 (regular)

---

## 🎭 INTERACTIONS & ANIMATIONS

### **Smooth Scrolling**
```css
html {
    scroll-behavior: smooth;
}
```

### **Hover Transitions**
- All links: `transition: color 0.2s`
- All buttons: `transition: all 0.3s`
- Module cards: `transition: all 0.3s`

### **Transform Effects**
- Buttons on hover: `translateY(-2px)`
- Module buttons on hover: `translateX(4px)`
- Module cards on hover: `translateY(-4px)`
- Theme toggle on hover: `scale(1.1)`

### **Box Shadows (Progressive on Hover)**
- Base button: `0 4px 20px rgba(59, 130, 246, 0.3)`
- Hover button: `0 6px 25px rgba(59, 130, 246, 0.4)`
- Card hover: `0 10px 30px rgba(0, 0, 0, 0.4)`

---

## 📱 RESPONSIVE BREAKPOINTS

### **Desktop (default)**
- Max width containers: 1200px - 1400px
- Grid: auto-fit with min 300-350px columns

### **Tablet (max-width: 768px)**
- Nav links gap: 1rem
- Nav link font size: 0.85rem
- Hero padding: `4rem 0 5rem`
- All grids: 1 column
- Brand text: 0.9rem

### **Mobile (max-width: 480px)**
- Maintain 1 column layout
- Reduce padding proportionally
- Ensure touch targets are minimum 44x44px

---

## ♿ ACCESSIBILITY REQUIREMENTS

### **Focus States**
```css
a:focus-visible,
button:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
}
```

### **Semantic HTML**
- Use `<nav>` for navigation
- Use `<section>` for content sections
- Use `<header>` for hero
- Use `<footer>` for footer
- Proper heading hierarchy (h1 → h2 → h3)

### **ARIA Labels**
- Add aria-labels to icon-only buttons
- Use semantic link text (no "click here")

### **Keyboard Navigation**
- All interactive elements must be keyboard accessible
- Logical tab order

---

## 🔧 DOCUSAURUS INTEGRATION INSTRUCTIONS

### **1. Create Custom Homepage Component**

Create file: `src/pages/index.js` or `src/pages/index.tsx`

```jsx
import React from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout
      title="Physical AI & Humanoid Robotics Textbook"
      description="A complete and practical learning system for humanoid robotics, ROS 2, and advanced AI">
      
      {/* Navigation will be provided by Docusaurus Layout */}
      
      {/* HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>
            Physical AI & Humanoid Robotics Textbook
          </h1>
          <p className={styles.heroDescription}>
            A complete and practical learning system where you master the future: 
            humanoid robotics, ROS 2, large action models, simulation, VLA systems, 
            hardware, and advanced AI for next-generation intelligent machines.
          </p>
          <a href="#start" className={styles.ctaButton}>
            Start Reading →
          </a>
        </div>
      </section>

      {/* Add all other sections following the exact structure */}
      
    </Layout>
  );
}
```

### **2. Create Module CSS (index.module.css)**

Follow the EXACT color palette and styles defined above. Use CSS Modules for scoped styling.

### **3. Optional: Override Docusaurus Navbar**

If you want to customize the navbar to match exactly:

Create: `src/theme/Navbar/index.js`

```jsx
import React from 'react';
import styles from './styles.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      {/* Custom navbar implementation */}
    </nav>
  );
}
```

### **4. Configure docusaurus.config.js**

Ensure your config allows for custom homepage:

```javascript
module.exports = {
  // ... other config
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // ... docs config
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
```

---

## ✅ IMPLEMENTATION CHECKLIST

Use this checklist to ensure pixel-perfect implementation:

- [ ] All color variables match exactly (no deviations)
- [ ] Navigation bar is sticky with backdrop blur
- [ ] Hero section has radial glow effect
- [ ] Hero title uses gradient text effect
- [ ] All button shadows match specifications
- [ ] Module cards have proper hover states (translateY + shadow)
- [ ] Module buttons slide right on hover (translateX)
- [ ] Appendix card has blue tint background
- [ ] Feature cards are centered text
- [ ] Footer has 3-column grid layout
- [ ] All font sizes use exact values specified
- [ ] All spacing matches (rem values)
- [ ] Smooth scroll behavior enabled
- [ ] Focus states for accessibility
- [ ] Responsive at 768px and 480px breakpoints
- [ ] Inter font for body, Space Grotesk for headings
- [ ] All transitions are 0.3s for smooth feel
- [ ] No console errors or warnings
- [ ] Links have proper hover states
- [ ] Mobile menu works correctly (if custom navbar)

---

## 🚀 TESTING REQUIREMENTS

Before considering the implementation complete:

1. **Visual Testing**
   - Compare side-by-side with reference design
   - Check all hover states
   - Verify all animations are smooth
   - Confirm colors match exactly using color picker

2. **Responsive Testing**
   - Test at 1920px, 1440px, 1024px, 768px, 375px widths
   - Ensure no horizontal scroll
   - Verify touch targets on mobile

3. **Browser Testing**
   - Chrome
   - Firefox
   - Safari
   - Edge

4. **Accessibility Testing**
   - Tab through all interactive elements
   - Test with screen reader
   - Verify focus indicators are visible
   - Check color contrast ratios

5. **Performance Testing**
   - Lighthouse score should be 90+ for all metrics
   - No layout shift on load
   - Fonts should load without FOIT

---

## 📝 CONTENT REFERENCE

### **Module Content**

**Module 1: ROS 2 Foundations**
Description: "Learn ROS 2 — the nervous system of modern robots. Build nodes, topics, services, actions, publishers, subscribers, QoS, and real robot workflows."

**Module 2: Simulation & Digital Twins**
Description: "Master simulation systems: Gazebo, Unity Robotics, Isaac Sim, and digital twin workflows for learning and testing robots safely."

**Module 3: Hardware & Intelligence**
Description: "Motors, actuators, torque control, IMUs, sensors, microcontrollers, embedded systems — everything real humanoids need."

**Module 4: VLA — Vision, Language, Action**
Description: "Learn the most advanced robotics architecture: perception models, LLM-driven command systems, task planners, and advanced AI-driven movement."

**Module 5: Advanced AI & Motion Control**
Description: "Reinforcement learning, motion planning, MPC, trajectory optimization, and how robots learn intelligent, adaptable intelligence."

**Module 6: Designing Humanoid Robots**
Description: "Learn end-to-end humanoid creation: mechanical design, kinematics, actuators, control systems, and AI-driven movement."

**Appendix**
Description: "Glossary, research papers, references, external resources, and further reading for mastering robotics and AI."

---

## 🎯 FINAL NOTES FOR AI IMPLEMENTATION

**CRITICAL RULES:**

1. ✅ **DO NOT** improvise or "improve" the design - implement it EXACTLY as specified
2. ✅ **DO NOT** change colors, spacing, or font sizes "to look better"
3. ✅ **DO NOT** add extra animations or effects not specified
4. ✅ **DO** use CSS variables for all colors exactly as defined
5. ✅ **DO** test every hover state and transition
6. ✅ **DO** ensure mobile responsiveness matches specifications
7. ✅ **DO** maintain accessibility standards
8. ✅ **DO** ask for clarification if any specification is unclear

**When you're done:**
- Take screenshots at different viewport sizes
- Compare with reference design
- Fix any discrepancies before declaring complete
- Document any intentional deviations (there should be NONE)

---

## 📄 FILE STRUCTURE FOR DOCUSAURUS

```
docusaurus-project/
├── src/
├── theme/(optional overrides)
├── static/
├── docusaurus.config.js
└── package.json
```

---

## 🔗 REFERENCE FILES

The reference HTML and CSS files are included in this project:
- `index.html`
- `styles.css`

---

**END OF SPECIFICATION**

*This specification document is comprehensive and should enable any AI or developer to recreate the exact design with pixel-perfect accuracy in a Docusaurus environment.*
</userRequest>

## Response snapshot

Acknowledged the pixel-perfect homepage brief and outlined the implementation/checklist so we can build Layered Docusaurus sections, Nav, modules, CTA, and footer exactly as described.

## Outcome

- ✅ Impact: Design spec acknowledged; implementation plan ready for build.
- 🧪 Tests: not run
- 📁 Files: none
- 🔁 Next prompts: none
- 🧠 Reflection: Need the referenced HTML/CSS assets and the actual content for each module card before building.

## Evaluation notes (flywheel)

- Failure modes observed: None observed
- Graders run and results (PASS/FAIL): Not run
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): Map spec sections to new React components and CSS modules.
