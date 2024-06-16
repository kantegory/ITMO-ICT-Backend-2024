FROM node:alpine
USER root
LABEL authors="Alexey Korotin K33392"
WORKDIR /app
COPY package.json package-lock.json /app/

RUN npm install
RUN mkdir "/app/src"
COPY src /app/src
COPY tsconfig.json .eslintrc.json .env /app/

RUN npm run build

ENTRYPOINT ["npm", "run", "runApp"]
