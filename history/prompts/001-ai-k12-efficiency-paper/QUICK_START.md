# Quick Start Guide: Physical AI Docusaurus Site

## 🚀 Single Command Setup

**Run this one command to automate Phase 0, 1, and 2:**

```cmd
cd E:\Hackathon_AI\hackathon-youtube
setup_physical_ai.bat
```

## ⏱️ What to Expect

- **Execution Time**: 5-10 minutes
- **Automated Tasks**: 48 out of 78 total tasks
- **Phases Automated**: 
  - ✅ Phase 0: Pre-Flight Checks (4 tasks)
  - ✅ Phase 1: Foundation Setup (17 tasks)
  - ✅ Phase 2: Content Architecture (27 tasks)

## 📦 What Gets Created

```
physical-ai-textbook/
├── docs/
│   ├── 01-Introduction/          (3 MDX files)
│   ├── 02-Module-1-ROS2/         (3 MDX files)
│   ├── 03-Module-2-Simulation/   (3 MDX files)
│   ├── 04-Module-3-Brain/        (3 MDX files)
│   └── 05-Module-4-VLA/          (3 MDX files)
├── src/
│   └── css/
│       └── custom.css
├── static/
├── docusaurus.config.ts
├── sidebars.ts                    (Configured with 5 modules)
├── tailwind.config.js             (Cyberpunk colors)
├── postcss.config.js
├── tsconfig.json
└── package.json
```

## ✅ After Script Completes

### Test Dev Server
```cmd
cd physical-ai-textbook
npm start
```
**Expected**: Browser opens at `http://localhost:3000` with your site

### Test Build
```cmd
npm run build
```
**Expected**: Build completes without errors, `build/` directory created

## 🛑 CHECKPOINT 1: Phase 1 & 2 Validation

Before proceeding to Phase 3, verify:

- [ ] Docusaurus 3.x project initialized with TypeScript
- [ ] Tailwind CSS installed and configured with cyberpunk colors
- [ ] `postcss.config.js` created
- [ ] `tailwind.config.js` updated with custom theme
- [ ] Default tutorial docs removed
- [ ] Blog directory removed
- [ ] All 5 module directories created
- [ ] All 15 MDX files created with proper frontmatter
- [ ] `sidebars.ts` configured with explicit ordering
- [ ] `npm run build` completes without errors
- [ ] `npm start` launches dev server successfully

## 📋 Next Steps

After CHECKPOINT 1 validation passes:

1. **Phase 3: Visual Identity** (17 tasks - Manual)
   - Implement `src/css/custom.css` with full cyberpunk theme
   - Create landing page with hero and module grid
   - Configure site metadata

2. **Phase 4: Deployment** (11 tasks - Manual)
   - Set up GitHub repository
   - Configure GitHub Actions
   - Deploy to GitHub Pages

3. **Phase 5: QA & Validation** (7 tasks - Manual)
   - Lighthouse audit
   - WCAG contrast validation
   - Cross-browser testing

## 🆘 Troubleshooting

### "Node.js is not installed"
- Install Node.js 18.x or 20.x from https://nodejs.org/

### "npm install failed"
- Try: `npm install --legacy-peer-deps`
- Clear cache: `npm cache clean --force`

### "Docusaurus initialization failed"
- Check internet connection
- Ensure you have write permissions in the directory

### Script hangs at npm install
- This is normal! npm install can take 1-2 minutes
- Wait for completion

## 📖 Documentation

- **Constitution**: `.specify/memory/physical-ai-robotics-constitution.md`
- **Specification**: `physical-ai-textbook-spec.md`
- **Implementation Plan**: `physical-ai-plan.md`
- **Tasks Checklist**: `physical-ai-tasks.md`
- **PHR Log**: PHR-0004 in `E:\Hackathon_AI\`

## 🎯 Success Indicators

After running the script, you should see:

```
============================================================================
SETUP COMPLETE!
============================================================================

Summary:
  - Phase 0: Pre-flight checks PASSED
  - Phase 1: Docusaurus initialized with TypeScript
  - Phase 1: Tailwind CSS installed and configured
  - Phase 1: Default boilerplate cleaned
  - Phase 2: 5 module directories created
  - Phase 2: 15 MDX placeholder files created
  - Phase 2: Sidebar navigation configured

Next Steps:
  1. Review the generated files
  2. Test the dev server: npm start
  3. Test the build: npm run build
  4. Proceed to Phase 3 (Visual Identity) when ready

Project location: E:\Hackathon_AI\hackathon-youtube\physical-ai-textbook
============================================================================
```

---

**Created**: 2025-12-05  
**PHR Reference**: PHR-0004  
**Script Version**: 1.0.0
