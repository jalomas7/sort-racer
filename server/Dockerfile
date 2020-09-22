FROM node:14

WORKDIR /server

COPY . ./src
COPY ../packages .

RUN cd src

RUN yarn

EXPOSE 8080

CMD [ "node", "./build/server" ]