FROM node:18-alpine

WORKDIR /backend/service-articles

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE ${PORT}
CMD [ "npm", "run", "dev" ]