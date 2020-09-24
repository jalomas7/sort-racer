FROM node:14

WORKDIR /sort-racer

COPY package.json yarn.lock ./
COPY ./server ./server
COPY tsconfig*.json ./

# copy all needed packages so it knows where to install them from
COPY packages/common packages/common
COPY packages/utils packages/utils

RUN yarn --production
WORKDIR /sort-racer/server
RUN yarn && yarn build

EXPOSE 443

CMD [ "node", "./build/server" ]