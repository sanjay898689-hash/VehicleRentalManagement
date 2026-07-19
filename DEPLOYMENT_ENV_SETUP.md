Deployment environment setup

- Vercel:
  1. Open your project in the Vercel dashboard.
  2. Go to Settings → Environment Variables.
  3. Add `MONGO_URI` and `JWT_SECRET` (set values exactly as used locally).
  4. Choose the Environment (Preview/Production) and click Save.
  5. Redeploy your project.

- Render:
  1. Open your service in Render dashboard.
  2. Go to Environment → Environment Variables (or Settings → Environment).
  3. Add `MONGO_URI` and `JWT_SECRET` with the proper values.
  4. Redeploy the service.

Notes:
- Never commit `.env` with secrets. This repository already ignores `.env` files.
- For Vercel deployments where the backend runs as a serverless function, ensure the `MONGO_URI` string supports the driver (use the same connection string).
- If deploying frontend and backend separately, set backend vars in the backend's deployment service.

  - Required envs: `JWT_SECRET` is required — the server will refuse to start without it. `MONGO_URI` can be left unset for local/demo runs (the project will use an in-memory MongoDB in that case).
