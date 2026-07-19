Project run instructions (safe defaults)

1. Backend (uses external `MONGO_URI` if present; otherwise starts an in-memory MongoDB for demo):

```powershell
cd C:\VehicleRentalManagement\backend
copy NUL .env  # create .env if you need to set MONGO_URI
notepad .env    # edit: set MONGO_URI=your_mongo_uri (optional)
npm install
npm run dev
```

Notes:
- If `MONGO_URI` is not set, the backend will start an in-memory MongoDB (mongodb-memory-server) for safe local/demo runs.
- Seeding is intentionally skipped by default to avoid modifying external databases. To seed (in-memory):

```powershell
# set empty MONGO_URI to force in-memory seeding (PowerShell)
$env:MONGO_URI=''
cd C:\VehicleRentalManagement\backend
npm run seed
```

2. Frontend (Vite):

```powershell
cd C:\VehicleRentalManagement\frontend
npm install
npm run dev
```

Open the frontend at: http://localhost:5173
Check backend health: http://localhost:5000/api/health

Troubleshooting:
- Ensure `node` and `npm` are on your PATH. On Windows, open PowerShell or Command Prompt where `node -v` and `npm -v` succeed.
- If the in-memory server fails to download binaries due to network or permissions, either provide an external `MONGO_URI` or run `npm run seed` on a machine with network access.

If you want, I can attempt to start the frontend in this environment now — tell me to proceed.
