FROM node:20-alpine
WORKDIR /app

COPY . .
RUN npm install
RUN npm update shared-core shared-database
RUN npm run build

EXPOSE 8000
CMD [ "ls" ]
CMD [ "node", "dist/app.js" ]