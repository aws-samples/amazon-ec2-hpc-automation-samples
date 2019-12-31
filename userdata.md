#!/bin/bash 
cd /root/reInvent/app
wget https://<<REPLACE WITH YOUR S3 BUCKET PATH>>/HPCinput/datainput.csv
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 6.14.0
node -e "console.log('Running Node.js ' + process.version)"
/root/.nvm/versions/node/v6.14.0/bin/node /root/reInvent/app/app.js >/root/reInvent/app/logs/stdout.txt 2> /root/reInvent/app/logs/stderr.txt &
