#!/bin/bash

echo "========================================"
echo "Physical AI Chatbot - Quick Setup"
echo "========================================"
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "[1/5] Creating Python virtual environment..."
    python3 -m venv venv
    echo "✓ Virtual environment created"
else
    echo "[1/5] Virtual environment already exists"
fi

echo ""
echo "[2/5] Activating virtual environment..."
source venv/bin/activate

echo ""
echo "[3/5] Installing Python dependencies..."
pip install -r requirements.txt

echo ""
echo "[4/5] Checking environment variables..."
if [ ! -f ".env" ]; then
    echo "⚠ .env file not found. Copying from .env.example..."
    cp .env.example .env
    echo ""
    echo "⚠ IMPORTANT: Edit .env file and add your OPENAI_API_KEY"
    echo ""
    read -p "Press enter to continue..."
fi

echo ""
echo "[5/5] Setup complete!"
echo ""
echo "========================================"
echo "Next Steps:"
echo "========================================"
echo "1. Edit .env file and add your OpenAI API key"
echo "2. Run: python ingest_data.py (to load textbook data)"
echo "3. Run: python api.py (to start the backend server)"
echo "4. Run: npm start (in parent directory for Docusaurus)"
echo "========================================"
echo ""
