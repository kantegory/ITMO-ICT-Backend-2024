FROM node:16

WORKDIR /usr/src/app

COPY package.json tsconfig.json ./
RUN npm install

COPY . .

EXPOSE 3004

CMD ["npx", "ts-node", "payment-service.ts"]
