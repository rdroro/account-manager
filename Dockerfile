FROM node:0.12

MAINTAINER Romain Dubos <romain.dubos@gmail.com>

RUN apt-get update && apt-get install -y curl \
	git \
	python-software-properties \
	python \
	g++ \
	make

RUN mkdir -p /opt/app
COPY . /opt/app

RUN npm install -g sails@0.9.16 \
	grunt-cli@0.1.9
	bower
	
RUN cd /opt/app && npm install

WORKDIR /opt/app

EXPOSE  1337
CMD ["sails", "lift", "--prod"]
