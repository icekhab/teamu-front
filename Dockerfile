FROM node:11.9-alpine

ENV TZ=Europe/Moscow
RUN apk add --no-cache tzdata bash curl

WORKDIR /home/node/client
COPY ./ ./

RUN npm install

ENTRYPOINT ./entrypoint.sh
