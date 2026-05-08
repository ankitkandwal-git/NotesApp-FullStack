
## NotesApp – Full Stack Notes Application

NotesApp is a full stack note-taking app built with React (frontend) and Node.js/Express (backend), using SQLite for storage. The project is fully containerized with Docker and Docker Compose for easy local development and deployment.

### Features
- User authentication (JWT-based)
- Create, edit, and delete notes
- Responsive React frontend (Vite, Tailwind CSS)
- RESTful API with Express
- SQLite database (auto-initialized)
- Secure password hashing
- Live reload for development
- Dockerized: run both frontend and backend with a single command

### Quick Start
1. Clone the repo
2. In the project root, run:
	```
	docker-compose up
	```
3. Access the app at [http://localhost:5173](http://localhost:5173)

### Development
- Edit frontend or backend code and Docker will auto-reload changes.
- To stop: `docker-compose down`
- To rebuild after major changes: `docker-compose up --build`

### Why use this project?
- Simple, modern full stack architecture
- No manual environment setup—just Docker
- Great for learning, prototyping, or as a starter for your own projects

---
**Made with React, Node.js, Express, SQLite, and Docker.**
