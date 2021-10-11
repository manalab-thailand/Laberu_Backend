FROM node:12.13-alpine as production

ENV DATABASE_NAME='laberu'
ENV DATABASE_USERNAME='laberu'
ENV DATABASE_PASSWORD='ceKXOFfskNW3Sgyx'

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY ./dist /usr/src/app/dist

CMD ["node", "dist/main"]