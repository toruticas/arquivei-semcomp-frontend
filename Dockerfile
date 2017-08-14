FROM node:7.7-wheezy

COPY . /media
WORKDIR /media

RUN npm install -g babel-cli
RUN npm install

CMD ["npm", "start"]
