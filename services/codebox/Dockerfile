# node + php + python
FROM node:19

# Install PHP & Docker
RUN apt update -y && apt install php -y && curl -sSL https://get.docker.com/ | sh

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
COPY ../.. ./
RUN yarn

CMD [ "yarn", "workspace", "@c/codebox", "start" ]