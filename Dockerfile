FROM ubuntu
EXPOSE 3000
RUN mkdir /root/app
ADD modules /root/app/modules
ADD static /root/app/static
COPY .env /root/app/
ADD app.js /root/app/
ADD objects.json /root/app/
ADD package.json /root/app/

RUN cd /root/app; \
apt-get -y update; \
apt-get -y upgrade; \
apt-get -y install nodejs npm; \
npm install; \
chmod 777 /root/app/*; \
chmod +x /root/app


CMD ["node", "/root/app/app.js"];