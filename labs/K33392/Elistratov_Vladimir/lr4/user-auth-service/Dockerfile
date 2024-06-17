FROM node:18

WORKDIR /usr/src/user-auth-service

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 9393

CMD [ "node", "dist/index.js" ]