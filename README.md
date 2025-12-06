# Multi-service Express + Flask Example

## Run locally with Docker Compose
1. Build and run:
   docker-compose up --build

2. Open http://localhost:3000 to see the form.
3. Submit — frontend will forward to backend and show backend's response.

## Build images and push to Docker Hub
Replace <your-dockerhub-username> with your username.

# Build
docker build -t <your-dockerhub-username>/frontend:latest ./frontend
docker build -t <your-dockerhub-username>/backend:latest ./backend

# Login and push
docker login
docker push <your-dockerhub-username>/frontend:latest
docker push <your-dockerhub-username>/backend:latest

## Push code to GitHub
# initialize repo if needed
git init
git add .
git commit -m "Initial multi-service express+flask app"

# create remote and push
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main

=======
# Multiservice-Webapp
Full-stack microservices application with a Node.js/Express frontend and a Python/Flask backend, communicating through REST APIs.

