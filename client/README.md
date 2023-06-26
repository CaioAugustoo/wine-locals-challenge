# Client

Client is a Front-end application built with React.js and Next.js. It's a simple application that allows you to create and restaurants and dishes.

## Before you start

Please make sure that you have [yarn](https://classic.yarnpkg.com/lang/en/docs/install/) installed in your machine.
If you don't have installed it yet, please check [official yarn's website](https://classic.yarnpkg.com/lang/en/docs/install/)

## Tech stack

- React.js
- Next.js
- TypeScript
- Zod
  ...

## Getting started

As first step, you need to clone the repository. You can do it with:

```bash
$ git clone https://github.com/CaioAugustoo/wine-locals-challenge.git
```

You will get both `server` and `client` folders. Just run `cd client` in your terminal.

Now that you are inside `client` folder, you just need to run:

```bash
$ make start
```

or

```bash
$ ./scripts/start.sh
```

**NOTE**: Linux users could face some errors when try to run scripts from `./scripts` folder due to authorizations. If you are facing this issue, please run `chmod +x ./scripts/*` to give permission to run scripts.

When you run the above command, it will perform some actions, such as:

- Will check if `node_modules` folder exists
- Install dependencies
- Will check if `.env` file exists
- Copy `.env.example` file to `.env` if doesn't exist yet
- Finally, start the project based in `NODE_ENV` property from `.env` file

And that's it! Everything must be running well! Now you can have fun and send some requests at [http://localhost:3001](http://localhost:3001) :)

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

## Screenshots

![Create new restaurant](https://github.com/CaioAugustoo/wine-locals-challenge/blob/master/screenshots/create_new_restaurant.png)
![Create new dish](https://github.com/CaioAugustoo/wine-locals-challenge/blob/master/screenshots/create_new_restaurant_dish.png)
![Find restaurants](https://github.com/CaioAugustoo/wine-locals-challenge/blob/master/screenshots/feed_items.png)
![Find dishes from a restaurant](https://github.com/CaioAugustoo/wine-locals-challenge/blob/master/screenshots/restaurant_dishes_feed.png)

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
