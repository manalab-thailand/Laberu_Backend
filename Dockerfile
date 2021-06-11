FROM node:12.13-alpine as production

ENV DATABASE_USERNAME='Surachet'
ENV DATABASE_PASSWORD='0939342490'
ENV DATABASE_NAME='laberu'

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY ./dist /usr/src/app/dist

CMD ["node", "dist/main"]