FROM node:latest
FROM ubuntu:latest

WORKDIR /root

RUN apt-get update && apt-get -y install cron
COPY cron /etc/cron.d/hello-cron
RUN chmod 0644 /etc/cron.d/hello-cron
RUN crontab /etc/cron.d/hello-cron
RUN touch /var/log/cron.log

RUN apt install -y curl
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs

ADD package* ./
RUN npm install

ADD . .

RUN npm test

CMD cron && tail -f /var/log/cron.log
