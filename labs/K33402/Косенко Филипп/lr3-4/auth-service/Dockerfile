# FROM node:lts-alpine
# ENV NODE_ENV=production
# WORKDIR /usr/src/app
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install --production --silent && mv node_modules ../
# COPY . .
# EXPOSE 8000
# RUN chown -R node /usr/src/app
# USER node
# CMD ["npm", "start"]

FROM node:22
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run bild

EXPOSE 4001

CMD ["npm", "start"]
