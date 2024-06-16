FROM node:18-alpine

WORKDIR /gateway

COPY ./gateway/package.json .

RUN npm install

COPY ./gateway .

RUN npm run build

CMD ["npm", "start"]
