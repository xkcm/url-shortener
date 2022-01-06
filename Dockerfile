FROM node:12

WORKDIR /app

COPY . .

RUN yarn && yarn --cwd src/client

RUN yarn build:prod

RUN rm -rf src

CMD ["node", "dist/server/main.js"]
