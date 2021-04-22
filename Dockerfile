FROM node:12.13-alpine as production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY ./dist /usr/src/app/dist

CMD ["node", "dist/main"]