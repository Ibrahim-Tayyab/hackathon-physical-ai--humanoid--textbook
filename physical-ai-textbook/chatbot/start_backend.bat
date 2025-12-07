@echo off
echo Starting Physical AI Chatbot Backend...
echo.

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Check if .env exists
if not exist ".env" (
    echo ERROR: .env file not found!
    echo Please run setup.bat first.
    pause
    exit /b 1
)

REM Start API server
echo Starting FastAPI server on http://localhost:8000
echo Press Ctrl+C to stop
echo.
python api.py
