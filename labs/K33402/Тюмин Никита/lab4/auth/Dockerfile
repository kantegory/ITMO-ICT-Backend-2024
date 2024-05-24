FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm update shared-core shared-database
COPY . .
RUN npm run build
RUN ls -la /app/dist
RUN ls -la /app

EXPOSE 8000
CMD [ "node", "dist/app.js" ]