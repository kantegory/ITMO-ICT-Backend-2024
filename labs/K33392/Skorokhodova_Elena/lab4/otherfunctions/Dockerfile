FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

# Установка Express
RUN npm install express

# Установка остальных зависимостей
RUN npm install

COPY . .


CMD ["node", "dist/app.js"]

