mkdir -Force $HOME\.ssh
vi _prepare_server.sh
ls - la
ls -lah
chmod 744 _prepare_server.sh
ls -lah
./_prepare_server.sh
[200~mysql_secure_installation
~mysql_secure_installation
mysql_secure_installation
nodejs --version
node --version
node -version
node -v
node --version
echo $PATH
curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
yum install -y nodejs
node -v
yum clean all
yum makecache
yum install -y nodejs
free -h
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
free -h
ls
echo '/swapfile swap swap defaults 0 0' >> /etc/fstab
yum install -y nodejs
vi correct_server.sh
chmod +x startup.sh
chmod +x correct_server.sh
ls
./correct_server.sh
vi setup_correct_server.sh
chmod +x setup_server.sh
chmod +x setup_correct_server.sh
./setup_correct_server.sh
ls
vi
node app.js
npm install express mariadb
npm list --depth=0
node app.js
ls
vi app_correct.js
node app_correct.js
./correct_server.sh
ps aux | grep node
curl http://localhost:3000
curl http://localhost:3000/customers
systemctl status mariadb
./correct_server.sh
node app_correct.js
ps aux | grep node
node app_correct.js
curl http://localhost:3000
node app_correct.js
./correct_server.sh
mysql -u root -proot -e "USE sample; SHOW TABLES;"
mysql -u root -proot -e "SELECT * FROM sample.customer LIMIT 5;"
curl http://localhost:3000/customers
vi app_correct.js
node app_correct.js
curl http://localhost:3000/customers
vi db_test.js
node db_test.js
mysql -u root -proot -e "SELECT User, Host FROM mysql.user;"
mysql -u root -proot -e "SHOW GRANTS FOR 'root'@'localhost';"
node db_test.js
mysql -u root
pkill app_correct.js
node app_correct.js
Get-Process -Name "node"
ps aux | grep node
kill 20758
ps aux | grep node
node app_correct.js
curl http://104.236.37.149:3000/customers
curl http://104.236.37.149:3000/customers/C00013/orders
pkill node
vi /etc/my.cnf.d/mariadb-server.cnf
firewall-cmd --permanent --zone=public --add-port=3306/tcp
firewall-cmd --reload
mysql -h 104.236.37.149 -u root -proot
mysql -u root -proot
netstat -tuln | grep 3306
mysql -h 104.236.37.149 -u root -proot
LS
PWD
ls
vi app_correct.js
pkill node
node app_correct.js
ls
ls -la
pwd
ls
code .
ls
npm install express-validator swagger-jsdoc swagger-ui-express
firewall-cmd --permanent --zone=public --add-port=3000/tcp
firewall-cmd --reload
./correct_server.sh
node app_correct.js
npm list swagger-ui-express swagger-jsdoc express-validator
pm2 restart app_correct.js
ps aux | grep node
./correct_server.sh
node app_correct.js
./correct_server.sh
node app_correct.js
mysql -u root -p
./correct_server.sh
node app_correct.js
mysql -u root -p
node app_correct.js
mysql -u root -p -e "SHOW DATABASES;"
chmod +x setup_correct_server.sh
./setup_correct_server.sh
mysql -u root -p -e "SHOW DATABASES;"
mysql -u root -p
node app_correct.js
rm app.js
rm _prepare_server.sh
node app_correct.js
mysql -u root -p
node app_correct.js
curl -X POST -H "Content-Type: application/json" -d '{"CUST_CODE":"C00012","CUST_NAME":"Test Customer"}' http://104.236.37.149:3000/customers
node app_correct.js
lsof -i :3000
netstat -tulnp | grep 3000
node app_correct.js
curl -X POST -H "Content-Type: application/json" -d '{"CUST_CODE":"C00012","CUST_NAME":"Test Customer"}' http://104.236.37.149:3000/customers
curl -X POST -H "Content-Type: application/json" -d '{"CUST_CODE":"C00012","CUST_NAME":"Test Customer"}' http://104.236.37.149:3000/customers
node app_correct.js
pwd
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/jplattsunc/ITIS-6177-API_with_Swagger_docs
git branch -M main
git push -u origin main
git branch
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
git push -u origin master
git status
vi .gitignore
git add .gitignore
git commit -m "Initial commit"
git config --global user.email "jplatts@charlotte.edu"
git config --global user.name "jplattsunc"
git commit -m "Initial commit"
git push -u origin main
git rm -r --cached node_modules
git commit -m "Remove node_modules from repository"
git push
vi .gitignore
git rm -r --cached .vscode-server
git rm -r --cached .cache
git add .gitignore
git commit -m "Update .gitignore and remove unnecessary files"
git push
vi .gitignore
git rm -r --cached .ssh
git rm -r --cached .npm
git add .gitignore
git commit -m "Update .gitignore and remove sensitive/cache directories"
git push
vi .gitignore
git rm -r --cached node_modules
git rm -r --cached express_app/node_modules
git add .gitignore
git commit -m "Update .gitignore"
git push
nohup node app_correct.js > output.log 2>&1 &
curl "http://104.236.37.149:3000/say?keyword=hello"
pm2 logs
journalctl -u your-node-service --no-pager --lines=50
curl -i "https://abc123.execute-api.us-east-1.amazonaws.com/default/SayFunction?keyword=hello"
curl "http://104.236.37.149:3000/say?keyword=hello"
curl -i "https://fmxb2tenr2.execute-api.us-east-2.amazonaws.com/default/SayFunction"
curl -i "https://fmxb2tenr2.execute-api.us-east-2.amazonaws.com/default/SayFunction?keyword=hello"
tasklist
tasklist | findstr
ps aux
node app_correct.js
npm install axios
curl "http://104.236.37.149:3000/say?keyword=hello"
node app_correct.js
