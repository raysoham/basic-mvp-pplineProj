## basic-mvp-pplineProj

Basic DevSecOps MVP pipeline project in Node + TypeScript with Express and GitHub Actions.

### What this project shows

- **Node + TypeScript API** with Express, simple `/health`, `/items`, and `/auth/login` endpoints.
- **Automated tests** using Vitest and Supertest.
- **Dockerized application** ready to run as a container.
- **GitHub Actions CI/CD pipeline** that:
  - Installs dependencies, lints, and runs tests on every push/PR.
  - Runs `npm audit` as a security gate.
  - Builds a Docker image and scans it with Trivy, failing on HIGH/CRITICAL vulns.
  - Publishes clean images to GitHub Container Registry on the `main` branch.

### Running locally

1. **Install dependencies**
   ```bash
   npm install
   ```


2. **Run in dev mode**
   ```bash
   npm run dev
   ```

3. **Endpoints**
   - `GET /health` → `{ "status": "ok" }`
   - `GET /items` → returns an array of items
   - `POST /items` with `{ "name": "Test item" }` → creates an item
   - `POST /auth/login` with `{ "username": "demo", "password": "password123" }` → returns a JWT

### Running tests

```bash
npm test
```

### Building and running with Docker

```bash
docker build -t basic-mvp-pplineproj .
docker run -p 3000:3000 -e JWT_SECRET="change-me" basic-mvp-pplineproj
```

Then open `http://localhost:3000/health`.

### Running from Docker image from GHCR

```bash
docker pull ghcr.io/raysoham/basic-mvp-pplineproj:latest # pull the latest image from GHCR
docker run -p 3000:3000 ghcr.io/raysoham/basic-mvp-pplineproj:latest # run the container
```

Then open `http://localhost:3000/health`.

