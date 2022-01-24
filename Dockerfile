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
