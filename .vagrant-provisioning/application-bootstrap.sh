#!/bin/bash

. /vagrant/.vagrant-provisioning/utils.sh

pecho "Application tools"
pecho "-- Install SailsJs via npm"
/opt/applications/node-v0.10.25-linux-x86/bin/npm install -g sails@0.9.16

pecho "-- Install SailsJs via npm"
/opt/applications/node-v0.10.25-linux-x86/bin/npm install -g nodemon


mysql -u root -pdemo -e "CREATE DATABASE account_manager"

mysql -u root -pdemo account_manager -e "INSERT INTO user (login, name, password) VALUES ('rdroro', 'Romain Dubos', md5('demo'));"