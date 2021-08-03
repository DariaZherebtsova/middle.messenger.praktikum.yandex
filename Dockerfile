FROM node:12
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build:dev
EXPOSE 3000
CMD PORT=$PORT node server.js