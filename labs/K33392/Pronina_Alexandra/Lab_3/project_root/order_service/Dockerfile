FROM node:16

WORKDIR /usr/src/app

COPY package.json tsconfig.json ./
RUN npm install

COPY . .

EXPOSE 3002

CMD ["npx", "ts-node", "order-service.ts"]
