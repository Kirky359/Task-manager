FROM node:20

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code and tsconfig
COPY . .

# Build TypeScript code
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]