#!/bin/sh

# Step 1: Secure MySQL Installation
echo "Securing MySQL installation..."
mysql_secure_installation <<EOF

Y
root
root
n
n
n
n
EOF

# Step 2: Download Sample Database
echo "Downloading sample database..."
curl -o db.sql https://www.w3resource.com/sql/sample-database-of-sql-in-mysql-format.txt

# Step 3: Create the Database
echo "Creating sample database..."
mysql -u root -proot <<EOF
CREATE DATABASE sample;
EXIT;
EOF

# Step 4: Import Data into the Database
echo "Importing sample database..."
mysql -u root -proot sample < db.sql

# Step 5: Create an Express App
echo "Setting up Express application..."
mkdir express_app
cd express_app
npm init -y
npm install mariadb express

echo "Setup complete!"

