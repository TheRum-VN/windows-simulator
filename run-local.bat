@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo =====================================================
  echo  CAN CAI NODE.JS LTS TRUOC KHI CHAY WINDOWS SIMULATOR
  echo  Tai: https://nodejs.org/
  echo =====================================================
  pause
  exit /b 1
)
start "Windows Simulator V2.1" http://localhost:5173
node server.mjs
pause
