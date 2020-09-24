FROM node:14

WORKDIR /sort-racer

COPY package.json yarn.lock ./
COPY ./server ./server
COPY tsconfig*.json ./
COPY packages/common packages/common
COPY packages/utils packages/utils

RUN yarn
WORKDIR /sort-racer/server
RUN yarn build

EXPOSE 8080

CMD [ "node", "./build/server" ]