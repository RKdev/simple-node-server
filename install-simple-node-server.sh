curl -O https://nodejs.org/dist/v4.2.3/node-v4.2.3.pkg
installer -pkg ./node-v4.2.3.pkg -target /
mkdir ~/simple-node-server
cp -R simple-node-server/* ~/simple-node-server
