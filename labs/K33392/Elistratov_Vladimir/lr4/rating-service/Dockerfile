FROM node:18

WORKDIR /usr/src/rating-service

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 9292

CMD [ "node", "dist/index.js" ]