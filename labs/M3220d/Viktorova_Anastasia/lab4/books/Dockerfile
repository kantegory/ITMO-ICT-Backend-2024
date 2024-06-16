FROM node

COPY . /book_server

WORKDIR /book_server

EXPOSE 8001

RUN npm install

CMD [ "npm", "start" ]