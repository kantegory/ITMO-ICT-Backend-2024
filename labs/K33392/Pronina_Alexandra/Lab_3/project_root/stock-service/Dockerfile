FROM node:16

WORKDIR /usr/src/app

COPY package.json tsconfig.json ./
RUN npm install

COPY . .

EXPOSE 3005

CMD ["npx", "ts-node", "stock-service.ts"]
