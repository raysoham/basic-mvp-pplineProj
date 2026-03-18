FROM node:20-alpine

# Patch OS-level vulnerabilities (Fixes zlib CVE-2026-22184)
RUN apk update && apk upgrade && npm install -g npm@latest

WORKDIR /app

COPY package*.json ./

# RUN npm ci || npm install - package-lock.json out of sync should be caught locally.

RUN npm ci

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

# Remove development dependencies to reduce image size and security surface area
# Also clean npm cache to reduce image size before setting env to production
RUN npm prune --omit=dev && npm cache clean --force

# Set the environment to production
ENV NODE_ENV=production

# change user from root to node
USER node

EXPOSE 3000

CMD ["node", "dist/index.js"]

