############### Base Image ###############
FROM node:14-buster-slim AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

############### Build Image ###############
FROM base AS build

ARG app_env=production
ARG app_port=8080

WORKDIR /build
COPY --from=base /app ./

ENV NODE_ENV=${app_env}
ENV PORT=${app_port}
EXPOSE ${app_port}

RUN npm run build

############### Deploy Image ###############
FROM node:14.18.1-alpine AS production

ARG app_env=production
ENV NODE_ENV=${app_env}
WORKDIR /app
COPY --from=build /build/package*.json ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public
RUN npm install next

EXPOSE 3000
CMD npm run start




##### Development Image #####
FROM node:16.13 as dev-image

WORKDIR /usr/src/app
COPY . /usr/src/app

ARG app_port

# 1. Install typescript
# 2. Install packages (dev packages)
# 3. Build
RUN npm install -g typescript nodemon \
    && npm install --development \
    && npm run-script build

ENV NODE_ENV=development

EXPOSE $app_port

CMD [ "npm" , "run", "dev" ]

##########################################
##### Production Image #####

FROM node:16.13 as prod-image

ARG app_port
ARG app_env

WORKDIR /usr/src/app
COPY . /usr/src/app

# `build` script needs some dev dependencies, so copy the `dist` folder from the `dev-image` that builds the dist
COPY --from=dev-image /usr/src/app/dist ./dist

# 1. Install typescript
# 2. Install packages (production packages)
RUN npm install -g typescript \
    && npm install --production

ENV NODE_ENV=${app_env}

EXPOSE $app_port

CMD [ "npm", "start" ]
