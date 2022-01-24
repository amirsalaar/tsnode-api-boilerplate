##### Development Image #####
FROM node:16.13 as dev-image

WORKDIR /usr/src/app
COPY . /usr/src/app

ARG app_port

# 1. Install typescript
# 2. Install packages (non-dev packages)
# 3. Build
RUN npm install -g typescript nodemon \
    && npm install \
    && npm run-script build

ENV NODE_ENV=development

EXPOSE $app_port

CMD [ "npm" , "run", "dev" ]
