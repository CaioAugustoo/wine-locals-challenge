# Server

Server is the entry point to every action. If we want to create a new restaurant, Server will send it and so on.

## Before you start

Please make sure that you have both [yarn](https://classic.yarnpkg.com/lang/en/docs/install/) and [Docker](https://www.docker.com/) installed in your machine.
If you don't have installed it yet, please check [official yarn's website](https://classic.yarnpkg.com/lang/en/docs/install/) and [official Docker's website](https://www.docker.com/)

## Tech stack

- Node.js
- Nest.js
- TypeScript
- Jest
- Postgress
- Zod
- Redis
  ...

## Getting started

As first step, you need to clone the repository. You can do it with:

```bash
$ git clone https://github.com/CaioAugustoo/wine-locals-challenge.git
```

You will get both `server` and `client` folders. Just run `cd server` in your terminal.

Now that you are inside `server` folder, you just need to run:

```bash
$ make start
```

or

```bash
$ ./scripts/start.sh
```

**NOTE**: Linux users could face some errors when try to run scripts from `./scripts` folder. If you are facing this issue, please run `chmod +x ./scripts/*` to give permission to run scripts.

When you run the above command, it will perform some actions, such as:

- Will check if `node_modules` folder exists
- Install dependencies
- Will check if `.env` file exists
- Copy `.env.example` file to `.env` if doesn't exist yet
- Run containers from `docker-compose.yml` file (you need to run Docker on pc)
- Finally, start the project based in `NODE_ENV` property from `.env` file

And that's it! Everything must be running well! Now you can have fun and send some requests at [http://localhost:3002](http://localhost:3002) :)

If you want to destroy everything, you can run the following command:

```bash
$ make destroy
```

or

```bash
$ ./scripts/destroy.sh
```

When you run the above command, it will perform some actions, such as:

- Delete all containers created previously
- Delete `node_modules` folder

## Environment Variables

You may need some environment variables. Please check `.env.example` file if you think something is missing.

## Creating Docker image

This application is containerized with Docker. That means you can create a Docker image and run it in your machine.
Example:

```bash
docker build -t wine_locals_challenge .
```

then run it with:

```bash
docker run -e REDIS_URI="redis://host.docker.internal:6379" -e DATABASE_URL="postgresql://postgres:postgres@host.docker.internal:5432/share-eat-db?schema=public" -e PORT=3002 wine_locals_challenge
```

**Note**: Please, make sure all variables are correct. See `.env.example` or `Dockerfile` file if you think something is missing.

Also you need to push migrations to database. You can do it by running:

```bash
  npx prisma db push
```

Finally, you probably would like to send some requests. You can access `/api` route to see docs from Swagger! Example: [http://localhost:3002/api](http://localhost:3002/api)

Tip: `insomnia.json` file contains all routes from API. Just import the file into insomnia and it will save your time!

## Running Tests

To run unit tests, run the following command:

```bash
$ yarn test
```

To run end-to-end (e2e) tests, run the following command:

```bash
$ yarn test:e2e
```

## API Reference

**Note**: All routes are protected using `api_key` header.

You can access `/api` route to see docs from Swagger! Example: [http://localhost:3002/api](http://localhost:3002/api)

Tip: `insomnia.json` file contains all routes from API. Just import the file into insomnia and it will save your time!

#### Get all restaurants

```http
  GET /restaurants?page=1
```

| Parameter | Type     | Description                                               |
| :-------- | :------- | :-------------------------------------------------------- |
| `page`    | `number` | **Optional**. Page for paginated results. Defaults to _1_ |

Example:

```curl
curl --request GET \
  --url 'http://localhost:3002/restaurants?page=1' \
  --header 'api_key: XXXX'
```

#### Get restaurant

```http
  GET /restaurants/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

Example:

```curl
curl --request GET \
  --url http://localhost:3002/restaurants/fc7dc170-2c5e-43a6-a78d-a1ba255626b9 \
  --header 'api_key: XXXX'
```

#### Create restaurant

```http
  POST /restaurants
```

| Parameter | Type     | Description                                 | Constraints                   |
| :-------- | :------- | :------------------------------------------ | :---------------------------- |
| `name`    | `string` | **Required**. Restaurant name to be created | Min length: 3, Max length: 50 |

Example:

```curl
curl --request POST \
  --url http://localhost:3002/restaurants \
  --header 'Content-Type: application/json' \
  --header 'api_key: XXXX' \
  --data '{
	"name": "My amazing restaurant"
}'
```

#### List all dishes from a restaurant

```http
  GET /restaurants/${id}/dishes
```

| Parameter | Type     | Description                                               |
| :-------- | :------- | :-------------------------------------------------------- |
| `id`      | `string` | **Required**. Id of restaurant                            |
| `page`    | `number` | **Optional**. Page for paginated results. Defaults to _1_ |

Example:

```curl
curl --request GET \
  --url 'http://localhost:3002/restaurants/fc7dc170-2c5e-43a6-a78d-a1ba255626b9/dishes?page=1' \
  --header 'api_key: XXXX'
```

#### Create a new restaurant's dish

```http
  POST /restaurants/${id}/dishes
```

| Parameter     | Type     | Description                                  | Constraints                    |
| :------------ | :------- | :------------------------------------------- | :----------------------------- |
| `id`          | `string` | **Required**. Id of restaurant               | N/A                            |
| `name`        | `string` | **Required**. Dish name to be created        | Min length: 3, Max length: 50  |
| `price`       | `number` | **Required**. Dish price to be created       | Min value: 0                   |
| `description` | `string` | **Required**. Dish description to be created | Min length: 3, Max length: 200 |

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Authors

- [@caioaugustoo](https://www.github.com/caioaugustoo)

## Features

- Find restaurants
- Find dishes from a restaurant
- Create dishes
- Create restaurants

## Support

For support, email caioamfr@gmail.com
