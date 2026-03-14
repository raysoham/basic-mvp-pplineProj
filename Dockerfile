FROM node:20-alpine

# Patch OS-level vulnerabilities (Fixes zlib CVE-2026-22184)
RUN apk update && apk upgrade

WORKDIR /app

COPY package*.json ./

RUN npm ci || npm install

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

# Remove development dependencies to reduce image size and security surface area
RUN npm prune --omit=dev
ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/index.js"]

