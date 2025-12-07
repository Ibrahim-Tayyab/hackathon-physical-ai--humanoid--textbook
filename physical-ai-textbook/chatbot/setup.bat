@echo off
echo ========================================
echo Physical AI Chatbot - Quick Setup
echo ========================================
echo.

REM Check if virtual environment exists
if not exist "venv" (
    echo [1/5] Creating Python virtual environment...
    python -m venv venv
    echo ✓ Virtual environment created
) else (
    echo [1/5] Virtual environment already exists
)

echo.
echo [2/5] Activating virtual environment...
call venv\Scripts\activate.bat

echo.
echo [3/5] Installing Python dependencies...
pip install -r requirements.txt

echo.
echo [4/5] Checking environment variables...
if not exist ".env" (
    echo ⚠ .env file not found. Copying from .env.example...
    copy .env.example .env
    echo.
    echo ⚠ IMPORTANT: Edit .env file and add your OPENAI_API_KEY
    echo.
    pause
)

echo.
echo [5/5] Setup complete!
echo.
echo ========================================
echo Next Steps:
echo ========================================
echo 1. Edit .env file and add your OpenAI API key
echo 2. Run: python ingest_data.py (to load textbook data)
echo 3. Run: python api.py (to start the backend server)
echo 4. Run: npm start (in parent directory for Docusaurus)
echo ========================================
echo.
pause
