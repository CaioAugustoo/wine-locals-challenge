FROM node:18

WORKDIR /usr

COPY package.json yarn.lock ./
RUN yarn install --ignore-scripts --frozen-lockfile --non-interactive

COPY . .
RUN yarn prepare
RUN yarn prisma:generate
RUN yarn build

CMD [ "yarn", "start:prod" ]
