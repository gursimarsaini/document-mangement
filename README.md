# Document Mangement
 Transcript management with blockchain
- - - -
## Steps for Installation
1. Install [node.js](https://nodejs.org/en/download/)
2. Once installed, open CMD and run: 
   '''
   npm install -g truffle@0.4.x
   '''
3. Also, install http-server, web3.js, jssha, command-line-args with:
   '''
   npm install --global http-server
   npm install web3
   npm install jssha
   npm install command-line-args
   '''
4. Move to the root directory on CMD and deploy the contract with:
   '''
   truffle migrate --network development
   '''
   *Note the Notary address generated*
5. Edit the Notary address in notaryWebLib.js in the website directory and notaryLib.js in clientApp directory with the address generated in the last step.
6. Install [ganache](https://www.trufflesuite.com/ganache)
7. While adding the project in a new workspace, select truffle-config.js from the main directory. By default ganache listens to 7545 port, so, this port is used for deployment.
8. Open CMD in the website directory and run:
   '''
   http-server
   '''
9. The project will be running at [localhost:8080](http://localhost:8080/)