FROM node:12

WORKDIR /app

COPY . .

RUN npm install

ENV PORT=3000

EXPOSE 3000:3000

RUN npm run build

CMD ["npm", "run", "start:prod"]
