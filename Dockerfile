FROM node:12

WORKDIR /home/node/app

COPY ./ ./

RUN npm install

EXPOSE 3000

CMD [ "npx", "nest", "start" ]
