# syntax=docker/dockerfile:1

FROM node:14.17-slim

ENV NODE_ENV=development

COPY "package.json"  .

RUN npm install

COPY ./dist .

CMD ["node", "index.js"]