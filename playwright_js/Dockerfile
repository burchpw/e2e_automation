FROM node:26.11-trixie-slim
WORKDIR /playwright_js

# Install Dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Enable Corepack And Prepare Yarn
RUN npm install -g corepack@latest && corepack enable

# Copy Packages
COPY package*.json yarn.lock* ./

# Install Yarn
RUN yarn install --immutable

# Install Playwright Dependencies
RUN yarn exec playwright install
RUN yarn exec playwright install-deps

# Copy files
COPY playwright.config.js playwright.config.js
COPY ./encrypted_data/ ./encrypted_data/
COPY ./helpers/ ./helpers/
COPY ./lib/ ./lib/
COPY ./page_objects/ ./page_objects/
COPY ./specs/ ./specs/