# Dockerfile-client
FROM node:lts-alpine3.17

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV API_BASE_URL=http://server:3000

RUN npm run build

EXPOSE 3000

CMD ["node", "build/index.js"]

