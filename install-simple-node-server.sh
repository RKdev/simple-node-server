jmpdir=$(pwd)
PATH=$PATH:/usr/local/bin;export PATH

mkdir ~/simple-node-server
cd ~/simple-node-server
npm install
cd $jmpdir
cp -R simple-node-server/* ~/simple-node-server
