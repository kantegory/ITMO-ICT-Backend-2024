FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./


RUN npm install express

RUN npm install

COPY . .


CMD ["node", "dist/app.js"]

