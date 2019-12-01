FROM node:8-alpine

WORKDIR /usr/src/frontend

COPY package.json package-lock.json /usr/src/frontend/

RUN npm install

COPY . /usr/src/frontend
