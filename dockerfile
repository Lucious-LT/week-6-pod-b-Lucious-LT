FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN yarn

RUN yarn tsc --init

COPY ./ ./

EXPOSE 3000

CMD ["yarn", "start"]
