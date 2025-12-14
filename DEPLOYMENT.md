# HRM System Deployment Guide

## GitHub Setup

1. Initialize Git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit: HRM System with ByteHost database integration"
git branch -M main
git remote add origin https://github.com/ahmadkhan32/HRM-for-Softwarehousemanagementsystem.git
git push -u origin main
```

## Vercel Deployment

### Backend Deployment

1. Go to [Vercel Dashboard](https://vercel.com)
2. Import your GitHub repository
3. Select the `hrm-backend` folder as the root directory
4. Configure environment variables:
   - `PORT`: 5000
   - `NODE_ENV`: production
   - `DB_HOST`: sql100.byethost10.com
   - `DB_USER`: b10_40637242
   - `DB_PASSWORD`: d6ky275f
   - `DB_NAME`: b10_40637242_hrm_sys
   - `DB_PORT`: 3306
   - `DB_CONNECT_TIMEOUT`: 20000
   - `DB_SKIP_CREATE`: true
   - `JWT_SECRET`: verystrongsecretkey123
5. Deploy

### Frontend Deployment

1. Create a new project in Vercel
2. Select the `hrm-frontend` folder as the root directory
3. Configure environment variables:
   - `VITE_API_URL`: Your backend Vercel URL (e.g., https://your-backend.vercel.app/api)
4. Build settings:
   - Build Command: `npm install && npm run build`
   - Output Directory: `dist`
5. Deploy

## Database Configuration

The system is configured to connect to ByteHost MySQL database:
- Host: sql100.byethost10.com
- Database: b10_40637242_hrm_sys
- User: b10_40637242
- Port: 3306

The connection timeout is set to 20000ms (20 seconds) to handle slower connections.

## Troubleshooting

### Vite Build Error
If you encounter "vite: command not found" error:
- Ensure Vite is in devDependencies
- Use `npx vite build` in the build script
- Make sure `node_modules` are installed before building

### Database Connection Issues
- Verify ByteHost database credentials
- Check if the database host allows external connections
- Ensure DB_SKIP_CREATE is set to true for hosted databases
- Increase DB_CONNECT_TIMEOUT if connection is slow

### CORS Issues
- Make sure backend CORS is configured to allow frontend domain
- Update axios.js in frontend to use correct API URL

## Environment Variables

### Backend (.env)
Copy `hrm-backend/env.template` to `hrm-backend/.env` and fill in the values.

### Frontend (.env)
Copy `hrm-frontend/env.template` to `hrm-frontend/.env` and set:
- `VITE_API_URL`: Your backend API URL

