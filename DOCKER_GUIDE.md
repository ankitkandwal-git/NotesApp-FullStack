# Docker Setup for NotesApp

## What I Created

1. **Backend Dockerfile** - Containerizes your Node.js/Express server
2. **Frontend Dockerfile** - Builds and serves your React app
3. **docker-compose.yml** - Orchestrates both containers to run together
4. **This guide** - Step-by-step instructions

---

## 📋 Prerequisites

Install Docker from: https://www.docker.com/products/docker-desktop

**Verify installation:**
```bash
docker --version
docker-compose --version
```

---

## 🚀 Quick Start (3 Steps)

### Step 1: Build the images
```bash
cd NotesApp
docker-compose build
```

### Step 2: Start the services
```bash
docker-compose up
```

### Step 3: Open your browser
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

**To stop:**
```bash
docker-compose down
```

---

## 📚 Common Commands

| Command | What it does |
|---------|-------------|
| `docker-compose up` | Start all services (background) |
| `docker-compose up -d` | Start services in background |
| `docker-compose down` | Stop and remove containers |
| `docker-compose logs -f` | View live logs (Ctrl+C to exit) |
| `docker-compose logs backend` | View only backend logs |
| `docker-compose ps` | Show running containers |
| `docker-compose build` | Rebuild images (do after code changes) |
| `docker-compose up --build` | Rebuild + start (one command) |

---

## 🔧 Development Workflow

### Making code changes?

**For Backend:**
- Just edit files in `Backend/` → automatically reloaded (nodemon watches changes)
- No rebuild needed!

**For Frontend:**
- Changes auto-reload in development
- If not, rebuild: `docker-compose up --build`

---

## 📝 How It Works

### Backend Container
- **Port**: 5000 (accessible from your machine)
- **Database**: SQLite stored in Docker volume (persists between restarts)
- **Auto-reload**: nodemon watches for changes during development
- **Environment**: Uses `.env` values from docker-compose.yml

### Frontend Container
- **Port**: 5173
- **Type**: Built React app (optimized)
- **Served by**: `serve` package
- **Auto-connects to**: Backend on `http://backend:5000` (container networking)

### Docker Compose
- **Networking**: Both containers can communicate via service names
- **Volumes**: 
  - Backend code mounted for live editing
  - Database volume persists data
- **Startup Order**: Frontend depends on backend

---

## 🐛 Troubleshooting

### "Port already in use"
Ports 5000 or 5173 in use? Change in `docker-compose.yml`:
```yaml
ports:
  - "5001:5000"  # Use 5001 instead of 5000
```

### "Container crashes immediately"
Check logs:
```bash
docker-compose logs backend
docker-compose logs frontend
```

### "Database lost after restart"
The volume `backend_data` keeps it. Check `volumes` in docker-compose.yml

### "Changes not showing"
```bash
# Rebuild everything
docker-compose down
docker-compose up --build
```

---

## 🌍 Environment Variables

Located in `docker-compose.yml`:
```yaml
environment:
  - JWT_SECRET=your-very-secret-key        # Change for production!
  - DB_PATH=/app/backend/data/notes.db     # Where database lives
  - CORS_ORIGIN=http://localhost:5173      # Frontend URL
  - PORT=5000                               # Backend port
```

### For Production:
1. Change `JWT_SECRET` to a strong random string
2. Set `CORS_ORIGIN` to your actual frontend URL
3. Remove `volumes` for backend (not needed in prod)

---

## 📊 File Structure After Docker Setup

```
NotesApp/
├── Backend/
│   ├── Dockerfile          ← NEW
│   ├── server.js
│   ├── package.json
│   └── ...
├── frontend/
│   ├── Dockerfile          ← NEW
│   ├── package.json
│   └── ...
├── docker-compose.yml      ← NEW
├── .dockerignore            ← NEW
└── ...
```

---

## 🎯 What Each File Does

| File | Purpose |
|------|---------|
| `Dockerfile` (Backend) | Instructions to build backend image |
| `Dockerfile` (Frontend) | Instructions to build frontend image |
| `docker-compose.yml` | Defines all services & how they connect |
| `.dockerignore` | Files to skip when building images |

---

## 🚢 Next Steps

- **For local dev**: Just run `docker-compose up` - you're set!
- **For production**: Push to Docker Hub or cloud platforms (AWS, Railway, Render)
- **Scale up**: Add more services (database, cache, etc.) in docker-compose.yml

---

## 💡 Pro Tips

1. **Use `.env` file**: Create `.env` in root, docker-compose reads it:
   ```
   JWT_SECRET=your-secret
   CORS_ORIGIN=http://localhost:5173
   ```

2. **Clear unused Docker stuff**:
   ```bash
   docker system prune  # Removes unused images/containers/volumes
   ```

3. **Enter a container shell** (for debugging):
   ```bash
   docker-compose exec backend sh
   docker-compose exec frontend sh
   ```

---

**Need help? Run:** `docker-compose --help`
