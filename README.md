# url-shortener

URL Shortening web application built with **React**, **NestJS** and **Redis Database**.

## Running app

```sh
git clone github.com/xkcm/url-shortener # clone this repo

yarn # install dependencies

yarn --cwd src/client # install dependencies for client app

yarn build:prod # build app

docker-compose up --build # run docker container with --build option
```

The app by default is running on port `3000`. App environment variables are stored in the `.env` file.