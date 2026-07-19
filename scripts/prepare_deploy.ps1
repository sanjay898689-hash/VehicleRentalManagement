<#
  prepare_deploy.ps1
  - Installs backend & frontend dependencies
  - Copies .env.example to .env (if missing)
  - Builds frontend (Vite)
  - Initializes a local git repo and makes an initial commit (if git is available)
  - Prints next steps to create a GitHub repo and deploy to Vercel (frontend) + Render (backend)

USAGE (PowerShell):
  Open PowerShell in the project root and run:
    .\scripts\prepare_deploy.ps1

This script does NOT push to any remote or accept credentials.
#>

function Test-Command($name) {
  return (Get-Command $name -ErrorAction SilentlyContinue) -ne $null
}

$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
Write-Host "Working in repository root: $root"

Write-Host "\n1) Installing backend dependencies..."
if (Test-Command npm) {
  Push-Location (Join-Path $root 'backend')
  npm install
  Pop-Location
} else {
  Write-Warning "npm not found — install Node.js/npm and re-run the script."
}

Write-Host "\n2) Installing frontend dependencies..."
if (Test-Command npm) {
  Push-Location (Join-Path $root 'frontend')
  npm install
  Pop-Location
} else {
  Write-Warning "npm not found — install Node.js/npm and re-run the script."
}

Write-Host "\n3) Ensure backend .env exists (copied from .env.example if available)..."
$envExample = Join-Path $root 'backend\.env.example'
$envFile = Join-Path $root 'backend\.env'
if (Test-Path $envFile) {
  Write-Host ".env already exists at backend\.env — leaving it in place."
} elseif (Test-Path $envExample) {
  Copy-Item $envExample $envFile
  Write-Host "Copied .env.example -> backend/.env (please edit with real secrets)."
} else {
  Write-Warning "No backend/.env.example found — create backend/.env manually."
}

Write-Host "\n4) Building frontend (production build)..."
if (Test-Command npm) {
  Push-Location (Join-Path $root 'frontend')
  if (Test-Path 'package.json') {
    npm run build
  } else {
    Write-Warning "frontend/package.json not found — skipping build."
  }
  Pop-Location
} else {
  Write-Warning "npm not found — cannot build frontend."
}

Write-Host "\n5) Initialize local git repository (if git available and not initialized)..."
if (Test-Path (Join-Path $root '.git')) {
  Write-Host "A git repository already exists — skipping git init."
} else {
  if (Test-Command git) {
    Push-Location $root
    git init
    git checkout -b main
    git add .
    git commit -m "chore: initial commit — project import and production optimizations"
    Pop-Location
    Write-Host "Initialized local git repo and created initial commit."
  } else {
    Write-Warning "git not found — install Git and run the following manually from project root:\n  git init\n  git checkout -b main\n  git add .\n  git commit -m \"initial commit\""
  }
}

Write-Host "\n== Next steps (manual) =="
Write-Host "1) Create a GitHub repository (via web UI or 'gh' CLI)."
Write-Host "   If you have 'gh' installed you can run:"
Write-Host "     gh repo create <your-username>/<repo-name> --public --source=. --remote=origin --confirm"
Write-Host "   Or create via GitHub UI and then add the remote and push:"
Write-Host "     git remote add origin https://github.com/<you>/<repo>.git"
Write-Host "     git push -u origin main"

Write-Host "2) Deploy backend to Render (recommended) or Railway. In Render create a new Web Service, connect the GitHub repo, and set environment variables listed in README."
Write-Host "   - Set build command: 'npm install' and start command: 'npm run start' or 'npm run dev' depending on preference."

Write-Host "3) Deploy frontend to Vercel. In Vercel connect the GitHub repo; Vercel will detect Vite. Set environment variable VITE_API_URL to the backend base URL (e.g. https://<backend>.onrender.com/api)."

Write-Host "4) After deploy, verify both services are reachable and set CORS_ORIGIN on backend to allow your frontend origin."

Write-Host "\nScript finished. Review printed messages and follow the next steps to push and deploy."