# Home Page UI Files - Complete Documentation

## 📋 Overview

This document contains **all the files that control the Home Page UI** for the Physical AI & Humanoid Robotics textbook. These are the **ONLY files** you need to edit if you want to modify the appearance, layout, styling, or functionality of the main landing page.

---

## 🗂️ File Structure Map

```
src/
├── pages/
│   └── index.tsx                          ← MAIN HOME PAGE ENTRY POINT
├── components/
│   └── Homepage/
│       ├── Hero.tsx                       ← Dark Navy Hero Section
│       ├── WhyThisTextbook.tsx            ← 3-Column Feature Grid
│       ├── ModulesShowcase.tsx            ← 2x2 Module Grid (with Capstone)
│       ├── Vision.tsx                     ← Vision/Inspiration Section
│       ├── Features.tsx                   ← Core Modules Display
│       └── Analysis.tsx                   ← Fields & Pros/Cons (Optional)
└── css/
    └── custom.css                         ← GLOBAL THEME & STYLING SYSTEM
```

---

## 📁 File #1: HOME PAGE ENTRY POINT

### **Filename:** `src/pages/index.tsx`

```tsx
import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Hero from '../components/Homepage/Hero';
import WhyThisTextbook from '../components/Homepage/WhyThisTextbook';
import ModulesShowcase from '../components/Homepage/ModulesShowcase';
import Vision from '../components/Homepage/Vision';
import Features from '../components/Homepage/Features';

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`Home | ${siteConfig.title}`}
      description="ISI-Standard textbook for Physical AI - Master ROS 2, Simulation, Isaac Brain, VLA Models, and Humanoid Design">

      <main>
        <Hero />
        <WhyThisTextbook />
        <ModulesShowcase />
        <Vision />
        <Features />
      </main>

    </Layout>
  );
}
```

**Purpose:** This is the **main entry point** for the home page. It:
- Imports all homepage components
- Controls the **order** in which sections appear
- Manages page metadata (title, description)
- Wraps content in Docusaurus Layout component

**Edit this file if:** You want to add/remove sections, change section order, or modify page metadata.

---

## 📁 File #2: HERO SECTION (Dark Navy Banner)

### **Filename:** `src/components/Homepage/Hero.tsx`

```tsx
import React from 'react';
import Link from '@docusaurus/Link';

export default function Hero(): JSX.Element {
    return (
        <section className="relative py-32 md:py-48 lg:py-56 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-40 -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl opacity-40 -z-10" />

            <div className="container mx-auto px-6 sm:px-8 lg:px-12">
                <div className="max-w-5xl mx-auto text-center">
                    {/* Main Headline */}
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight text-white mb-8 tracking-tight">
                        Physical AI &<br /> Humanoid Robotics<br /> <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Textbook</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-12 leading-relaxed font-normal">
                        The future belongs to physical AI, embodied intelligence, and humanoid robotics.
                    </p>

                    {/* CTA Button */}
                    <Link
                        to="/docs/01-Introduction"
                        className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-lg"
                    >
                        Start Reading →
                    </Link>
                </div>
            </div>
        </section>
    );
}
```

**Purpose:** Creates the **first visual impression** of the home page:
- Dark navy gradient background
- Large white headline with gradient accent on "Textbook"
- Subtitle explaining the textbook's vision
- Blue pill-shaped call-to-action button
- Decorative background blur elements

**Edit this file if:** You want to change the headline text, background colors, button text/link, or layout.

---

## 📁 File #3: WHY THIS TEXTBOOK (3-Column Features)

### **Filename:** `src/components/Homepage/WhyThisTextbook.tsx`

```tsx
import React from 'react';
import { FaRobot, FaCode, FaIndustry } from 'react-icons/fa';

export default function WhyThisTextbook(): JSX.Element {
    const features = [
        {
            icon: <FaRobot className="text-3xl" />,
            title: 'AI-Driven Design',
            description: 'Built around modern robotics workflows. Learn the exact systems used in industry-leading robots.',
            color: 'from-blue-500 to-blue-600'
        },
        {
            icon: <FaCode className="text-3xl" />,
            title: 'Hands-On Learning',
            description: 'Practical steps, simulations, and code. Every concept is reinforced with real working examples.',
            color: 'from-cyan-500 to-cyan-600'
        },
        {
            icon: <FaIndustry className="text-3xl" />,
            title: 'Industry-Inspired',
            description: 'Content reflects Tesla Optimus, Figure AI, Boston Dynamics. Learn what\'s actually being built.',
            color: 'from-indigo-500 to-indigo-600'
        }
    ];

    return (
        <section className="py-20 md:py-28 lg:py-32 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-6 sm:px-8 lg:px-12">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
                            Why This Textbook?
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Designed for the next generation of roboticists. Built with industry standards. Ready for real-world deployment.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                            >
                                {/* Icon */}
                                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-br ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                    {feature.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
```

**Purpose:** Displays **3 key differentiators** of the textbook:
- AI-Driven Design (blue icons)
- Hands-On Learning (cyan icons)
- Industry-Inspired (indigo icons)
- Interactive cards with hover effects
- Gradient icons that scale on hover

**Edit this file if:** You want to add/remove features, change feature titles/descriptions, or modify colors.

---

## 📁 File #4: MODULES SHOWCASE (2x2 Grid + Capstone)

### **Filename:** `src/components/Homepage/ModulesShowcase.tsx`

```tsx
import React from 'react';
import Link from '@docusaurus/Link';
import { FaCogs, FaVrCardboard, FaBrain, FaHandSparkles } from 'react-icons/fa';

const modules = [
  {
    id: 'ros2',
    title: 'The Robotic Nervous System',
    subtitle: 'ROS 2',
    icon: <FaCogs className="text-5xl" />,
    focus: 'Middleware for robot control.',
    color: 'from-blue-600 to-blue-500',
    description:
      'Master Robot Operating System 2 – the industry-standard middleware for modern robotics. Build distributed applications with real-time communication and modular architecture.',
    link: '/docs/02-Module-1-ROS2/nodes-topics',
  },
  {
    id: 'simulation',
    title: 'The Digital Twin',
    subtitle: 'Gazebo & Unity',
    icon: <FaVrCardboard className="text-5xl" />,
    focus: 'Physics simulation and environment building.',
    color: 'from-teal-600 to-teal-500',
    description:
      'Leverage high-fidelity physics simulation for rapid prototyping. Train robots in virtual environments before real-world deployment.',
    link: '/docs/03-Module-2-Simulation/gazebo-physics',
  },
  {
    id: 'isaac',
    title: 'The AI-Robot Brain',
    subtitle: 'NVIDIA Isaac™',
    icon: <FaBrain className="text-5xl" />,
    focus: 'Advanced perception and training.',
    color: 'from-cyan-600 to-cyan-500',
    description:
      'Harness GPU-accelerated AI for perception, navigation, and decision-making. Process sensor data at 30+ FPS with state-of-the-art deep learning.',
    link: '/docs/04-Module-3-Brain/isaac-sim',
  },
  {
    id: 'vla',
    title: 'Vision-Language-Action',
    subtitle: 'VLA Models',
    icon: <FaHandSparkles className="text-5xl" />,
    focus: 'The convergence of LLMs and Robotics.',
    color: 'from-indigo-600 to-indigo-500',
    description:
      'Build robots that understand natural language commands. Deploy transformer-based models for general-purpose manipulation.',
    link: '/docs/05-Module-4-VLA/voice-to-action',
  },
];

export default function ModulesShowcase(): JSX.Element {
  return (
    <section className="py-20 md:py-28 lg:py-36 bg-slate-100 dark:bg-slate-800">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
              Four Core Modules
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              A complete curriculum from robot control to autonomous decision-making. Each module
              builds on the last.
            </p>
          </div>

          {/* 4-Module Grid - 2x2 on Desktop, Stack on Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-20">
            {modules.map((module) => (
              <div
                key={module.id}
                className="group relative overflow-hidden rounded-2xl transition-all duration-300 bg-white dark:bg-slate-700 shadow-lg hover:shadow-xl hover:-translate-y-2"
              >
                {/* Content */}
                <div className="p-8 md:p-10 flex flex-col h-full">
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-br ${module.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md`}
                  >
                    {module.icon}
                  </div>

                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 mb-4 w-fit">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-600 px-3 py-1 rounded-full">
                      {module.subtitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {module.title}
                  </h3>

                  {/* Focus */}
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold italic mb-4">
                    {module.focus}
                  </p>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8 flex-grow">
                    {module.description}
                  </p>

                  {/* Button */}
                  <Link
                    to={module.link}
                    className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Open Module →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Capstone Project Teaser */}
          <div className="mt-20 p-12 lg:p-16 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200/50 dark:border-blue-800/50 rounded-2xl shadow-lg">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-6">
                  Capstone Project
                </h3>
                <p className="text-lg text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
                  <span className="font-bold text-slate-900 dark:text-white">
                    The Autonomous Humanoid
                  </span>{' '}
                  – Integrate all four modules into a complete, production-ready humanoid robot
                  system. From control to perception to autonomous decision-making.
                </p>
                <Link
                  to="/docs/06-Appendices"
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Capstone →
                </Link>
              </div>
              <div className="text-center">
                <div className="text-9xl md:text-8xl">🦾</div>
                <p className="text-slate-600 dark:text-slate-400 mt-6 font-semibold text-lg">
                  Bring it all together
                </p>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-20">
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-8 font-semibold">
              Ready to master the complete stack?
            </p>
            <Link
              to="/docs/01-Introduction"
              className="inline-flex items-center justify-center px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
            >
              Start Reading →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Purpose:** Displays the **4 core modules** of the textbook:
- ROS 2 (Robotic Nervous System)
- Simulation (Digital Twin)
- Isaac Brain (AI-Robot Brain)
- VLA Models (Vision-Language-Action)
- Plus Capstone Project teaser
- 2x2 grid layout on desktop, 1 column on mobile
- Each card has solid blue "Open Module →" button

**Edit this file if:** You want to add/remove modules, change module titles/descriptions, update links, or modify the capstone section.

---

## 📁 File #5: VISION SECTION

### **Filename:** `src/components/Homepage/Vision.tsx`

```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb, FaRocket, FaGlobeAmericas } from 'react-icons/fa';

const features = [
    {
        icon: <FaLightbulb className="text-3xl text-amber-600 dark:text-amber-400" />,
        title: "Why This Book?",
        description: "Traditional AI is trapped in screens. This book was created to break that barrier, teaching you how to deploy intelligence into physical machines that can interact with the real world."
    },
    {
        icon: <FaRocket className="text-3xl text-orange-600 dark:text-orange-400" />,
        title: "Future Growth",
        description: "The market for humanoid robotics is projected to reach trillions. We are at the 'iPhone moment' of robotics. This content prepares you for the massive industry shift towards embodied AI."
    },
    {
        icon: <FaGlobeAmericas className="text-3xl text-amber-700 dark:text-amber-500" />,
        title: "Global Impact",
        description: "From elderly care to hazardous exploration, Physical AI will redefine labor and assistance. Understanding these systems is the key to shaping the future of human-robot interaction."
    }
];

export default function Vision() {
    return (
        <section className="py-24 relative overflow-hidden bg-white dark:bg-stone-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-stone-900 dark:text-stone-50">The Vision</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-orange-600 mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.2 }}
                            viewport={{ once: true }}
                            className="glass-card p-8 text-center hover:shadow-xl transition-all duration-300"
                        >
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center backdrop-blur-md border border-amber-200 dark:border-amber-800">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-stone-800 dark:text-stone-100">{feature.title}</h3>
                            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 glass-card p-10 md:p-16 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent opacity-50" />
                    <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-3xl font-bold mb-6 text-stone-900 dark:text-stone-50">What is this Book?</h3>
                            <p className="text-stone-700 dark:text-stone-300 mb-6 text-lg">
                                This is not just a textbook; it's a <span className="text-amber-700 dark:text-amber-400 font-semibold">blueprint for the future</span>.
                                It is a living document that bridges the gap between high-level AI research (LLMs, VLA) and low-level robotic control (ROS2, Hardware).
                            </p>
                            <p className="text-stone-700 dark:text-stone-300 text-lg">
                                We cover the full stack: from assembling servos and sensors to training reinforcement learning policies and deploying Vision-Language-Action models.
                            </p>
                        </div>
                        <div className="relative">
                            {/* Decorative visual */}
                            <div className="aspect-video rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-stone-800 dark:to-amber-900/30 border border-amber-200 dark:border-amber-800 flex items-center justify-center shadow-lg">
                                <span className="text-6xl">📚 + 🤖</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
```

**Purpose:** Communicates the **vision and value** of the textbook:
- 3 amber/orange-themed cards: Why This Book, Future Growth, Global Impact
- "What is this Book?" section with full-stack curriculum explanation
- Animated cards with staggered entrance
- Decorative emoji visual (📚 + 🤖)

**Edit this file if:** You want to change the vision messaging, update feature descriptions, or modify colors.

---

## 📁 File #6: FEATURES/CORE MODULES SECTION

### **Filename:** `src/components/Homepage/Features.tsx`

```tsx
import React from 'react';
import Link from '@docusaurus/Link';
import { motion } from 'framer-motion';
import { FaCogs, FaVrCardboard, FaBrain, FaHandSparkles } from 'react-icons/fa';

const modules = [
    {
        title: 'Module 1: ROS2 & Hardware',
        icon: <FaCogs />,
        description: 'Master the Robot Operating System (ROS2), nodes, topics, and interface with real actuators and sensors.',
        link: '/docs/Module-1-ROS2/nodes-topics',
        color: 'from-amber-600 to-orange-600'
    },
    {
        title: 'Module 2: Simulation',
        icon: <FaVrCardboard />,
        description: 'Build digital twins in Gazebo and Isaac Sim. Test your code safely before deploying to the real world.',
        link: '/docs/Module-2-Simulation/gazebo-physics',
        color: 'from-orange-600 to-red-600'
    },
    {
        title: 'Module 3: The Brain',
        icon: <FaBrain />,
        description: 'Implement Navigation (Nav2), SLAM, and Reinforcement Learning for autonomous decision making.',
        link: '/docs/Module-3-Brain/isaac-sim',
        color: 'from-red-600 to-pink-600'
    },
    {
        title: 'Module 4: VLA & Cognition',
        icon: <FaHandSparkles />,
        description: 'Vision-Language-Action models. Teach robots to understand natural language and manipulate objects.',
        link: '/docs/Module-4-VLA/voice-to-action',
        color: 'from-pink-600 to-purple-600'
    }
];

export default function Features() {
    return (
        <section className="py-20 bg-stone-100 dark:bg-stone-800">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-amber-700 dark:text-amber-400 font-bold tracking-wider uppercase text-sm">Curriculum</span>
                    <h2 className="text-4xl font-bold mt-2 text-stone-900 dark:text-stone-50">Core Modules</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {modules.map((module, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -10 }}
                            className="glass-card overflow-hidden group relative"
                        >
                            <div className={`h-2 w-full bg-gradient-to-r ${module.color}`} />
                            <div className="p-6">
                                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center text-white text-2xl mb-4 shadow-lg`}>
                                    {module.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-stone-800 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                                    {module.title}
                                </h3>
                                <p className="text-stone-600 dark:text-stone-400 text-sm mb-6 min-h-[80px]">
                                    {module.description}
                                </p>
                                <Link
                                    to={module.link}
                                    className="inline-flex items-center text-sm font-bold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 transition-colors"
                                >
                                    Start Module →
                                </Link>
                            </div>
                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
```

**Purpose:** Displays the **4 core modules** as **featured cards**:
- Compact 4-column layout (2 on tablet, 1 on mobile)
- Gradient top border for each card (amber→orange→red→pink)
- Hover lift animation
- "Start Module →" links
- Amber/orange color theme

**Edit this file if:** You want to add/remove modules, change descriptions, or update the color gradients.

---

## 📁 File #7: GLOBAL THEME & STYLING

### **Filename:** `src/css/custom.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* =============================================================================
   HIGH-CONTRAST PROFESSIONAL THEME
   Dark Hero + Clean Light Content
   ============================================================================= */

:root {
  /* Core Colors - Professional Blue */
  --ifm-color-primary: #2563eb;
  --ifm-color-primary-dark: #1d4ed8;
  --ifm-color-primary-darker: #1e40af;
  --ifm-color-primary-darkest: #1e3a8a;
  --ifm-color-primary-light: #3b82f6;
  --ifm-color-primary-lighter: #60a5fa;
  --ifm-color-primary-lightest: #93c5fd;

  /* Light Mode Colors */
  --site-bg-color: #ffffff;
  --site-bg-secondary: #f8fafc;
  --site-card-bg: #ffffff;
  --site-text-color: #334155;
  --site-text-secondary: #64748b;
  --site-heading-color: #0f172a;

  /* Accents */
  --accent-blue: #2563eb;
  --accent-blue-light: #3b82f6;
  --accent-cyan: #06b6d4;

  /* Borders & Shadows */
  --border-subtle: 1px solid #e2e8f0;
  --shadow-subtle: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-medium: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
  --shadow-large: 0 12px 24px 0 rgba(0, 0, 0, 0.15);

  /* Typography */
  --ifm-font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue',
    sans-serif;
  --ifm-heading-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  --ifm-font-size-base: 16px;
  --ifm-line-height-base: 1.6;
}

/* Dark Mode */
[data-theme='dark'] {
  --site-bg-color: #1e293b;
  --site-bg-secondary: #0f172a;
  --site-card-bg: #334155;
  --site-text-color: #f1f5f9;
  --site-text-secondary: #cbd5e1;
  --site-heading-color: #f8fafc;

  --border-subtle: 1px solid #475569;
  --shadow-subtle: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow-medium: 0 4px 12px 0 rgba(0, 0, 0, 0.4);
  --shadow-large: 0 12px 24px 0 rgba(0, 0, 0, 0.5);

  --ifm-background-color: var(--site-bg-color);
  --ifm-font-color-base: var(--site-text-color);
  --ifm-heading-color: var(--site-heading-color);
  --ifm-navbar-background-color: rgba(15, 23, 42, 0.95);
  --ifm-footer-background-color: #0f172a;
}

/* Light Mode */
[data-theme='light'] {
  --ifm-background-color: var(--site-bg-color);
  --ifm-font-color-base: var(--site-text-color);
  --ifm-heading-color: var(--site-heading-color);
  --ifm-navbar-background-color: rgba(248, 250, 252, 0.95);
  --ifm-footer-background-color: #f1f5f9;
}

/* =============================================================================
   GLOBAL STYLES
   ============================================================================= */

body {
  background-color: var(--site-bg-color);
  color: var(--site-text-color);
  transition: background-color 0.2s ease;
  font-feature-settings: 'kern' 1;
}

/* Typography Scale */
h1,
h2,
h3,
h4,
h5,
h6 {
  letter-spacing: -0.02em;
  font-weight: 700;
  color: var(--site-heading-color);
  line-height: 1.25;
  margin-top: 0;
}

h1 {
  font-size: 3rem;
}

h2 {
  font-size: 2rem;
}

h3 {
  font-size: 1.5rem;
}

h4 {
  font-size: 1.25rem;
}

h5 {
  font-size: 1.125rem;
}

h6 {
  font-size: 1rem;
}

p {
  color: var(--site-text-color);
  line-height: 1.6;
}

/* Container & Max-Width */
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
}

.container-max {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.25rem;
  }
}

/* =============================================================================
   NAVBAR STYLING
   ============================================================================= */

.navbar {
  backdrop-filter: blur(12px);
  border-bottom: var(--border-subtle);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.navbar__title {
  font-weight: 700;
  color: var(--site-heading-color);
  font-size: 1.125rem;
}

/* =============================================================================
   CARDS & GLASS EFFECT
   ============================================================================= */

.glass-card {
  background: var(--site-card-bg);
  border: var(--border-subtle);
  border-radius: 14px;
  box-shadow: var(--shadow-subtle);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.glass-card:hover {
  box-shadow: var(--shadow-large);
  border-color: var(--accent-blue);
  transform: translateY(-4px);
}

.card {
  background: var(--site-card-bg);
  border: var(--border-subtle);
  border-radius: 14px;
  padding: 32px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  box-shadow: var(--shadow-large);
  border-color: var(--accent-blue);
  transform: translateY(-4px);
}

/* =============================================================================
   BUTTONS
   ============================================================================= */

/* Generic button (compatible with Docusaurus .button) */
.button {
  display: inline-block;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  text-decoration: none;
  padding: 12px 24px;
}

/* Primary button override */
.button--primary {
  background-color: var(--accent-blue);
  color: white;
}

.button--primary:hover {
  background-color: var(--ifm-color-primary-dark);
  text-decoration: none;
}

/* Premium gradient buttons (for hero/cta) */
.button--premium {
  background: linear-gradient(135deg, var(--accent-blue) 0%, #2563eb 100%);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 14px 28px;
  font-weight: 700;
  font-size: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
}

.button--premium:hover {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
  color: white;
  text-decoration: none;
}

.button--premium:active {
  transform: translateY(0);
}

.button--secondary {
  background: transparent;
  border: 2px solid var(--site-text-secondary);
  color: var(--site-heading-color);
  border-radius: 10px;
  padding: 12px 26px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.button--secondary:hover {
  border-color: var(--accent-blue);
  color: var(--accent-blue);
  background: rgba(59, 130, 246, 0.05);
}

/* =============================================================================
   MODULE CARDS & GRIDS
   ============================================================================= */

.module-card {
  background: var(--site-card-bg);
  border: var(--border-subtle);
  border-radius: 14px;
  padding: 32px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.module-card:hover {
  box-shadow: var(--shadow-large);
  border-color: var(--accent-blue);
  transform: translateY(-6px);
}

.module-icon {
  width: 64px;
  height: 64px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  background: linear-gradient(135deg, var(--accent-blue) 0%, #2563eb 100%);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 32px;
  color: white;
}

.module-card:hover .module-icon {
  transform: scale(1.12) rotate(6deg);
  box-shadow: 0 10px 28px rgba(59, 130, 246, 0.4);
}

/* Module Grid - Responsive */
.module-grid-4col {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;
}

@media (max-width: 1200px) {
  .module-grid-4col {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .module-grid-4col {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  margin-top: 48px;
}

/* =============================================================================
   SECTION SPACING & CONTAINERS
   ============================================================================= */

section {
  padding: 72px 0;
}

@media (max-width: 768px) {
  section {
    padding: 48px 0;
  }
}

.section-header {
  text-align: center;
  margin-bottom: 56px;
}

.section-header h2 {
  margin-bottom: 16px;
  font-size: 2.5rem;
}

.section-header p {
  font-size: 1.125rem;
  color: var(--site-text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

/* =============================================================================
   HERO SECTION
   ============================================================================= */

.hero-text-gradient {
  background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.homepage-hero {
  position: relative;
  overflow: hidden;
}

.homepage-hero::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.08), transparent);
  border-radius: 50%;
  filter: blur(60px);
}

.homepage-hero::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(6, 182, 212, 0.08), transparent);
  border-radius: 50%;
  filter: blur(60px);
}

/* =============================================================================
   ANIMATIONS
   ============================================================================= */

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-24px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse-subtle {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.7;
  }
}

.fade-in {
  animation: fadeIn 0.4s ease-out;
}

.slide-up {
  animation: slideUp 0.5s ease-out;
}

.slide-in-left {
  animation: slideInLeft 0.5s ease-out;
}

/* =============================================================================
   FOOTER & UTILITIES
   ============================================================================= */

.footer {
  background: var(--ifm-footer-background-color);
  border-top: var(--border-subtle);
  padding: 48px 0 32px;
}

.footer__title {
  color: var(--accent-blue);
  font-weight: 600;
}

/* Images */
.hero-image,
.module-image,
.feature-image {
  border-radius: 14px;
  box-shadow: var(--shadow-large);
}

/* Professional Badge */
.badge-pro {
  background: linear-gradient(135deg, var(--accent-blue) 0%, #2563eb 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  display: inline-block;
}

/* Links */
a {
  transition: color 0.2s ease;
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(107, 114, 128, 0.3);
  border-radius: 4px;
  transition: background 0.2s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(107, 114, 128, 0.6);
}

[data-theme='dark'] ::-webkit-scrollbar-thumb {
  background: rgba(107, 114, 128, 0.2);
}

[data-theme='dark'] ::-webkit-scrollbar-thumb:hover {
  background: rgba(107, 114, 128, 0.5);
}

/* Chat Panel - Smooth Scrolling */
.premium-chat-panel {
  scroll-behavior: smooth;
}

.premium-chat-panel > div:first-of-type {
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

/* =============================================================================
   ACCESSIBILITY & UTILITY CLASSES
   ============================================================================= */

.text-muted {
  color: var(--site-text-secondary);
}

.text-bold {
  font-weight: 700;
}

.text-center {
  text-align: center;
}

.mt-lg {
  margin-top: 48px;
}

.mb-lg {
  margin-bottom: 48px;
}

.px-container {
  padding-left: 24px;
  padding-right: 24px;
}

@media (max-width: 768px) {
  .px-container {
    padding-left: 16px;
    padding-right: 16px;
  }
}
```

**Purpose:** **Global theme and styling system** that:
- Defines CSS variables for colors, shadows, typography
- Supports dark/light mode switching
- Provides reusable card, button, and grid styles
- Includes animations and hover effects
- Sets responsive breakpoints
- Manages navbar, footer, and scrollbar styling

**Edit this file if:** You want to change colors, shadows, typography scales, or add new global styles.

---

## 📁 File #8 (Optional): ANALYSIS SECTION

### **Filename:** `src/components/Homepage/Analysis.tsx`

This file is **NOT currently used** on the home page, but it's available if you want to add a "Fields of Application" and "Pros/Cons" section. The code is in `src/components/Homepage/Analysis.tsx` if needed in the future.

---

## 📊 File Dependency Tree

```
Home Page (src/pages/index.tsx)
├── Layout Wrapper
├── Hero.tsx
│   └── Imports: @docusaurus/Link
├── WhyThisTextbook.tsx
│   └── Imports: react-icons/fa (FaRobot, FaCode, FaIndustry)
├── ModulesShowcase.tsx
│   ├── Imports: @docusaurus/Link
│   └── Imports: react-icons/fa (FaCogs, FaVrCardboard, FaBrain, FaHandSparkles)
├── Vision.tsx
│   ├── Imports: framer-motion
│   └── Imports: react-icons/fa (FaLightbulb, FaRocket, FaGlobeAmericas)
├── Features.tsx
│   ├── Imports: @docusaurus/Link
│   ├── Imports: framer-motion
│   └── Imports: react-icons/fa (FaCogs, FaVrCardboard, FaBrain, FaHandSparkles)
└── Global Styling
    └── src/css/custom.css
        └── Imports: @tailwind base/components/utilities
```

---

## 🎨 Design System Summary

### **Color Palette**
| Purpose | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Primary | #2563eb (Blue) | #2563eb (Blue) |
| Background | #ffffff (White) | #1e293b (Dark Slate) |
| Cards | #ffffff (White) | #334155 (Slate) |
| Text | #334155 (Dark Gray) | #f1f5f9 (Light Gray) |
| Headings | #0f172a (Very Dark) | #f8fafc (White) |
| Accents | Cyan (#06b6d4), Amber (#d97706) | Same |

### **Typography**
- **H1:** 3rem (responsive to 2rem on mobile)
- **H2:** 2rem (responsive to 1.5rem on mobile)
- **H3:** 1.5rem
- **Body:** 16px, 1.6 line-height
- **Font:** System fonts (SF Pro, Segoe UI, Helvetica Neue)

### **Spacing**
- **Sections:** 72px padding (48px on mobile)
- **Cards:** 32px padding
- **Gaps:** 8px, 16px, 24px, 32px

### **Responsive Breakpoints**
- **Mobile:** < 640px (1 column layouts)
- **Tablet:** 768px - 1024px (2 columns)
- **Desktop:** > 1024px (2-4 columns depending on section)

---

## ✅ QUICK REFERENCE: What to Edit

| Need to Change... | Edit This File |
|------------------|----------------|
| Add/remove page sections | `src/pages/index.tsx` |
| Change hero headline/button | `src/components/Homepage/Hero.tsx` |
| Update "Why This Textbook" section | `src/components/Homepage/WhyThisTextbook.tsx` |
| Modify module cards or grid | `src/components/Homepage/ModulesShowcase.tsx` |
| Edit vision/inspiration messaging | `src/components/Homepage/Vision.tsx` |
| Update feature cards display | `src/components/Homepage/Features.tsx` |
| Change colors, spacing, shadows globally | `src/css/custom.css` |

---

## 🚀 Next Steps

To test your changes locally:
```bash
npm run serve
```

To build for production:
```bash
npm run build
```

All home page UI changes are **completely isolated** from backend code (`api.py`) and documentation content (`docs/` folder).

---

**Document Last Updated:** December 7, 2025
**Total Files Documented:** 7 (+ 1 optional)
**Total Lines of Code:** ~2,000+ lines
