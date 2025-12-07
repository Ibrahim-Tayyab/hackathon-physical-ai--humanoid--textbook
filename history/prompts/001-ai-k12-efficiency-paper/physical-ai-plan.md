# Implementation Plan: Physical AI & Humanoid Robotics Docusaurus Site

**Branch**: `feature/physical-ai-textbook-site` | **Date**: 2025-12-05 | **Spec**: `physical-ai-textbook-spec.md`  
**Input**: Feature specification from `E:\Hackathon_AI\hackathon-youtube\physical-ai-textbook-spec.md`

---

## Summary

Build a Docusaurus 3.x-based educational site for Physical AI and Humanoid Robotics with custom "Cyberpunk meets Clean Academic" theming. The site includes 5 content modules (Introduction, ROS2, Simulation, Isaac, VLA) containing 15 structured markdown pages, TypeScript configuration, Tailwind CSS 3.x integration for custom styling, explicit sidebar navigation preserving numeric ordering, and GitHub Pages deployment with automated CI/CD. Core technical approach: Initialize Docusaurus with TypeScript template, configure Tailwind CSS with custom cyberpunk color palette (#0a0e1a background, #00FFD4 cyan, #FF006B magenta, #0080FF electric blue), create content directory structure with placeholder MDX files, implement custom React landing page with hero header and module grid, and configure GitHub Actions for static site deployment.

---

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18.x or 20.x  
**Primary Dependencies**: 
- Docusaurus 3.x (static site generator)
- React 18+ (UI framework)
- Tailwind CSS 3.x (utility-first styling)
- PostCSS & Autoprefixer (CSS processing)

**Storage**: Static markdown/MDX files in `docs/` directory (no database required)  
**Testing**: 
- Docusaurus build validation (`npm run build`)
- Lighthouse CI for accessibility/performance audits
- Manual WCAG 2.1 Level AA contrast validation

**Target Platform**: Static site hosted on GitHub Pages (browser-based, no server runtime)  
**Project Type**: Web documentation site (static site generation)  
**Performance Goals**: 
- <2 seconds page load on 4G connection (constitutional requirement)
- Lighthouse scores 90+ across all categories
- <500KB initial JS bundle

**Constraints**: 
- WCAG 2.1 Level AA accessibility compliance (4.5:1 text contrast, 3:1 UI contrast)
- GitHub Pages deployment only (no custom hosting)
- Numeric ordering must be preserved in sidebar (01-, 02-, 03-)
- Dark mode only (cyberpunk theme, no light mode toggle)

**Scale/Scope**: 
- 15 documentation pages across 5 modules
- 4 navigation links (Docs, Modules, API, GitHub)
- Single repository, single deployment target
- Estimated build time: <5 minutes

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

✅ **Tech Stack Compliance**: Docusaurus 3.x, React 18, Tailwind CSS, TypeScript - matches constitutional mandate (Principle I)

✅ **Design Identity Compliance**: Cyberpunk theme with specified color codes (#0a0e1a, #00FFD4, #FF006B, #0080FF), Inter font, JetBrains Mono - matches constitutional mandate (Principle II)

✅ **Content Structure Compliance**: 4-module curriculum structure with hands-on focus - aligns with constitutional content principles (Principle III)

✅ **PHR Compliance**: Plan will generate PHR-0003 log entry per constitutional operational rule (Principle IV)

✅ **Performance Standards**: <2s page load, 90+ Lighthouse, WCAG 2.1 AA - matches constitutional standards (Principle VI)

✅ **Version Control Discipline**: GitHub Actions CI/CD, conventional commits planned - matches constitutional workflow (Principle VII)

**No violations detected. Proceed with implementation.**

---

## Project Structure

### Documentation (this feature)

```text
specs/physical-ai-textbook/
├── spec.md               # Technical specification (PHR-0002)
├── plan.md              # This file (PHR-0003)
└── tasks.md             # Implementation tasks (to be created with /sp.tasks)
```

### Source Code (repository root)

```text
physical-ai-textbook/
├── docs/                          # Content files (MDX format)
│   ├── 01-Introduction/
│   │   ├── 01-vision.mdx
│   │   ├── 02-hardware-setup.mdx
│   │   └── 03-prerequisites.mdx
│   ├── 02-Module-1-ROS2/
│   │   ├── 01-nodes-topics.mdx
│   │   ├── 02-python-rclpy.mdx
│   │   └── 03-urdf-humanoids.mdx
│   ├── 03-Module-2-Simulation/
│   │   ├── 01-gazebo-physics.mdx
│   │   ├── 02-unity-rendering.mdx
│   │   └── 03-sensors-lidar.mdx
│   ├── 04-Module-3-Brain/
│   │   ├── 01-isaac-sim.mdx
│   │   ├── 02-nav2-vslam.mdx
│   │   └── 03-reinforcement-learning.mdx
│   └── 05-Module-4-VLA/
│       ├── 01-whisper-voice.mdx
│       ├── 02-llm-planning.mdx
│       └── 03-capstone-project.mdx
├── src/
│   ├── components/               # Custom React components
│   │   ├── HomepageFeatures/    # Module grid component
│   │   └── NeonCard/            # Reusable cyberpunk card
│   ├── css/
│   │   └── custom.css           # Tailwind imports + custom theme
│   ├── pages/
│   │   └── index.tsx            # Landing page with hero
│   └── theme/                   # Swizzled Docusaurus components (if needed)
├── static/
│   ├── img/                     # Images, logos, icons
│   └── fonts/                   # Custom fonts (if self-hosted)
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions CI/CD
├── docusaurus.config.ts         # Main site configuration
├── sidebars.ts                  # Sidebar navigation structure
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies
├── package-lock.json            # Locked dependencies
├── .gitignore                   # Git ignore patterns
└── README.md                    # Project documentation
```

**Structure Decision**: Standard Docusaurus 3.x TypeScript template with Tailwind CSS integration. The `docs/` directory uses numeric prefixes (01-, 02-) to enforce ordering, and `sidebars.ts` explicitly defines the structure to prevent auto-generation issues. Custom components in `src/components/` enable cyberpunk styling reuse. Static assets in `static/` for images and fonts. GitHub Actions workflow in `.github/workflows/` for automated deployment.

---

## Phase 0: Research & Validation (Pre-Implementation)

**Objective**: Validate technical approach and identify potential blockers before writing code.

### Research Items

1. **Docusaurus 3.x + Tailwind CSS Integration**
   - **Question**: Does Docusaurus 3.x support Tailwind CSS without custom webpack configuration?
   - **Method**: Review official Docusaurus docs, check for `tailwindcss` plugin compatibility
   - **Expected Outcome**: Confirm PostCSS integration path or identify custom config needs
   - **Risk**: May require ejecting Docusaurus webpack config (adds maintenance burden)

2. **TypeScript Configuration for MDX**
   - **Question**: Do `.mdx` files require special TypeScript configuration for JSX support?
   - **Method**: Check Docusaurus TypeScript guide, test MDX frontmatter typing
   - **Expected Outcome**: Confirm `tsconfig.json` settings for MDX compilation
   - **Risk**: Type errors in MDX files may break builds

3. **Numeric Ordering in Sidebar**
   - **Question**: Will Docusaurus auto-sidebar-generation respect `01-`, `02-` prefixes, or must we use explicit `sidebars.ts`?
   - **Method**: Test with minimal Docusaurus install, compare auto vs manual sidebar
   - **Expected Outcome**: Determine if explicit sidebar config is required (assumption: yes per spec)
   - **Risk**: Auto-generation may strip numeric prefixes in labels

4. **WCAG Contrast Requirements**
   - **Question**: Do cyberpunk colors (#00FFD4, #FF006B, #0080FF on #0a0e1a) meet 4.5:1 contrast ratio?
   - **Method**: Use WebAIM Contrast Checker or WAVE browser extension
   - **Expected Outcome**: Validate contrast ratios or adjust color brightness
   - **Risk**: Neon colors may fail WCAG AA standards (may need to lighten shades)

5. **GitHub Pages Deployment with Custom Base URL**
   - **Question**: Does `baseUrl: '/physical-ai-textbook/'` work correctly with GitHub Pages and Docusaurus routing?
   - **Method**: Review Docusaurus deployment docs, check for trailing slash issues
   - **Expected Outcome**: Confirm `baseUrl` and `url` configuration for `https://[username].github.io/physical-ai-textbook/`
   - **Risk**: Routing errors or 404s on deployed site if baseUrl misconfigured

### Research Outcomes (To Be Filled During Phase 0)

| Research Item | Finding | Decision | Risks Mitigated |
|---------------|---------|----------|-----------------|
| Tailwind + Docusaurus | [TBD] | [TBD] | [TBD] |
| TypeScript MDX | [TBD] | [TBD] | [TBD] |
| Sidebar Ordering | [TBD] | [TBD] | [TBD] |
| WCAG Contrast | [TBD] | [TBD] | [TBD] |
| GitHub Pages | [TBD] | [TBD] | [TBD] |

---

## Phase 1: Foundation (Project Setup)

**Objective**: Initialize Docusaurus project with TypeScript and Tailwind CSS, clean default boilerplate.

**Duration Estimate**: 2-3 hours  
**Prerequisites**: Node.js 18.x or 20.x installed, npm available, Git configured

### Tasks

#### Task 1.1: Initialize Docusaurus with TypeScript

**Command (Windows-compatible)**:
```bash
npx create-docusaurus@latest physical-ai-textbook classic --typescript
cd physical-ai-textbook
```

**Verification**:
- Project folder `physical-ai-textbook/` created
- Files present: `docusaurus.config.ts`, `tsconfig.json`, `package.json`
- Run `npm start` to verify dev server launches at `http://localhost:3000`

**Success Criteria**:
- [ ] Docusaurus site runs without errors in development mode
- [ ] TypeScript configuration present (`tsconfig.json`)
- [ ] Default example docs visible in browser

**PHR Checkpoint**: Log initialization in PHR-0003 notes section

---

#### Task 1.2: Install Tailwind CSS and Dependencies

**Commands (Windows-compatible)**:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

**Expected Output**:
- `tailwind.config.js` created in project root
- `package.json` updated with Tailwind CSS dependencies

**Configuration Steps**:

1. **Create `postcss.config.js`**:
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

2. **Update `tailwind.config.js`**:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './docs/**/*.{md,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        'cyberpunk-bg': '#0a0e1a',
        'cyberpunk-text': '#e0e6f0',
        'neon-cyan': '#00FFD4',
        'neon-magenta': '#FF006B',
        'neon-blue': '#0080FF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'neon': '0 0 10px rgba(0, 255, 212, 0.5)',
        'neon-magenta': '0 0 10px rgba(255, 0, 107, 0.5)',
        'neon-blue': '0 0 10px rgba(0, 128, 255, 0.5)',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Disable Tailwind reset to preserve Docusaurus styles
  },
};
```

**Success Criteria**:
- [ ] Tailwind CSS installed (`npm list tailwindcss` shows version)
- [ ] `tailwind.config.js` configured with cyberpunk colors
- [ ] `postcss.config.js` created
- [ ] No build errors after configuration

**PHR Checkpoint**: Document Tailwind config decisions (preflight disabled to avoid Docusaurus conflicts)

---

#### Task 1.3: Clean Up Default Boilerplate

**Files to Delete**:
```bash
# Remove example docs (Windows commands)
rmdir /s /q docs\tutorial-basics
rmdir /s /q docs\tutorial-extras
del docs\intro.md

# Remove example blog
rmdir /s /q blog
```

**Files to Modify**:

1. **Update `docusaurus.config.ts`** (remove blog preset):
```typescript
// Remove or comment out blog configuration
// blog: {
//   showReadingTime: true,
//   ...
// },
```

2. **Update `src/pages/index.tsx`** (prepare for custom landing page - will be rewritten in Phase 3):
```typescript
// Keep file, but mark for Phase 3 rewrite
// TODO: Replace with custom hero + module grid in Phase 3
```

**Success Criteria**:
- [ ] Default tutorial docs removed
- [ ] Blog directory removed
- [ ] `docusaurus.config.ts` cleaned (no blog references)
- [ ] Site still builds without errors (`npm run build`)

**PHR Checkpoint**: Log boilerplate cleanup completion

---

## Phase 2: Content Architecture (Skeleton)

**Objective**: Create 5 module directories and 15 blank MDX files with proper frontmatter, configure sidebar navigation.

**Duration Estimate**: 2-3 hours  
**Prerequisites**: Phase 1 completed successfully

### Tasks

#### Task 2.1: Create Module Directory Structure

**Script to Create Directories** (Windows PowerShell or Command Prompt):

**PowerShell**:
```powershell
# Create module directories
New-Item -ItemType Directory -Path "docs\01-Introduction" -Force
New-Item -ItemType Directory -Path "docs\02-Module-1-ROS2" -Force
New-Item -ItemType Directory -Path "docs\03-Module-2-Simulation" -Force
New-Item -ItemType Directory -Path "docs\04-Module-3-Brain" -Force
New-Item -ItemType Directory -Path "docs\05-Module-4-VLA" -Force
```

**Command Prompt**:
```cmd
mkdir docs\01-Introduction
mkdir docs\02-Module-1-ROS2
mkdir docs\03-Module-2-Simulation
mkdir docs\04-Module-3-Brain
mkdir docs\05-Module-4-VLA
```

**Verification**:
- [ ] 5 directories created in `docs/`
- [ ] Directory names match specification exactly (including numeric prefixes)

**PHR Checkpoint**: Log directory creation in PHR-0003

---

#### Task 2.2: Create Placeholder MDX Files

**Template for MDX Files**:
```mdx
---
sidebar_position: [NUMBER]
title: "[TITLE]"
description: "[DESCRIPTION]"
---

# [TITLE]

> 🚧 **Under Construction**: This chapter is currently being developed.

## Overview

This chapter will cover:
- [Topic 1]
- [Topic 2]
- [Topic 3]

## Prerequisites

- [Prerequisite 1]
- [Prerequisite 2]

## Coming Soon

Detailed content for this chapter will be added in Phase 4 (Content Injection).

---

**Next Chapter**: [Link to next chapter]
```

**Files to Create** (15 total):

**01-Introduction/**:
1. `01-vision.mdx` - Title: "From Digital to Embodied Intelligence", sidebar_position: 1
2. `02-hardware-setup.mdx` - Title: "RTX 4070 Ti & Ubuntu Setup", sidebar_position: 2
3. `03-prerequisites.mdx` - Title: "Python & Docker Prerequisites", sidebar_position: 3

**02-Module-1-ROS2/**:
4. `01-nodes-topics.mdx` - Title: "ROS 2 Nodes and Topics", sidebar_position: 1
5. `02-python-rclpy.mdx` - Title: "Python Client Library (rclpy)", sidebar_position: 2
6. `03-urdf-humanoids.mdx` - Title: "URDF Modeling for Humanoids", sidebar_position: 3

**03-Module-2-Simulation/**:
7. `01-gazebo-physics.mdx` - Title: "Gazebo Physics Engine", sidebar_position: 1
8. `02-unity-rendering.mdx` - Title: "Unity Rendering Integration", sidebar_position: 2
9. `03-sensors-lidar.mdx` - Title: "Sensor Simulation: LiDAR", sidebar_position: 3

**04-Module-3-Brain/**:
10. `01-isaac-sim.mdx` - Title: "NVIDIA Isaac Sim Setup", sidebar_position: 1
11. `02-nav2-vslam.mdx` - Title: "Navigation2 and Visual SLAM", sidebar_position: 2
12. `03-reinforcement-learning.mdx` - Title: "Reinforcement Learning for Robotics", sidebar_position: 3

**05-Module-4-VLA/**:
13. `01-whisper-voice.mdx` - Title: "Voice Input with Whisper", sidebar_position: 1
14. `02-llm-planning.mdx` - Title: "LLM-Based Task Planning", sidebar_position: 2
15. `03-capstone-project.mdx` - Title: "Capstone Integration Project", sidebar_position: 3

**Automation Option** (Node.js script to generate files):

Create `scripts/generate-docs.js`:
```javascript
const fs = require('fs');
const path = require('path');

const modules = [
  {
    dir: '01-Introduction',
    files: [
      { name: '01-vision.mdx', title: 'From Digital to Embodied Intelligence', pos: 1 },
      { name: '02-hardware-setup.mdx', title: 'RTX 4070 Ti & Ubuntu Setup', pos: 2 },
      { name: '03-prerequisites.mdx', title: 'Python & Docker Prerequisites', pos: 3 },
    ],
  },
  {
    dir: '02-Module-1-ROS2',
    files: [
      { name: '01-nodes-topics.mdx', title: 'ROS 2 Nodes and Topics', pos: 1 },
      { name: '02-python-rclpy.mdx', title: 'Python Client Library (rclpy)', pos: 2 },
      { name: '03-urdf-humanoids.mdx', title: 'URDF Modeling for Humanoids', pos: 3 },
    ],
  },
  {
    dir: '03-Module-2-Simulation',
    files: [
      { name: '01-gazebo-physics.mdx', title: 'Gazebo Physics Engine', pos: 1 },
      { name: '02-unity-rendering.mdx', title: 'Unity Rendering Integration', pos: 2 },
      { name: '03-sensors-lidar.mdx', title: 'Sensor Simulation: LiDAR', pos: 3 },
    ],
  },
  {
    dir: '04-Module-3-Brain',
    files: [
      { name: '01-isaac-sim.mdx', title: 'NVIDIA Isaac Sim Setup', pos: 1 },
      { name: '02-nav2-vslam.mdx', title: 'Navigation2 and Visual SLAM', pos: 2 },
      { name: '03-reinforcement-learning.mdx', title: 'Reinforcement Learning for Robotics', pos: 3 },
    ],
  },
  {
    dir: '05-Module-4-VLA',
    files: [
      { name: '01-whisper-voice.mdx', title: 'Voice Input with Whisper', pos: 1 },
      { name: '02-llm-planning.mdx', title: 'LLM-Based Task Planning', pos: 2 },
      { name: '03-capstone-project.mdx', title: 'Capstone Integration Project', pos: 3 },
    ],
  },
];

const template = (title, pos) => `---
sidebar_position: ${pos}
title: "${title}"
description: "Chapter content coming soon"
---

# ${title}

> 🚧 **Under Construction**: This chapter is currently being developed.

## Overview

This chapter will cover key concepts related to ${title.toLowerCase()}.

## Prerequisites

- Basic understanding of robotics concepts
- Python programming experience (recommended)

## Coming Soon

Detailed content for this chapter will be added in Phase 4 (Content Injection).
`;

modules.forEach((module) => {
  const dir = path.join('docs', module.dir);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  module.files.forEach((file) => {
    const filePath = path.join(dir, file.name);
    fs.writeFileSync(filePath, template(file.title, file.pos));
    console.log(`Created: ${filePath}`);
  });
});

console.log('\n✅ All 15 MDX files created successfully!');
```

**Run Script**:
```bash
node scripts/generate-docs.js
```

**Success Criteria**:
- [ ] All 15 MDX files created with correct frontmatter
- [ ] Files contain placeholder content
- [ ] `sidebar_position` values set correctly (1, 2, 3 per module)
- [ ] Dev server shows files in sidebar (`npm start`)

**PHR Checkpoint**: Log file creation method (manual or scripted)

---

#### Task 2.3: Configure `sidebars.ts` with Explicit Ordering

**Replace `sidebars.ts` Content**:
```typescript
import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: '📘 Introduction',
      collapsible: true,
      collapsed: false, // Keep Introduction expanded by default
      items: [
        '01-Introduction/01-vision',
        '01-Introduction/02-hardware-setup',
        '01-Introduction/03-prerequisites',
      ],
    },
    {
      type: 'category',
      label: '🤖 Module 1: ROS 2 (The Nervous System)',
      collapsible: true,
      collapsed: true,
      items: [
        '02-Module-1-ROS2/01-nodes-topics',
        '02-Module-1-ROS2/02-python-rclpy',
        '02-Module-1-ROS2/03-urdf-humanoids',
      ],
    },
    {
      type: 'category',
      label: '🌐 Module 2: Simulation (The Digital Twin)',
      collapsible: true,
      collapsed: true,
      items: [
        '03-Module-2-Simulation/01-gazebo-physics',
        '03-Module-2-Simulation/02-unity-rendering',
        '03-Module-2-Simulation/03-sensors-lidar',
      ],
    },
    {
      type: 'category',
      label: '🧠 Module 3: NVIDIA Isaac (The Brain)',
      collapsible: true,
      collapsed: true,
      items: [
        '04-Module-3-Brain/01-isaac-sim',
        '04-Module-3-Brain/02-nav2-vslam',
        '04-Module-3-Brain/03-reinforcement-learning',
      ],
    },
    {
      type: 'category',
      label: '🎯 Module 4: VLA (Vision-Language-Action)',
      collapsible: true,
      collapsed: true,
      items: [
        '05-Module-4-VLA/01-whisper-voice',
        '05-Module-4-VLA/02-llm-planning',
        '05-Module-4-VLA/03-capstone-project',
      ],
    },
  ],
};

export default sidebars;
```

**Key Configuration Points**:
- Explicit item paths (no auto-generation)
- Emoji icons for visual distinction (📘🤖🌐🧠🎯)
- Introduction section expanded by default, others collapsed
- Labels include thematic descriptors ("The Nervous System", "The Digital Twin", etc.)

**Verification Commands**:
```bash
npm start
# Open http://localhost:3000/docs/01-Introduction/01-vision
# Verify sidebar shows all 5 categories with correct labels
# Verify numeric ordering preserved (01, 02, 03 visible in URLs)
# Verify Introduction expanded, others collapsed
```

**Success Criteria**:
- [ ] Sidebar displays 5 categories with custom labels
- [ ] Emoji icons visible
- [ ] Introduction expanded by default
- [ ] Clicking category expands/collapses items
- [ ] All 15 pages accessible via sidebar

**PHR Checkpoint**: Log sidebar configuration completion, note any ordering issues

---

## Phase 3: Visual Identity (The "Cyberpunk" Look)

**Objective**: Implement custom cyberpunk theme with neon colors, create landing page with hero header and module grid.

**Duration Estimate**: 4-6 hours  
**Prerequisites**: Phase 2 completed, Tailwind CSS configured

### Tasks

#### Task 3.1: Implement Custom CSS with Neon Variables

**Create/Update `src/css/custom.css`**:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');

/* Root CSS variables for Docusaurus theming */
:root {
  /* Cyberpunk Primary Colors */
  --ifm-color-primary: #00FFD4;
  --ifm-color-primary-dark: #00e6be;
  --ifm-color-primary-darker: #00d9b3;
  --ifm-color-primary-darkest: #00b393;
  --ifm-color-primary-light: #1affdb;
  --ifm-color-primary-lighter: #26ffe0;
  --ifm-color-primary-lightest: #4dffe6;
  
  /* Background and Text */
  --ifm-background-color: #0a0e1a;
  --ifm-font-color-base: #e0e6f0;
  --ifm-heading-color: #ffffff;
  
  /* Code Blocks */
  --ifm-code-background: rgba(0, 128, 255, 0.1);
  --ifm-code-font-size: 95%;
  
  /* Typography */
  --ifm-font-family-base: 'Inter', sans-serif;
  --ifm-font-family-monospace: 'JetBrains Mono', monospace;
  
  /* Navbar */
  --ifm-navbar-background-color: #0a0e1a;
  --ifm-navbar-link-color: #e0e6f0;
  --ifm-navbar-link-hover-color: #00FFD4;
  
  /* Sidebar */
  --ifm-menu-color: #e0e6f0;
  --ifm-menu-color-active: #00FFD4;
  --ifm-menu-color-background-active: rgba(0, 255, 212, 0.1);
}

/* Force dark mode (disable light mode) */
[data-theme='dark'] {
  --ifm-background-color: #0a0e1a;
  --ifm-font-color-base: #e0e6f0;
}

/* Link styling with neon glow */
a {
  color: var(--ifm-color-primary);
  text-decoration: none;
  transition: all 0.3s ease;
}

a:hover {
  color: #1affdb;
  text-shadow: 0 0 8px rgba(0, 255, 212, 0.6);
}

/* Code block styling */
code {
  background-color: rgba(0, 128, 255, 0.1);
  color: #0080FF;
  border: 1px solid rgba(0, 128, 255, 0.3);
  border-radius: 4px;
  padding: 2px 6px;
  font-family: 'JetBrains Mono', monospace;
}

/* Pre blocks (code syntax highlighting) */
pre code {
  background-color: transparent;
  border: none;
  padding: 0;
}

/* Sidebar styling */
.theme-doc-sidebar-container {
  background-color: #0a0e1a;
  border-right: 1px solid rgba(0, 255, 212, 0.2);
}

.menu__link {
  color: #e0e6f0;
  transition: all 0.3s ease;
  border-radius: 4px;
}

.menu__link:hover {
  color: #00FFD4;
  background-color: rgba(0, 255, 212, 0.05);
}

.menu__link--active {
  color: #00FFD4;
  background-color: rgba(0, 255, 212, 0.1);
  border-left: 3px solid #00FFD4;
  font-weight: 600;
}

/* Category labels */
.menu__list-item-collapsible {
  font-weight: 600;
}

/* Callout/Admonition styling */
.admonition {
  border-left: 4px solid;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
  background: rgba(0, 0, 0, 0.3);
}

.admonition-tip {
  border-color: #00FFD4;
  background-color: rgba(0, 255, 212, 0.05);
}

.admonition-warning {
  border-color: #FF006B;
  background-color: rgba(255, 0, 107, 0.05);
}

.admonition-info {
  border-color: #0080FF;
  background-color: rgba(0, 128, 255, 0.05);
}

.admonition-danger {
  border-color: #FF006B;
  background-color: rgba(255, 0, 107, 0.08);
}

/* Button styling */
.button {
  border: 1px solid #00FFD4;
  background: transparent;
  color: #00FFD4;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
}

.button:hover {
  background: rgba(0, 255, 212, 0.1);
  box-shadow: 0 0 10px rgba(0, 255, 212, 0.5);
  color: #00FFD4;
  text-decoration: none;
}

.button--primary {
  background: #00FFD4;
  color: #0a0e1a;
}

.button--primary:hover {
  background: #1affdb;
  box-shadow: 0 0 15px rgba(0, 255, 212, 0.7);
}

/* Navbar styling */
.navbar {
  background-color: #0a0e1a;
  border-bottom: 1px solid rgba(0, 255, 212, 0.2);
  box-shadow: 0 2px 10px rgba(0, 255, 212, 0.1);
}

.navbar__title {
  color: #00FFD4;
  font-weight: 700;
  text-shadow: 0 0 10px rgba(0, 255, 212, 0.3);
  font-size: 1.3rem;
}

.navbar__item {
  font-weight: 500;
}

/* Heading styling with subtle glow */
h1, h2, h3, h4, h5, h6 {
  color: #ffffff;
  font-weight: 600;
}

h1 {
  text-shadow: 0 0 15px rgba(0, 255, 212, 0.2);
  font-size: 2.5rem;
}

h2 {
  border-bottom: 2px solid rgba(0, 255, 212, 0.3);
  padding-bottom: 0.5rem;
}

/* Footer (if enabled) */
.footer {
  background-color: #0a0e1a;
  border-top: 1px solid rgba(0, 255, 212, 0.2);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .navbar__title {
    font-size: 1.1rem;
  }
  
  h1 {
    font-size: 2rem;
  }
}

/* Scrollbar styling (for dark theme) */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #0a0e1a;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 255, 212, 0.3);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 255, 212, 0.5);
}

/* Table styling */
table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1rem;
}

table thead {
  background-color: rgba(0, 255, 212, 0.1);
}

table th,
table td {
  border: 1px solid rgba(0, 255, 212, 0.2);
  padding: 0.75rem;
}

table th {
  color: #00FFD4;
  font-weight: 600;
}

/* Blockquote styling */
blockquote {
  border-left: 4px solid #0080FF;
  background-color: rgba(0, 128, 255, 0.05);
  padding: 1rem;
  margin-left: 0;
  font-style: italic;
  color: #e0e6f0;
}
```

**Update `docusaurus.config.ts`** to reference custom CSS:
```typescript
presets: [
  [
    'classic',
    {
      docs: {
        sidebarPath: './sidebars.ts',
      },
      theme: {
        customCss: './src/css/custom.css', // Ensure this line exists
      },
    },
  ],
],
```

**Verification**:
```bash
npm start
# Check browser:
# - Background is #0a0e1a (dark blue-black)
# - Text is #e0e6f0 (soft white)
# - Links are #00FFD4 (cyan)
# - Code blocks have blue tint
# - Navbar has neon glow on title
```

**Success Criteria**:
- [ ] Dark background (#0a0e1a) applied globally
- [ ] Neon cyan links with hover glow effect
- [ ] Inter font for body text
- [ ] JetBrains Mono font for code blocks
- [ ] Sidebar active page highlighted with cyan
- [ ] No Tailwind reset conflicts with Docusaurus

**PHR Checkpoint**: Log theme implementation completion, note any contrast issues

---

#### Task 3.2: Create Landing Page with Hero Header and Module Grid

**Update `src/pages/index.tsx`**:
```typescript
import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <h1 className={styles.heroTitle}>
          {siteConfig.title}
        </h1>
        <p className={styles.heroSubtitle}>
          {siteConfig.tagline}
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/01-Introduction/01-vision">
            Start Learning 🚀
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/01-Introduction/02-hardware-setup"
            style={{marginLeft: '1rem'}}>
            Setup Guide 🛠️
          </Link>
        </div>
      </div>
    </header>
  );
}

interface ModuleCardProps {
  emoji: string;
  title: string;
  description: string;
  link: string;
}

function ModuleCard({emoji, title, description, link}: ModuleCardProps) {
  return (
    <div className={styles.moduleCard}>
      <div className={styles.moduleEmoji}>{emoji}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link className="button button--outline button--primary" to={link}>
        Explore Module →
      </Link>
    </div>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Home`}
      description="Learn Physical AI and Humanoid Robotics with hands-on tutorials">
      <HomepageHeader />
      <main>
        <section className={styles.modulesSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Curriculum Modules</h2>
            <div className={styles.moduleGrid}>
              <ModuleCard
                emoji="🤖"
                title="Module 1: ROS 2"
                description="Master the nervous system of robots. Learn nodes, topics, and the rclpy Python library."
                link="/docs/02-Module-1-ROS2/01-nodes-topics"
              />
              <ModuleCard
                emoji="🌐"
                title="Module 2: Simulation"
                description="Build digital twins with Gazebo, Unity, and sensor simulation environments."
                link="/docs/03-Module-2-Simulation/01-gazebo-physics"
              />
              <ModuleCard
                emoji="🧠"
                title="Module 3: NVIDIA Isaac"
                description="Harness GPU-accelerated physics and reinforcement learning for intelligent agents."
                link="/docs/04-Module-3-Brain/01-isaac-sim"
              />
              <ModuleCard
                emoji="🎯"
                title="Module 4: VLA"
                description="Integrate Vision-Language-Action models for human-robot interaction."
                link="/docs/05-Module-4-VLA/01-whisper-voice"
              />
            </div>
          </div>
        </section>
        
        <section className={styles.ctaSection}>
          <div className="container">
            <h2>Ready to Build the Future?</h2>
            <p>Join the next generation of robotics developers mastering embodied intelligence.</p>
            <Link
              className="button button--primary button--lg"
              to="/docs/01-Introduction/01-vision">
              Begin Your Journey
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
```

**Create `src/pages/index.module.css`**:
```css
.heroBanner {
  padding: 6rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0a0e1a 0%, #1a1f3a 100%);
}

.heroTitle {
  font-size: 3.5rem;
  font-weight: 700;
  color: #00FFD4;
  text-shadow: 0 0 20px rgba(0, 255, 212, 0.5);
  margin-bottom: 1rem;
}

.heroSubtitle {
  font-size: 1.5rem;
  color: #e0e6f0;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.modulesSection {
  padding: 4rem 0;
  background-color: #0a0e1a;
}

.sectionTitle {
  text-align: center;
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 3rem;
  text-shadow: 0 0 15px rgba(0, 255, 212, 0.2);
}

.moduleGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.moduleCard {
  background: linear-gradient(135deg, rgba(0, 255, 212, 0.05) 0%, rgba(0, 128, 255, 0.05) 100%);
  border: 1px solid rgba(0, 255, 212, 0.2);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
}

.moduleCard:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 255, 212, 0.3);
  border-color: #00FFD4;
}

.moduleEmoji {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.moduleCard h3 {
  color: #00FFD4;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.moduleCard p {
  color: #e0e6f0;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.ctaSection {
  padding: 4rem 0;
  text-align: center;
  background: linear-gradient(135deg, #1a1f3a 0%, #0a0e1a 100%);
}

.ctaSection h2 {
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 1rem;
}

.ctaSection p {
  font-size: 1.2rem;
  color: #e0e6f0;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .heroTitle {
    font-size: 2.5rem;
  }
  
  .heroSubtitle {
    font-size: 1.2rem;
  }
  
  .moduleGrid {
    grid-template-columns: 1fr;
  }
}
```

**Verification**:
```bash
npm start
# Open http://localhost:3000
# Check:
# - Hero section with neon title and gradient background
# - Two CTA buttons ("Start Learning", "Setup Guide")
# - 4 module cards in grid layout
# - Cards have hover effect (lift and glow)
# - Bottom CTA section
```

**Success Criteria**:
- [ ] Landing page renders without errors
- [ ] Hero section with cyberpunk styling
- [ ] 4 module cards with emojis, titles, descriptions
- [ ] All links navigate to correct documentation pages
- [ ] Responsive design (cards stack on mobile)
- [ ] Hover effects on module cards

**PHR Checkpoint**: Log landing page implementation completion

---

#### Task 3.3: Configure `docusaurus.config.ts` for Site Metadata and Navigation

**Update `docusaurus.config.ts`**:
```typescript
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'From Digital to Embodied Intelligence',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://[YOUR-GITHUB-USERNAME].github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/physical-ai-textbook/',

  // GitHub pages deployment config
  organizationName: '[YOUR-GITHUB-USERNAME]',
  projectName: 'physical-ai-textbook',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/[YOUR-GITHUB-USERNAME]/physical-ai-textbook/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Social card for sharing
    image: 'img/social-card.png',
    navbar: {
      title: 'Physical AI',
      logo: {
        alt: 'Physical AI Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/docs/01-Introduction/01-vision',
          label: 'Docs',
          position: 'left',
        },
        {
          to: '/',
          label: 'Modules',
          position: 'left',
        },
        {
          href: 'https://docs.ros.org/en/humble/',
          label: 'API',
          position: 'left',
        },
        {
          href: 'https://github.com/[YOUR-GITHUB-USERNAME]/physical-ai-textbook',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learn',
          items: [
            {
              label: 'Introduction',
              to: '/docs/01-Introduction/01-vision',
            },
            {
              label: 'ROS 2 Basics',
              to: '/docs/02-Module-1-ROS2/01-nodes-topics',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/[YOUR-GITHUB-USERNAME]/physical-ai-textbook/discussions',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/[YOUR-GITHUB-USERNAME]/physical-ai-textbook',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Physical AI Textbook. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.vsDark,
      darkTheme: prismThemes.vsDark, // Force dark theme
      additionalLanguages: ['bash', 'python', 'yaml', 'json'],
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true, // Force dark mode only
      respectPrefersColorScheme: false,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
```

**Key Configuration Points**:
- Replace `[YOUR-GITHUB-USERNAME]` with actual GitHub username
- `baseUrl: '/physical-ai-textbook/'` matches repository name
- Dark mode forced (no light mode toggle)
- Navigation links: Docs, Modules, API (ROS 2 docs), GitHub
- Footer with community links and copyright

**Success Criteria**:
- [ ] Site builds without errors
- [ ] Navbar shows all 4 links ("Docs", "Modules", "API", "GitHub")
- [ ] Footer displays correctly
- [ ] Dark mode cannot be toggled off
- [ ] Prism syntax highlighting uses dark theme

**PHR Checkpoint**: Log docusaurus.config.ts configuration completion

---

## Phase 4: Content Injection (Deferred)

**Objective**: Fill the 15 MDX files with actual Physical AI educational content.

**Status**: This phase is **out of scope** for the initial plan. Placeholder content created in Phase 2 will remain until content authoring begins.

**Future Steps**:
- Write detailed technical content for each chapter
- Add code examples (ROS 2, Python, URDF, RL algorithms)
- Embed Mermaid.js diagrams for architecture visualizations
- Add interactive code playgrounds
- Include video demonstrations and 3D robot visualizations

**PHR Note**: Content injection will be tracked in future PHR logs (PHR-0004+) as content development progresses.

---

## Deployment & CI/CD

**Objective**: Configure GitHub Actions for automated deployment to GitHub Pages.

**Prerequisites**: GitHub repository created, code pushed to main branch

### Task: Create GitHub Actions Workflow

**Create `.github/workflows/deploy.yml`**:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build website
        run: npm run build
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./build

  deploy:
    if: github.ref == 'refs/heads/main'
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**GitHub Repository Settings**:
1. Go to repository **Settings** → **Pages**
2. Set **Source** to "GitHub Actions"
3. Save settings

**Verification**:
```bash
# Push code to GitHub
git add .
git commit -m "feat: initial Docusaurus site with cyberpunk theme"
git push origin main

# Check GitHub Actions tab for workflow run
# Wait for deployment (approximately 3-5 minutes)
# Visit https://[USERNAME].github.io/physical-ai-textbook/
```

**Success Criteria**:
- [ ] `.github/workflows/deploy.yml` created
- [ ] Workflow runs successfully on push to main
- [ ] Site accessible at GitHub Pages URL
- [ ] No build errors in Actions logs
- [ ] All 15 pages accessible on deployed site

**PHR Checkpoint**: Log deployment workflow configuration and first successful deployment

---

## Testing & Validation

### Checklist: Pre-Deployment Validation

#### Phase 1 Validation
- [ ] Docusaurus project initialized with TypeScript
- [ ] Tailwind CSS installed and configured
- [ ] `tailwind.config.js` includes cyberpunk colors
- [ ] `postcss.config.js` created
- [ ] Default boilerplate cleaned up (tutorial docs, blog removed)
- [ ] Site builds without errors: `npm run build`
- [ ] Dev server runs: `npm start`

#### Phase 2 Validation
- [ ] 5 module directories created in `docs/`
- [ ] All 15 MDX files created with frontmatter
- [ ] `sidebar_position` values correct (1, 2, 3 per module)
- [ ] `sidebars.ts` configured with explicit ordering
- [ ] Sidebar displays all 5 categories with emojis
- [ ] Introduction section expanded by default
- [ ] All pages accessible via sidebar navigation

#### Phase 3 Validation
- [ ] `custom.css` implemented with cyberpunk theme
- [ ] Background color #0a0e1a (dark)
- [ ] Text color #e0e6f0 (soft white)
- [ ] Link color #00FFD4 (neon cyan)
- [ ] Hover effects with glow animations
- [ ] Landing page (`index.tsx`) created with hero section
- [ ] 4 module cards displayed in grid
- [ ] All buttons link to correct pages
- [ ] Responsive design works on mobile (375px viewport)
- [ ] `docusaurus.config.ts` configured with site metadata
- [ ] Navbar shows "Docs", "Modules", "API", "GitHub"
- [ ] Footer displays correctly

#### Deployment Validation
- [ ] GitHub Actions workflow created (`.github/workflows/deploy.yml`)
- [ ] Workflow runs successfully on GitHub
- [ ] Site deployed to GitHub Pages
- [ ] All pages accessible on production URL
- [ ] No broken links (404 errors)

### Performance Testing

**Lighthouse Audit** (run after deployment):
```bash
# Install Lighthouse CI (optional)
npm install -g @lhci/cli

# Run audit
lhci autorun --url=https://[USERNAME].github.io/physical-ai-textbook/
```

**Target Scores** (per constitutional requirement):
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

**WCAG Contrast Testing**:
- Use WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Test combinations:
  - #00FFD4 (cyan) on #0a0e1a (background) - should pass 4.5:1
  - #e0e6f0 (body text) on #0a0e1a (background) - should pass 4.5:1
  - #0080FF (code) on #0a0e1a (background) - verify passes 4.5:1

---

## PHR Compliance Checklist

Per constitutional mandate (Principle IV), all major decisions and milestones must be logged in the PHR system.

### PHR-0003 Required Entries

- [x] Plan creation initiated (this document)
- [ ] Phase 1 Task 1.1 completed (Docusaurus initialized)
- [ ] Phase 1 Task 1.2 completed (Tailwind CSS configured)
- [ ] Phase 1 Task 1.3 completed (Boilerplate cleaned)
- [ ] Phase 2 Task 2.1 completed (Directories created)
- [ ] Phase 2 Task 2.2 completed (MDX files created)
- [ ] Phase 2 Task 2.3 completed (Sidebar configured)
- [ ] Phase 3 Task 3.1 completed (Custom CSS implemented)
- [ ] Phase 3 Task 3.2 completed (Landing page created)
- [ ] Phase 3 Task 3.3 completed (docusaurus.config.ts configured)
- [ ] Deployment workflow configured
- [ ] First successful deployment to GitHub Pages
- [ ] Lighthouse audit results documented
- [ ] WCAG contrast validation completed

**PHR Update Frequency**: After each phase completion and major milestone.

---

## Risk Analysis & Mitigation

| Risk | Likelihood | Impact | Mitigation Strategy |
|------|------------|--------|---------------------|
| Tailwind CSS conflicts with Docusaurus styles | Medium | High | Disable Tailwind preflight (`corePlugins: { preflight: false }`), test thoroughly |
| Numeric ordering stripped in sidebar labels | Low | Medium | Use explicit `sidebars.ts` configuration (already planned) |
| Cyberpunk colors fail WCAG contrast | Medium | High | Pre-validate with WebAIM Contrast Checker, adjust brightness if needed |
| GitHub Actions quota exceeded | Low | Low | Monitor build frequency, optimize caching (`cache: npm`) |
| TypeScript errors in MDX files | Medium | Medium | Use minimal frontmatter, avoid complex JSX in MDX content |
| Font loading delays page performance | Medium | Medium | Use `font-display: swap`, preload critical fonts, subset if needed |
| Mobile responsive issues with module grid | Low | Low | Test on 375px viewport, use CSS Grid auto-fit with minmax |
| Broken links after deployment (base URL issues) | Medium | High | Test all navigation links on deployed site, verify `baseUrl` in config |

---

## Success Criteria Summary

### Phase 1 Success
- ✅ Docusaurus 3.x project initialized with TypeScript
- ✅ Tailwind CSS 3.x installed and configured with cyberpunk colors
- ✅ Default boilerplate removed, site builds without errors

### Phase 2 Success
- ✅ 5 module directories and 15 MDX files created with proper frontmatter
- ✅ Sidebar configuration preserves numeric ordering (01, 02, 03)
- ✅ All pages accessible via navigation

### Phase 3 Success
- ✅ Custom CSS implements cyberpunk theme (dark bg, neon accents)
- ✅ Landing page with hero section and 4 module cards
- ✅ Responsive design works on mobile viewports
- ✅ docusaurus.config.ts configured with all navigation links

### Deployment Success
- ✅ GitHub Actions workflow deploys site successfully
- ✅ Site accessible at `https://[USERNAME].github.io/physical-ai-textbook/`
- ✅ Lighthouse scores 90+ across all categories
- ✅ WCAG 2.1 Level AA contrast compliance validated

---

## Next Steps After Plan Completion

1. **Run `/sp.tasks physical-ai-textbook`** - Generate detailed implementation tasks with acceptance criteria
2. **Create GitHub repository** - Initialize with README and LICENSE
3. **Execute Phase 1** - Initialize Docusaurus and Tailwind CSS
4. **Execute Phase 2** - Create content structure
5. **Execute Phase 3** - Implement visual identity
6. **Deploy to GitHub Pages** - Test CI/CD workflow
7. **Conduct accessibility audit** - Validate WCAG compliance
8. **Update PHR-0003** - Log all phase completions and decisions

---

## Appendix: Windows-Specific Commands Reference

### Node.js & npm Commands (Windows CMD/PowerShell)
```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Install dependencies
npm install

# Install dev dependencies
npm install -D [package-name]

# Start dev server
npm start

# Build for production
npm run build

# Serve production build locally
npm run serve
```

### Directory Creation (Windows CMD)
```cmd
# Create single directory
mkdir docs\01-Introduction

# Create nested directories
mkdir docs\01-Introduction\images

# Create multiple directories
mkdir docs\01-Introduction docs\02-Module-1-ROS2 docs\03-Module-2-Simulation
```

### Directory Creation (Windows PowerShell)
```powershell
# Create directory with force (no error if exists)
New-Item -ItemType Directory -Path "docs\01-Introduction" -Force

# Create multiple directories
@("docs\01-Introduction", "docs\02-Module-1-ROS2", "docs\03-Module-2-Simulation") | ForEach-Object {
    New-Item -ItemType Directory -Path $_ -Force
}
```

### File Operations (Windows)
```cmd
# Delete directory and contents (CMD)
rmdir /s /q docs\tutorial-basics

# Delete file (CMD)
del filename.txt

# Copy file (CMD)
copy source.txt destination.txt
```

```powershell
# Delete directory (PowerShell)
Remove-Item -Path "docs\tutorial-basics" -Recurse -Force

# Delete file (PowerShell)
Remove-Item -Path "filename.txt"

# Copy file (PowerShell)
Copy-Item -Path "source.txt" -Destination "destination.txt"
```

---

**Plan Version**: 1.0.0  
**Created**: 2025-12-05  
**Last Updated**: 2025-12-05  
**Next Review**: After Phase 3 completion  
**PHR Log**: PHR-0003 (to be created upon plan finalization)
