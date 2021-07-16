FROM node:12
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build:dev
EXPOSE 3000
CMD PORT=$PORT node server.js