FROM node:20-alpine

WORKDIR /app

COPY package.json /app

RUN npm install --production

CMD ["node", "main.mjs"]