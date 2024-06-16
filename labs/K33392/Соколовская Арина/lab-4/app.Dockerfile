FROM node:18-alpine

WORKDIR /app

COPY ./hackathon_app/package.json .

RUN npm install

COPY ./hackathon_app .

RUN npm run build

CMD ["npm", "start"]
