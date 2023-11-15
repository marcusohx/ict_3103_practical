# Stage 1: Building the app with Git setup
FROM node:latest AS builder

# Install Git
RUN apt-get update && apt-get install -y git

# Set up Git account identity
RUN git config --global user.name "Marcus oh han yao"
RUN git config --global user.email "2101738@sit.singaporetech.edu.sg"

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Running the app
FROM node:latest

# Install necessary dependencies for Playwright
RUN apt-get update && apt-get install -y wget gnupg2 fonts-liberation libasound2 libatk-bridge2.0-0 libatspi2.0-0 libdrm2 libgbm1 libgtk-3-0 libnspr4 libnss3 libxcomposite1 libxdamage1 libxfixes3 libxkbcommon0 libxrandr2 xdg-utils


WORKDIR /app

# Copy everything from the build stage
COPY --from=builder /app .

RUN npx playwright install
RUN npx playwright install-deps

EXPOSE 3000
CMD ["npm", "start"]
