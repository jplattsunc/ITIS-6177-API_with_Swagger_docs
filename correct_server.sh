#!/bin/sh

# Install necessary packages
yum install epel-release yum-utils -y

# Optional: Install and start Nginx if needed
# yum install nginx -y
# systemctl start nginx
# systemctl enable nginx

# Install and configure firewalld
yum install firewalld -y
systemctl start firewalld
systemctl enable firewalld

# Open necessary ports and services
firewall-cmd --permanent --zone=public --add-service=http
firewall-cmd --permanent --zone=public --add-service=https
firewall-cmd --permanent --zone=public --add-port=3000/tcp
firewall-cmd --permanent --zone=public --add-port=3001/tcp
firewall-cmd --permanent --zone=public --add-port=3002/tcp
firewall-cmd --permanent --zone=public --add-port=3003/tcp
firewall-cmd --reload

# Update yum cache
yum makecache

# Install Git
yum install git -y

# Install Node.js 20.x
curl -sL https://rpm.nodesource.com/setup_20.x | bash -
yum install nodejs -y

# Install MariaDB and enable the service
yum install mariadb-server -y
systemctl start mariadb.service
systemctl enable mariadb.service

# Verify installations
git --version
node --version
npm --version

