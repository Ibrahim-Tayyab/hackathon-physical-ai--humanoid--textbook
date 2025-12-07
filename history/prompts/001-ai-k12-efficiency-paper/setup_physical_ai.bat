@echo off
REM ============================================================================
REM Physical AI & Humanoid Robotics Docusaurus Site - Automated Setup
REM ============================================================================
REM This script automates Phase 0, Phase 1, and Phase 2 of the implementation
REM Created: 2025-12-05
REM PHR Reference: PHR-0004
REM ============================================================================

echo.
echo ============================================================================
echo Physical AI Docusaurus Site - Automated Setup
echo ============================================================================
echo.
echo This script will:
echo   - Verify Node.js and npm (Phase 0)
echo   - Initialize Docusaurus with TypeScript (Phase 1)
echo   - Install and configure Tailwind CSS (Phase 1)
echo   - Create 5 module directories (Phase 2)
echo   - Generate 15 placeholder MDX files (Phase 2)
echo   - Configure sidebar navigation (Phase 2)
echo.
echo Estimated time: 5-10 minutes
echo.
pause

REM ============================================================================
REM PHASE 0: PRE-FLIGHT CHECKS
REM ============================================================================

echo.
echo ============================================================================
echo PHASE 0: PRE-FLIGHT CHECKS
echo ============================================================================
echo.

REM Task T000: Verify Node.js installation
echo [T000] Verifying Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js 18.x or 20.x from https://nodejs.org/
    pause
    exit /b 1
)
echo [T000] PASS: Node.js is installed
node --version
echo.

REM Task T001: Verify npm installation
echo [T001] Verifying npm installation...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: npm is not installed or not in PATH
    pause
    exit /b 1
)
echo [T001] PASS: npm is installed
npm --version
echo.

REM Task T002: Verify Git installation
echo [T002] Verifying Git installation...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: Git is not installed. You'll need it for Phase 4 (Deployment)
    echo Download from https://git-scm.com/
) else (
    echo [T002] PASS: Git is installed
    git --version
)
echo.

REM Task T003: Set working directory
echo [T003] Setting working directory...
cd /d "%~dp0"
echo [T003] Current directory: %CD%
echo.

echo ============================================================================
echo PHASE 0 COMPLETE - Pre-flight checks passed
echo ============================================================================
echo.
pause

REM ============================================================================
REM PHASE 1: FOUNDATION (PROJECT SETUP)
REM ============================================================================

echo.
echo ============================================================================
echo PHASE 1: FOUNDATION (PROJECT SETUP)
echo ============================================================================
echo.

REM Task T010: Initialize Docusaurus project
echo [T010] Initializing Docusaurus with TypeScript...
echo This will take 2-3 minutes...
echo.
npx create-docusaurus@latest physical-ai-textbook classic --typescript
if %errorlevel% neq 0 (
    echo ERROR: Docusaurus initialization failed
    pause
    exit /b 1
)
echo [T010] PASS: Docusaurus project created
echo.

REM Task T011: Navigate to project directory
echo [T011] Navigating to project directory...
cd physical-ai-textbook
if %errorlevel% neq 0 (
    echo ERROR: Failed to navigate to project directory
    pause
    exit /b 1
)
echo [T011] PASS: Current directory: %CD%
echo.

REM Task T012: Verify TypeScript configuration
echo [T012] Verifying TypeScript configuration...
if exist tsconfig.json (
    echo [T012] PASS: tsconfig.json found
) else (
    echo ERROR: tsconfig.json not found
    pause
    exit /b 1
)
echo.

REM Task T013: Verify package.json
echo [T013] Verifying package.json...
if exist package.json (
    echo [T013] PASS: package.json found
    findstr /i "docusaurus" package.json >nul
    if %errorlevel% equ 0 (
        echo [T013] PASS: Docusaurus dependencies present
    )
) else (
    echo ERROR: package.json not found
    pause
    exit /b 1
)
echo.

REM Task T014: Install dependencies
echo [T014] Installing initial dependencies...
echo This will take 1-2 minutes...
echo.
npm install
if %errorlevel% neq 0 (
    echo ERROR: npm install failed
    pause
    exit /b 1
)
echo [T014] PASS: Dependencies installed
echo.

REM Task T020: Install Tailwind CSS
echo [T020] Installing Tailwind CSS and dependencies...
npm install -D tailwindcss postcss autoprefixer
if %errorlevel% neq 0 (
    echo ERROR: Tailwind CSS installation failed
    pause
    exit /b 1
)
echo [T020] PASS: Tailwind CSS installed
echo.

REM Task T021: Initialize Tailwind CSS
echo [T021] Initializing Tailwind CSS configuration...
npx tailwindcss init
if %errorlevel% neq 0 (
    echo ERROR: Tailwind initialization failed
    pause
    exit /b 1
)
echo [T021] PASS: tailwind.config.js created
echo.

REM Task T022: Create PostCSS configuration
echo [T022] Creating PostCSS configuration...
(
echo module.exports = {
echo   plugins: {
echo     tailwindcss: {},
echo     autoprefixer: {},
echo   },
echo };
) > postcss.config.js
echo [T022] PASS: postcss.config.js created
echo.

REM Task T023: Update Tailwind configuration with cyberpunk colors
echo [T023] Updating Tailwind configuration with cyberpunk theme...
(
echo /** @type {import('tailwindcss'^).Config} */
echo module.exports = {
echo   content: [
echo     './src/**/*.{js,jsx,ts,tsx}',
echo     './docs/**/*.{md,mdx}',
echo   ],
echo   darkMode: ['class', '[data-theme="dark"]'],
echo   theme: {
echo     extend: {
echo       colors: {
echo         'cyberpunk-bg': '#0a0e1a',
echo         'cyberpunk-text': '#e0e6f0',
echo         'neon-cyan': '#00FFD4',
echo         'neon-magenta': '#FF006B',
echo         'neon-blue': '#0080FF',
echo       },
echo       fontFamily: {
echo         sans: ['Inter', 'sans-serif'],
echo         mono: ['JetBrains Mono', 'monospace'],
echo       },
echo       boxShadow: {
echo         'neon': '0 0 10px rgba(0, 255, 212, 0.5^)',
echo         'neon-magenta': '0 0 10px rgba(255, 0, 107, 0.5^)',
echo         'neon-blue': '0 0 10px rgba(0, 128, 255, 0.5^)',
echo       },
echo     },
echo   },
echo   plugins: [],
echo   corePlugins: {
echo     preflight: false,
echo   },
echo };
) > tailwind.config.js
echo [T023] PASS: Tailwind config updated with cyberpunk colors
echo.

REM Task T030-T033: Clean up default boilerplate
echo [T030-T033] Cleaning up default boilerplate...
if exist docs\tutorial-basics rmdir /s /q docs\tutorial-basics
if exist docs\tutorial-extras rmdir /s /q docs\tutorial-extras
if exist docs\intro.md del /q docs\intro.md
if exist blog rmdir /s /q blog
echo [T030-T033] PASS: Default boilerplate removed
echo.

echo ============================================================================
echo PHASE 1 COMPLETE - Foundation setup complete
echo ============================================================================
echo.
pause

REM ============================================================================
REM PHASE 2: CONTENT ARCHITECTURE (SKELETON)
REM ============================================================================

echo.
echo ============================================================================
echo PHASE 2: CONTENT ARCHITECTURE (SKELETON)
echo ============================================================================
echo.

REM Task T100-T104: Create module directories
echo [T100-T104] Creating module directory structure...
mkdir docs\01-Introduction 2>nul
mkdir docs\02-Module-1-ROS2 2>nul
mkdir docs\03-Module-2-Simulation 2>nul
mkdir docs\04-Module-3-Brain 2>nul
mkdir docs\05-Module-4-VLA 2>nul
echo [T100-T104] PASS: 5 module directories created
echo.

REM Task T110-T112: Create Introduction module MDX files
echo [T110-T112] Creating Introduction module MDX files...

(
echo ---
echo sidebar_position: 1
echo title: "From Digital to Embodied Intelligence"
echo description: "Explore the evolution from digital AI to physical, embodied intelligent systems"
echo ---
echo.
echo # From Digital to Embodied Intelligence
echo.
echo ^> 🚧 **Under Construction**: This chapter is currently being developed.
echo.
echo ## Overview
echo.
echo This chapter will cover:
echo - The evolution of artificial intelligence
echo - From virtual to physical intelligence
echo - Key concepts in embodied AI
echo - Real-world applications of physical AI systems
echo.
echo ## Prerequisites
echo.
echo - Basic understanding of AI concepts
echo - Curiosity about robotics and physical systems
echo.
echo ## Coming Soon
echo.
echo Detailed content for this chapter will be added in Phase 4 (Content Injection^).
echo.
echo ---
echo.
echo **Next Chapter**: [RTX 4070 Ti ^& Ubuntu Setup](./02-hardware-setup.mdx^)
) > docs\01-Introduction\01-vision.mdx

(
echo ---
echo sidebar_position: 2
echo title: "RTX 4070 Ti ^& Ubuntu Setup"
echo description: "Configure your high-performance workstation for Physical AI development"
echo ---
echo.
echo # RTX 4070 Ti ^& Ubuntu Setup
echo.
echo ^> 🚧 **Under Construction**: This chapter is currently being developed.
echo.
echo ## Overview
echo.
echo This chapter will cover:
echo - Hardware requirements for Physical AI development
echo - RTX GPU setup and drivers
echo - Ubuntu 22.04 LTS installation
echo - Docker configuration
echo.
echo ## Prerequisites
echo.
echo - RTX 3060 or better GPU (12GB+ VRAM recommended^)
echo - 16GB+ RAM (32GB recommended^)
echo - 100GB+ SSD storage
echo.
echo ## Coming Soon
echo.
echo Detailed hardware setup instructions will be added in Phase 4 (Content Injection^).
echo.
echo ---
echo.
echo **Next Chapter**: [Python ^& Docker Prerequisites](./03-prerequisites.mdx^)
) > docs\01-Introduction\02-hardware-setup.mdx

(
echo ---
echo sidebar_position: 3
echo title: "Python ^& Docker Prerequisites"
echo description: "Essential software and tools for Physical AI development"
echo ---
echo.
echo # Python ^& Docker Prerequisites
echo.
echo ^> 🚧 **Under Construction**: This chapter is currently being developed.
echo.
echo ## Overview
echo.
echo This chapter will cover:
echo - Python 3.10+ installation and virtual environments
echo - Docker and Docker Compose setup
echo - Essential development tools
echo - IDE configuration (VS Code recommended^)
echo.
echo ## Prerequisites
echo.
echo - Basic command line familiarity
echo - Administrator/sudo access on your system
echo.
echo ## Coming Soon
echo.
echo Detailed prerequisite setup instructions will be added in Phase 4 (Content Injection^).
) > docs\01-Introduction\03-prerequisites.mdx

echo [T110-T112] PASS: Introduction module files created
echo.

REM Task T120-T122: Create ROS2 module MDX files
echo [T120-T122] Creating ROS2 module MDX files...

(
echo ---
echo sidebar_position: 1
echo title: "ROS 2 Nodes and Topics"
echo description: "Learn the fundamental building blocks of ROS 2 architecture"
echo ---
echo.
echo # ROS 2 Nodes and Topics
echo.
echo ^> 🚧 **Under Construction**: This chapter is currently being developed.
echo.
echo ## Overview
echo.
echo This chapter will cover key concepts related to ROS 2 nodes and topics.
echo.
echo ## Prerequisites
echo.
echo - Basic understanding of robotics concepts
echo - Python programming experience (recommended^)
echo.
echo ## Coming Soon
echo.
echo Detailed content for this chapter will be added in Phase 4 (Content Injection^).
) > docs\02-Module-1-ROS2\01-nodes-topics.mdx

(
echo ---
echo sidebar_position: 2
echo title: "Python Client Library (rclpy^)"
echo description: "Master ROS 2 development with Python using rclpy"
echo ---
echo.
echo # Python Client Library (rclpy^)
echo.
echo ^> 🚧 **Under Construction**: This chapter is currently being developed.
echo.
echo ## Overview
echo.
echo This chapter will cover key concepts related to Python client library (rclpy^).
echo.
echo ## Prerequisites
echo.
echo - Basic understanding of robotics concepts
echo - Python programming experience (recommended^)
echo.
echo ## Coming Soon
echo.
echo Detailed content for this chapter will be added in Phase 4 (Content Injection^).
) > docs\02-Module-1-ROS2\02-python-rclpy.mdx

(
echo ---
echo sidebar_position: 3
echo title: "URDF Modeling for Humanoids"
echo description: "Create robot models using URDF for humanoid robotics"
echo ---
echo.
echo # URDF Modeling for Humanoids
echo.
echo ^> 🚧 **Under Construction**: This chapter is currently being developed.
echo.
echo ## Overview
echo.
echo This chapter will cover key concepts related to URDF modeling for humanoids.
echo.
echo ## Prerequisites
echo.
echo - Basic understanding of robotics concepts
echo - Python programming experience (recommended^)
echo.
echo ## Coming Soon
echo.
echo Detailed content for this chapter will be added in Phase 4 (Content Injection^).
) > docs\02-Module-1-ROS2\03-urdf-humanoids.mdx

echo [T120-T122] PASS: ROS2 module files created
echo.

REM Task T130-T132: Create Simulation module MDX files
echo [T130-T132] Creating Simulation module MDX files...

(
echo ---
echo sidebar_position: 1
echo title: "Gazebo Physics Engine"
echo description: "Simulate realistic physics for robotic systems"
echo ---
echo.
echo # Gazebo Physics Engine
echo.
echo ^> 🚧 **Under Construction**: This chapter is currently being developed.
echo.
echo ## Overview
echo.
echo This chapter will cover key concepts related to Gazebo physics engine.
echo.
echo ## Prerequisites
echo.
echo - Basic understanding of robotics concepts
echo - Python programming experience (recommended^)
echo.
echo ## Coming Soon
echo.
echo Detailed content for this chapter will be added in Phase 4 (Content Injection^).
) > docs\03-Module-2-Simulation\01-gazebo-physics.mdx

(
echo ---
echo sidebar_position: 2
echo title: "Unity Rendering Integration"
echo description: "High-fidelity visual rendering for robot simulations"
echo ---
echo.
echo # Unity Rendering Integration
echo.
echo ^> 🚧 **Under Construction**: This chapter is currently being developed.
echo.
echo ## Overview
echo.
echo This chapter will cover key concepts related to Unity rendering integration.
echo.
echo ## Prerequisites
echo.
echo - Basic understanding of robotics concepts
echo - Python programming experience (recommended^)
echo.
echo ## Coming Soon
echo.
echo Detailed content for this chapter will be added in Phase 4 (Content Injection^).
) > docs\03-Module-2-Simulation\02-unity-rendering.mdx

(
echo ---
echo sidebar_position: 3
echo title: "Sensor Simulation: LiDAR"
echo description: "Simulate LiDAR sensors for perception systems"
echo ---
echo.
echo # Sensor Simulation: LiDAR
echo.
echo ^> 🚧 **Under Construction**: This chapter is currently being developed.
echo.
echo ## Overview
echo.
echo This chapter will cover key concepts related to sensor simulation with LiDAR.
echo.
echo ## Prerequisites
echo.
echo - Basic understanding of robotics concepts
echo - Python programming experience (recommended^)
echo.
echo ## Coming Soon
echo.
echo Detailed content for this chapter will be added in Phase 4 (Content Injection^).
) > docs\03-Module-2-Simulation\03-sensors-lidar.mdx

echo [T130-T132] PASS: Simulation module files created
echo.

REM Task T140-T142: Create Brain module MDX files
echo [T140-T142] Creating Brain module MDX files...

(
echo ---
echo sidebar_position: 1
echo title: "NVIDIA Isaac Sim Setup"
echo description: "GPU-accelerated robotics simulation with Isaac Sim"
echo ---
echo.
echo # NVIDIA Isaac Sim Setup
echo.
echo ^> 🚧 **Under Construction**: This chapter is currently being developed.
echo.
echo ## Overview
echo.
echo This chapter will cover key concepts related to NVIDIA Isaac Sim setup.
echo.
echo ## Prerequisites
echo.
echo - Basic understanding of robotics concepts
echo - Python programming experience (recommended^)
echo.
echo ## Coming Soon
echo.
echo Detailed content for this chapter will be added in Phase 4 (Content Injection^).
) > docs\04-Module-3-Brain\01-isaac-sim.mdx

(
echo ---
echo sidebar_position: 2
echo title: "Navigation2 and Visual SLAM"
echo description: "Autonomous navigation and mapping with Nav2"
echo ---
echo.
echo # Navigation2 and Visual SLAM
echo.
echo ^> 🚧 **Under Construction**: This chapter is currently being developed.
echo.
echo ## Overview
echo.
echo This chapter will cover key concepts related to Navigation2 and Visual SLAM.
echo.
echo ## Prerequisites
echo.
echo - Basic understanding of robotics concepts
echo - Python programming experience (recommended^)
echo.
echo ## Coming Soon
echo.
echo Detailed content for this chapter will be added in Phase 4 (Content Injection^).
) > docs\04-Module-3-Brain\02-nav2-vslam.mdx

(
echo ---
echo sidebar_position: 3
echo title: "Reinforcement Learning for Robotics"
echo description: "Train intelligent robot behaviors with RL algorithms"
echo ---
echo.
echo # Reinforcement Learning for Robotics
echo.
echo ^> 🚧 **Under Construction**: This chapter is currently being developed.
echo.
echo ## Overview
echo.
echo This chapter will cover key concepts related to reinforcement learning for robotics.
echo.
echo ## Prerequisites
echo.
echo - Basic understanding of robotics concepts
echo - Python programming experience (recommended^)
echo.
echo ## Coming Soon
echo.
echo Detailed content for this chapter will be added in Phase 4 (Content Injection^).
) > docs\04-Module-3-Brain\03-reinforcement-learning.mdx

echo [T140-T142] PASS: Brain module files created
echo.

REM Task T150-T152: Create VLA module MDX files
echo [T150-T152] Creating VLA module MDX files...

(
echo ---
echo sidebar_position: 1
echo title: "Voice Input with Whisper"
echo description: "Integrate voice commands using OpenAI Whisper"
echo ---
echo.
echo # Voice Input with Whisper
echo.
echo ^> 🚧 **Under Construction**: This chapter is currently being developed.
echo.
echo ## Overview
echo.
echo This chapter will cover key concepts related to voice input with Whisper.
echo.
echo ## Prerequisites
echo.
echo - Basic understanding of robotics concepts
echo - Python programming experience (recommended^)
echo.
echo ## Coming Soon
echo.
echo Detailed content for this chapter will be added in Phase 4 (Content Injection^).
) > docs\05-Module-4-VLA\01-whisper-voice.mdx

(
echo ---
echo sidebar_position: 2
echo title: "LLM-Based Task Planning"
echo description: "Use language models for high-level robot task planning"
echo ---
echo.
echo # LLM-Based Task Planning
echo.
echo ^> 🚧 **Under Construction**: This chapter is currently being developed.
echo.
echo ## Overview
echo.
echo This chapter will cover key concepts related to LLM-based task planning.
echo.
echo ## Prerequisites
echo.
echo - Basic understanding of robotics concepts
echo - Python programming experience (recommended^)
echo.
echo ## Coming Soon
echo.
echo Detailed content for this chapter will be added in Phase 4 (Content Injection^).
) > docs\05-Module-4-VLA\02-llm-planning.mdx

(
echo ---
echo sidebar_position: 3
echo title: "Capstone Integration Project"
echo description: "Build a complete VLA-powered humanoid robot system"
echo ---
echo.
echo # Capstone Integration Project
echo.
echo ^> 🚧 **Under Construction**: This chapter is currently being developed.
echo.
echo ## Overview
echo.
echo This chapter will cover key concepts related to capstone integration project.
echo.
echo ## Prerequisites
echo.
echo - Basic understanding of robotics concepts
echo - Python programming experience (recommended^)
echo.
echo ## Coming Soon
echo.
echo Detailed content for this chapter will be added in Phase 4 (Content Injection^).
) > docs\05-Module-4-VLA\03-capstone-project.mdx

echo [T150-T152] PASS: VLA module files created
echo.

REM Task T160: Configure sidebar navigation
echo [T160] Configuring sidebar navigation...
(
echo import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
echo.
echo const sidebars: SidebarsConfig = {
echo   tutorialSidebar: [
echo     {
echo       type: 'category',
echo       label: '📘 Introduction',
echo       collapsible: true,
echo       collapsed: false,
echo       items: [
echo         '01-Introduction/01-vision',
echo         '01-Introduction/02-hardware-setup',
echo         '01-Introduction/03-prerequisites',
echo       ],
echo     },
echo     {
echo       type: 'category',
echo       label: '🤖 Module 1: ROS 2 (The Nervous System^)',
echo       collapsible: true,
echo       collapsed: true,
echo       items: [
echo         '02-Module-1-ROS2/01-nodes-topics',
echo         '02-Module-1-ROS2/02-python-rclpy',
echo         '02-Module-1-ROS2/03-urdf-humanoids',
echo       ],
echo     },
echo     {
echo       type: 'category',
echo       label: '🌐 Module 2: Simulation (The Digital Twin^)',
echo       collapsible: true,
echo       collapsed: true,
echo       items: [
echo         '03-Module-2-Simulation/01-gazebo-physics',
echo         '03-Module-2-Simulation/02-unity-rendering',
echo         '03-Module-2-Simulation/03-sensors-lidar',
echo       ],
echo     },
echo     {
echo       type: 'category',
echo       label: '🧠 Module 3: NVIDIA Isaac (The Brain^)',
echo       collapsible: true,
echo       collapsed: true,
echo       items: [
echo         '04-Module-3-Brain/01-isaac-sim',
echo         '04-Module-3-Brain/02-nav2-vslam',
echo         '04-Module-3-Brain/03-reinforcement-learning',
echo       ],
echo     },
echo     {
echo       type: 'category',
echo       label: '🎯 Module 4: VLA (Vision-Language-Action^)',
echo       collapsible: true,
echo       collapsed: true,
echo       items: [
echo         '05-Module-4-VLA/01-whisper-voice',
echo         '05-Module-4-VLA/02-llm-planning',
echo         '05-Module-4-VLA/03-capstone-project',
echo       ],
echo     },
echo   ],
echo };
echo.
echo export default sidebars;
) > sidebars.ts
echo [T160] PASS: sidebars.ts configured
echo.

echo ============================================================================
echo PHASE 2 COMPLETE - Content architecture created
echo ============================================================================
echo.

REM ============================================================================
REM SUMMARY
REM ============================================================================

echo.
echo ============================================================================
echo SETUP COMPLETE!
echo ============================================================================
echo.
echo Summary:
echo   - Phase 0: Pre-flight checks PASSED
echo   - Phase 1: Docusaurus initialized with TypeScript
echo   - Phase 1: Tailwind CSS installed and configured
echo   - Phase 1: Default boilerplate cleaned
echo   - Phase 2: 5 module directories created
echo   - Phase 2: 15 MDX placeholder files created
echo   - Phase 2: Sidebar navigation configured
echo.
echo Next Steps:
echo   1. Review the generated files
echo   2. Test the dev server: npm start
echo   3. Test the build: npm run build
echo   4. Proceed to Phase 3 (Visual Identity^) when ready
echo.
echo Project location: %CD%
echo.
echo ============================================================================
pause
