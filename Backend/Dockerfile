# Stage 1: Build stage
FROM node:20-alpine

# Set working directory
WORKDIR /app/backend

# Install build tools for native modules
RUN apk add --no-cache python3 make g++

# Copy package files first
COPY package*.json ./

# Install dependencies (builds native modules for Linux)
RUN npm install --production

# Rebuild native modules to ensure Linux binaries
RUN npm rebuild

# Copy application code
COPY . ./

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start the application
CMD ["npm", "run", "dev"]
