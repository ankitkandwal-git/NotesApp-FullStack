# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app/frontend

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Runtime stage (minimal image)
FROM node:20-alpine

WORKDIR /app/frontend

# Install serve to run the built app
RUN npm install -g serve

# Copy built files from builder stage
COPY --from=builder /app/frontend/dist ./dist

# Expose port
EXPOSE 5173

# Start serving the built app
CMD ["serve", "-s", "dist", "-l", "5173"]
