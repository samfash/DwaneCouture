# 1. Base image
FROM node:slim AS base

# 2. Set working directory
WORKDIR /app

# 3. Install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy rest of the application
COPY . .

# 5. Build TypeScript
RUN npm run build

# 6. Use a lightweight image for production
FROM node:slim AS production

WORKDIR /app

COPY --from=base /app/dist ./dist
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package*.json ./

# 7. Expose port (optional, e.g. 5000)
EXPOSE 5000

# 8. Start the server
CMD ["node", "dist/server.js"]
