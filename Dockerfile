FROM node:10-alpine

WORKDIR /usr/app

COPY package*.json ./

ENV PATH /usr/app/node_modules/.bin:$PATH

USER root

RUN npm install

COPY --chown=node:node . .

# RUN npm run migration:run
# RUN npm run migration:generate
# RUN npm run seed
RUN npm run build

WORKDIR /usr/app

EXPOSE 3000
CMD npm run start:prod