FROM node:16-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:16-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/src ./src
COPY --from=build /usr/src/app/index.js ./
COPY --from=build /usr/src/app/package*.json ./

RUN npm ci --only=production

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 8001

CMD ["node", "index.js"]
