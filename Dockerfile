FROM node:16

WORKDIR /app
COPY modules ./modules
COPY static ./static
COPY .env .
COPY app.js .
COPY objects.json .
COPY package.json .

RUN apt-get -y update; \
apt-get -y upgrade; \
apt-get -y install nodejs npm; \
npm install

EXPOSE 3000
CMD ["node", "app.js"];