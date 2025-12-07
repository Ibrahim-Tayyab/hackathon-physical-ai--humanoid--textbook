@echo off
echo.
echo ========================================
echo Creating Module 5 Directory Structure
echo ========================================
echo.

REM Create Module 5 VLA directory
mkdir "E:\Hackathon_AI\hackathon-youtube\physical-ai-textbook\docs\05-Module-4-VLA" 2>nul

if exist "E:\Hackathon_AI\hackathon-youtube\physical-ai-textbook\docs\05-Module-4-VLA" (
    echo [SUCCESS] Module 5 directory created!
    echo Location: physical-ai-textbook\docs\05-Module-4-VLA
) else (
    echo [ERROR] Failed to create directory
    echo Please create it manually
)

echo.
echo Ready for content files.
echo.
pause
