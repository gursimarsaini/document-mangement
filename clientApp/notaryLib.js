const Web3 = require('web3');
const jsSHA = require("jssha");
const fs = require("fs");

let web3 = undefined;
let contract = undefined;

function initialize () {
  //set up network
  console.log('check');
  let provider = new Web3.providers.HttpProvider("http://localhost:8545");
  web3 = new Web3(provider);

  //contract abi
  let abi = [
    {
      "constant": false,
      "inputs": [
        {
          "name": "hash",
          "type": "bytes32"
        }
      ],
      "name": "addHash",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "hash",
          "type": "bytes32"
        }
      ],
      "name": "findHash",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    }
  ];

  //assign contract address
  let address = "0x618F4EBB52C75499dc58458Dc40473aFC4bc5199";

  //initialize contract
  contract = new web3.eth.Contract(abi, address);
};

//get a SHA-256 hash from a file --> works synchronously
function calculateTranscriptHash (fileName) {
  let fileContent = fs.readFileSync(fileName);
  return calculateTranscriptHashBytes(fileContent);
};

//get a SHA-256 hash from a data Buffer --> works synchronously
function calculateTranscriptHashBytes (data) {
  let  shaObj = new jsSHA("SHA-256", "ARRAYBUFFER");
  shaObj.update(data);
  let hash = "0x" + shaObj.getHash("HEX");
  return hash;
};

//adds hash to the blockchain
function sendTranscriptHash (hash, callback) {
    web3.eth.getAccounts(function (error, accounts) {
      contract.methods.addHash(hash).send({
        from: accounts[0]
      },function(error, tx) {
        if (error) callback(error, null);
        else callback(null, tx);
      });
    });
};

//find hash on the blockchain
function findTranscriptHash (hash, callback) {
  contract.methods.findHash(hash).call( function (error, result) {
    if (error) callback(error, null);
    else {
      let resultOp = {
        timestamp:  new Date(result[0] * 1000),
        blockNum: result[1]
      }
      callback(null, resultOp);
    }
  });
};

let contractExport = {
  findTranscriptHash : findTranscriptHash,
  sendTranscriptHash : sendTranscriptHash,
  calculateTranscriptHash : calculateTranscriptHash,
  initialize : initialize,
  calculateTranscriptHashBytes : calculateTranscriptHashBytes,
};

module.exports = contractExport;
