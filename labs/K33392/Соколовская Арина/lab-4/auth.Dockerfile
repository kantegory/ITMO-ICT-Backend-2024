FROM node:18-alpine

WORKDIR /auth

COPY ./auth/package.json .

RUN npm install

COPY ./auth .

RUN npm run build

CMD ["npm", "start"]
