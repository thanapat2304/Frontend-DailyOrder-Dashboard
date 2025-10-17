# Multi-stage build
# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
# Use npm install with legacy peer deps to handle dependency conflicts
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine AS production

# Set working directory
WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy built application from builder stage
COPY --from=builder /app/build ./build

# Expose port 8093
EXPOSE 8093

# Start the application
CMD ["serve", "-s", "build", "-l", "8093"]
