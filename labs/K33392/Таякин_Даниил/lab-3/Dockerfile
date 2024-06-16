FROM node:18.15 as build

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

RUN npm run build

ENTRYPOINT [ "npm", "run", "serve" ]