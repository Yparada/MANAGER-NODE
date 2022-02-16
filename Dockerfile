FROM node:16.13.1-alpine3.14

WORKDIR /app
COPY . .
RUN npm install --production

CMD [ "node", "/app/src/index.js" ]