forever stop ./bin/www
PORT=3030 NODE_TYPE=master forever -a -o cwebsite.log -e cwebsite.log start ./bin/www
