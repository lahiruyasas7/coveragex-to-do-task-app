# backend/Dockerfile

# builder
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npx prisma generate

# runtime
FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

ENV NODE_ENV=production
EXPOSE 3003

CMD ["node", "dist/main.js"]
