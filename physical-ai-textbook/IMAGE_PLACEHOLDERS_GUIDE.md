# Image Placeholders Guide

This document lists all image placeholders used in the Physical AI Textbook website. Replace these placeholder files with your actual images in the `static/img/` directory.

## How to Add Images

1. Place your images in: `physical-ai-textbook/static/img/`
2. Use the exact filenames listed below
3. Recommended dimensions and formats are provided for each image

---

## Required Images

### 1. Hero Section
**File:** `hero-banner.png`
- **Location:** `static/img/hero-banner.png`
- **Used in:** Homepage hero section (main landing area)
- **Recommended size:** 1200x1200px (square aspect ratio)
- **Format:** PNG or JPG
- **Description:** Main hero image showing robotics/humanoid robot - should be high-quality, professional, and visually striking

---

### 2. Module Banners (6 images)

#### Module 1: ROS 2
**File:** `module-ros2-banner.png`
- **Location:** `static/img/module-ros2-banner.png`
- **Recommended size:** 800x450px (16:9 aspect ratio)
- **Description:** ROS 2 logo, nodes/topics diagram, or robot with ROS architecture visualization

#### Module 2: Simulation
**File:** `module-simulation-banner.png`
- **Location:** `static/img/module-simulation-banner.png`
- **Recommended size:** 800x450px (16:9 aspect ratio)
- **Description:** Gazebo or Isaac Sim screenshot, digital twin visualization, or simulated robot environment

#### Module 3: Isaac Brain
**File:** `module-isaac-banner.png`
- **Location:** `static/img/module-isaac-banner.png`
- **Recommended size:** 800x450px (16:9 aspect ratio)
- **Description:** NVIDIA Isaac logo, computer vision pipeline, or robot with perception sensors highlighted

#### Module 4: VLA Models
**File:** `module-vla-banner.png`
- **Location:** `static/img/module-vla-banner.png`
- **Recommended size:** 800x450px (16:9 aspect ratio)
- **Description:** Vision-Language-Action diagram, transformer architecture, or robot executing natural language commands

#### Module 5: Humanoid Design
**File:** `module-humanoid-banner.png`
- **Location:** `static/img/module-humanoid-banner.png`
- **Recommended size:** 800x450px (16:9 aspect ratio)
- **Description:** Bipedal humanoid robot, kinematic chain diagram, or grasping mechanism

#### Module 6: Advanced Control
**File:** `module-advanced-banner.png`
- **Location:** `static/img/module-advanced-banner.png`
- **Recommended size:** 800x450px (16:9 aspect ratio)
- **Description:** Reinforcement learning visualization, neural network training graph, or robot learning diagram

---

## Optional Images (for future enhancement)

### Author Profile
**File:** `author-profile.png`
- **Location:** `static/img/author-profile.png`
- **Recommended size:** 400x400px (square)
- **Description:** Professional photo of Muhammed Ibrahim (if you want to add author bio section)

### Feature Icons (if replacing placeholder icons)
- `feature-ros2-icon.png` - 128x128px
- `feature-simulation-icon.png` - 128x128px
- `feature-isaac-icon.png` - 128x128px
- `feature-vla-icon.png` - 128x128px

---

## Current Status

### ✅ No Images Needed Immediately
The site will function perfectly with placeholder graphics until you add actual images.

### 📸 Priority Images (Add These First)
1. **hero-banner.png** - Most visible, appears first on homepage
2. Module banners (6 files) - Enhance module presentation

### 🎨 Design Tips
- Use consistent visual style across all images
- Prefer high-quality photographs or professional renders
- Ensure good contrast for text overlay (if any)
- Optimize file sizes (compress without losing quality)
- Use PNG for graphics with transparency, JPG for photos

---

## How Images Are Currently Displayed

### Before Adding Images:
- Hero section shows animated robot icon with brown/gold gradient
- Module sections show gradient placeholders with module icons
- Filename is displayed for reference

### After Adding Images:
Simply place images with correct filenames in `static/img/` - no code changes needed!

---

## Quick Setup Commands

```bash
# Navigate to static images directory
cd physical-ai-textbook/static/img/

# Copy your images here with correct names
# Example:
# cp /path/to/your/hero.jpg hero-banner.png
# cp /path/to/your/ros2.jpg module-ros2-banner.png
```

---

## Need Help?

If you need to change image filenames or dimensions:
1. Update filename in `src/components/Homepage/ModulesShowcase.tsx` (line with `imagePlaceholder`)
2. Update filename in `src/components/Homepage/Hero.tsx` (line with hero image comment)
3. Rebuild site: `npm run build`

---

**Note:** All images should be placed in `static/img/` directory. Docusaurus automatically serves files from this directory at `/img/` URL path.
