Deployment guide

Overview
- Frontend: deploy to Vercel (recommended)
- Backend: deploy to Render (recommended) or Railway/Heroku
- Database: MongoDB Atlas (recommended)

Required environment variables (backend)
- MONGO_URI: MongoDB connection string (Atlas). Example: mongodb+srv://<user>:<pass>@cluster0.mongodb.net/mydb?retryWrites=true&w=majority
- JWT_SECRET: a random secret for signing JWTs
- CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET: only if using uploads
- RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET: only if using Razorpay payments
- CORS_ORIGIN: comma-separated allowed frontend origins (e.g. https://your-frontend.vercel.app)

Frontend (Vercel) — Quick steps
1. Push your repo to GitHub if not already.
2. Go to https://vercel.com/new and import the repository.
3. When asked, set the project root to `frontend` (select the `frontend` folder).
4. Build & Output settings:
   - Framework Preset: `Other` (Vite)
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add Environment Variables in Vercel project settings (Environment > Variables):
   - `VITE_API_URL` = `https://<your-backend-domain>/api` (replace with your backend URL)
6. Deploy. After build, Vercel will provide a live URL.

Backend (Render) — Quick steps
1. Create a MongoDB Atlas cluster and obtain `MONGO_URI`.
2. Create a Render account and connect your GitHub repo.
3. In Render dashboard, create a new "Web Service".
   - Name: vehicle-rental-backend
   - Branch: main (or your branch)
   - Root Directory: `backend` (set to the `backend` folder)
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add Environment Variables (Service > Environment):
   - `MONGO_URI`, `JWT_SECRET`, and other optional keys listed above.
   - Set `CORS_ORIGIN` to your Vercel frontend URL (e.g. `https://project.vercel.app`).
5. Deploy. Render will provide a stable domain like `https://vehicle-rental-backend.onrender.com`.

Notes & verification
- Health check: backend exposes `/api/health`. Example: `https://<backend>/api/health` should return JSON.
- After backend deploy, set `VITE_API_URL` in Vercel to `https://<backend-domain>/api` and redeploy frontend.
- Socket.IO: the backend uses Socket.IO with the HTTP server; Render supports WebSockets.

Local build & test commands
- Backend (local):
```powershell
cd backend
npm install
# create a .env with MONGO_URI (or leave blank to use in-memory DB)
npm run dev
```
- Frontend (local):
```powershell
cd frontend
npm install
npm run dev
```

If you want, I can:
- Prepare a `.env.example` and a `Procfile`/`render.yaml` for Render.
- Walk you through creating MongoDB Atlas and setting env vars step-by-step.
- Provide the exact env values to set in Vercel/Render once you have external services ready.

If you'd like me to add `render.yaml` and `.env.example` files in the repo, tell me and I will create them.