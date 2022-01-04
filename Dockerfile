FROM node:12

WORKDIR /app

COPY package.json .

RUN yarn

COPY dist /app/dist

COPY .env /app

CMD ["node", "dist/server/main.js"]
