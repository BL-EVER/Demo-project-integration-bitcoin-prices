FROM node:16

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install pm2 -g

RUN npm install

COPY . .

EXPOSE 3001
CMD [ "pm2-runtime", "server.js" ]