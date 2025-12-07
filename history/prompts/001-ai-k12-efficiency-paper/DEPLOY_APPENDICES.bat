@echo off
echo ========================================
echo Physical AI Textbook - Appendices Deployment
echo ========================================
echo.

REM Step 1: Create directory
echo [1/4] Creating 06-Appendices directory...
mkdir "E:\Hackathon_AI\hackathon-youtube\physical-ai-textbook\docs\06-Appendices" 2>nul
if exist "E:\Hackathon_AI\hackathon-youtube\physical-ai-textbook\docs\06-Appendices" (
    echo   ✓ Directory created successfully
) else (
    echo   ✗ Failed to create directory
    pause
    exit /b 1
)
echo.

REM Step 2: Copy Lab Setup Guide
echo [2/4] Copying 01-lab-setup-guide.mdx...
copy "E:\Hackathon_AI\hackathon-youtube\APPENDIX_01_LAB_SETUP.mdx" "E:\Hackathon_AI\hackathon-youtube\physical-ai-textbook\docs\06-Appendices\01-lab-setup-guide.mdx" >nul
if exist "E:\Hackathon_AI\hackathon-youtube\physical-ai-textbook\docs\06-Appendices\01-lab-setup-guide.mdx" (
    echo   ✓ Lab Setup Guide deployed (12,882 characters)
) else (
    echo   ✗ Failed to copy file
)
echo.

REM Step 3: Copy Edge Hardware Guide
echo [3/4] Copying 02-edge-hardware.mdx...
copy "E:\Hackathon_AI\hackathon-youtube\APPENDIX_02_EDGE_HARDWARE.mdx" "E:\Hackathon_AI\hackathon-youtube\physical-ai-textbook\docs\06-Appendices\02-edge-hardware.mdx" >nul
if exist "E:\Hackathon_AI\hackathon-youtube\physical-ai-textbook\docs\06-Appendices\02-edge-hardware.mdx" (
    echo   ✓ Edge Hardware Guide deployed (17,225 characters)
) else (
    echo   ✗ Failed to copy file
)
echo.

REM Step 4: Copy Troubleshooting Guide
echo [4/4] Copying 03-troubleshooting.mdx...
copy "E:\Hackathon_AI\hackathon-youtube\APPENDIX_03_TROUBLESHOOTING.mdx" "E:\Hackathon_AI\hackathon-youtube\physical-ai-textbook\docs\06-Appendices\03-troubleshooting.mdx" >nul
if exist "E:\Hackathon_AI\hackathon-youtube\physical-ai-textbook\docs\06-Appendices\03-troubleshooting.mdx" (
    echo   ✓ Troubleshooting Guide deployed (20,663 characters)
) else (
    echo   ✗ Failed to copy file
)
echo.

REM Verify deployment
echo ========================================
echo DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Files deployed:
dir "E:\Hackathon_AI\hackathon-youtube\physical-ai-textbook\docs\06-Appendices\*.mdx" /B
echo.
echo Total: 50,770 characters (~8,500 words)
echo.
echo ========================================
echo NEXT STEPS:
echo ========================================
echo 1. CD to: E:\Hackathon_AI\hackathon-youtube\physical-ai-textbook
echo 2. Run: npm start
echo 3. Open: http://localhost:3000/docs/06-Appendices/01-lab-setup-guide
echo.
echo Press any key to launch development server...
pause >nul

REM Launch development server
cd "E:\Hackathon_AI\hackathon-youtube\physical-ai-textbook"
echo.
echo Starting Docusaurus development server...
echo.
start npm start

echo.
echo Server is starting... Check your browser!
echo.
pause
