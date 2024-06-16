# Use the official Node.js image.
FROM node:18

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available).
COPY package*.json ./

# Install the dependencies.
RUN npm install

# Copy the rest of your application code.
COPY . .

# Expose the port the microservice runs on.
EXPOSE 3001

# Start the microservice.
CMD [ "npx", "ts-node-dev", "src/index.ts" ]
