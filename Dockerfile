FROM node:15-alpine as base

WORKDIR /src
COPY package*.json /
EXPOSE ${API_PORT}

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . /
CMD ["node", "bin/www"]

FROM base as development
ENV NODE_ENV=development
RUN yarn install
COPY . /
CMD ["start:dev", "bin/www"]
