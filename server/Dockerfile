FROM node:18

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --ignore-scripts --frozen-lockfile --non-interactive

COPY . .
RUN yarn prepare

CMD [ "yarn", "start:prod" ]
