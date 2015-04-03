FROM node:0.12.2

# Bundle app source
COPY . /src
# Install app dependencies
RUN cd /src; npm install && node_modules/.bin/bower install --allow-root


EXPOSE  1337
CMD ["bash", "/src/start"]
