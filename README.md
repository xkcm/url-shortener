# url-shortener

URL Shortening web application built with:
- **React** for frontend app,
- **NestJS** for backend service,
- **Redis** for database service.

## Running app

It is recommended to run the app with Docker. The app is built inside the container from source code.

```sh
docker-compose up # run docker
```

The app by default is running on port `3000`. Environment variables are stored in the `.env` file.