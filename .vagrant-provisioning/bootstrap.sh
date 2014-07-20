#!/bin/bash

. /vagrant/.vagrant-provisioning/utils.sh

echo "==================================="
echo "Installation for Nodejs application"
echo "==================================="


pupdate-software

pecho "Install git-core, curl"
pinstall git-core
pinstall curl

pecho "Install MySQL Server"
debconf-set-selections <<< 'mysql-server mysql-server/root_password password demo'
debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password demo'
pinstall mysql-server

pecho "Folders creation"
pecho "|_ /opt/applications"
mkdir -p /opt/applications

pecho "Nodejs Installation"
pecho "-- Get binary"
cd /opt/applications
pwget http://nodejs.org/dist/v0.10.25/node-v0.10.25-linux-x86.tar.gz && tar xf node-v0.10.25-linux-x86.tar.gz
rm node-v0.10.25-linux-x86.tar.gz

pecho "-- Add Nodejs to the path"
echo "PATH=${PATH}:/opt/applications/node-v0.10.25-linux-x86/bin" >> /root/.bashrc
echo "NODE_PATH=/opt/applications/node-v0.10.25-linux-x86/lib/node_modules" >> /root/.bashrc
echo "PATH=${PATH}:/opt/applications/node-v0.10.25-linux-x86/bin" >> /home/vagrant/.bashrc
echo "NODE_PATH=/opt/applications/node-v0.10.25-linux-x86/lib/node_modules" >> /home/vagrant/.bashrc
source /root/.bashrc


chown vagrant:vagrant -R /opt/applications




