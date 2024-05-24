FROM node:20-alpine as builder
WORKDIR /app/core
COPY ../shared ../shared
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine as prod
WORKDIR /dist
COPY --from=builder /app/core/dist /dist