FROM node:latest as builder
# will be used by default until we override it with different value
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
# RUN get executed once at build time
RUN mkdir -p /usr/src/app
# it sets a specific path in one spot
WORKDIR /usr/src/app

COPY package*.json ./

RUN if [ "$NODE_ENV" = "development" ]; then npm install; else npm install --production=true; fi

COPY . .
# It runs after build time
CMD [ "npm", "run", "dev" ]