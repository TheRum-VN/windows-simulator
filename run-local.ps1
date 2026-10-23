Set-Location $PSScriptRoot
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host "Can cai Node.js LTS: https://nodejs.org/" -ForegroundColor Yellow
  Read-Host "Nhan Enter de thoat"
  exit 1
}
Start-Process "http://localhost:5173"
node server.mjs
