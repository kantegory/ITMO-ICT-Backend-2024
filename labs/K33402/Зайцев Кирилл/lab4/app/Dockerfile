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

# Build the TypeScript code.
RUN npm run build

# Expose the port the app runs on.
EXPOSE 3000

# Start the application.
CMD [ "node", "dist/index.js" ]
