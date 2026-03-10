## Security in basic-mvp-pplineProj

This project is intentionally small but focuses on demonstrating a DevSecOps-style CI/CD pipeline.

### Security checks in CI

- **Dependency scanning (SCA)**
  - `npm audit --audit-level=high` runs in GitHub Actions.
  - The pipeline fails if high or critical vulnerabilities are found in npm dependencies.

- **Container image scanning**
  - Docker images are built for the application.
  - **Trivy** scans the image for vulnerabilities.
  - The pipeline fails on any `HIGH` or `CRITICAL` vulnerabilities.

### CI/CD policy

1. Code must **compile, lint, and pass tests**.
2. Dependency scan (`npm audit`) must **not** report high/critical vulns.
3. Docker image must pass a **Trivy** scan with no high/critical vulns.
4. **Only if all checks pass**, images are published to **GitHub Container Registry** as:
   - `ghcr.io/raysoham/basic-mvp-pplineproj:${GITHUB_SHA}`
   - `ghcr.io/raysoham/basic-mvp-pplineproj:latest`

### Secrets

- The API uses `JWT_SECRET` to sign tokens.
- In CI/CD and production, this should be stored in:
  - GitHub Actions **secrets**, or
  - A dedicated secrets manager (e.g. Vault) in more advanced setups.

### Future improvements

- Add SAST tooling (e.g. Semgrep, CodeQL, or additional ESLint security rules).
- Add IaC (Terraform/Kubernetes) and IaC scanning (e.g. Checkov).
- Integrate a separate CD tool such as Jenkins for deployments to Kubernetes or another environment.

