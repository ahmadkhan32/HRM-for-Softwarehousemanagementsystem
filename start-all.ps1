# HRM System - Start Both Servers
Write-Host "Starting HRM System..." -ForegroundColor Green

# Start Backend
Write-Host "`nStarting Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\hrm-backend'; npm run dev"

# Wait a bit
Start-Sleep -Seconds 2

# Start Frontend
Write-Host "Starting Frontend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\hrm-frontend'; npm run dev"

Write-Host "`n✅ Both servers are starting in separate windows!" -ForegroundColor Green
Write-Host "Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "`nPress any key to exit this window (servers will continue running)..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

