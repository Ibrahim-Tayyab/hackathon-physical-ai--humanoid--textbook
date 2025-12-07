@echo off
echo Clearing Docusaurus cache...
if exist .docusaurus rmdir /s /q .docusaurus
if exist build rmdir /s /q build
if exist node_modules\.cache rmdir /s /q node_modules\.cache

echo Starting development server...
npm start
