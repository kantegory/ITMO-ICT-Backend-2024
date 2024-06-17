FROM node:22
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run bild

EXPOSE 4001

CMD ["npm", "start"]