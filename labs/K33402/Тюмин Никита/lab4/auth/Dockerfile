FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm update shared-core shared-database
COPY . .
RUN npm run build

FROM node:20-alpine as prod
WORKDIR /app
COPY --from=builder /app/dist /app
COPY .env /app/.env
EXPOSE 8000
CMD [ "node", "app.js" ]