FROM node:8-alpine

WORKDIR /usr/src/frontend

COPY package.json yarn.lock /usr/src/frontend/

RUN yarn install

COPY . /usr/src/frontend
