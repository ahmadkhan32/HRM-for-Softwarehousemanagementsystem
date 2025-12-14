# Setup Vercel Environment Variables for Database
# This script sets the Production environment variables for the backend

$env:VERCEL_ORG_ID = "" # Ensure no conflicts locally
$env:VERCEL_PROJECT_ID = ""

Write-Host "🚀 Setting up Vercel Environment Variables..."

Set-Location "..\hrm-backend"

Write-Host "1. Setting DB_HOST..."
"sql100.byethost10.com" | vercel env add DB_HOST production

Write-Host "2. Setting DB_USER..."
"b10_40637242" | vercel env add DB_USER production

Write-Host "3. Setting DB_PASSWORD..."
"d6ky275f" | vercel env add DB_PASSWORD production

Write-Host "4. Setting DB_NAME..."
"b10_40637242_hrm_sys" | vercel env add DB_NAME production

Write-Host "5. Setting DB_PORT..."
"3306" | vercel env add DB_PORT production

Write-Host "6. Setting DB_SKIP_CREATE..."
"true" | vercel env add DB_SKIP_CREATE production

Write-Host "✅ Environment variables configured!"
