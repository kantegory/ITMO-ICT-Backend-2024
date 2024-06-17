FROM node:18

WORKDIR /usr/src/monolith

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 9191

CMD [ "node", "dist/index.js" ]