FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./src/package.json /usr/src/app/
RUN npm install
COPY ./src /usr/src/app
EXPOSE 3000
CMD [ "npm", "start" ]