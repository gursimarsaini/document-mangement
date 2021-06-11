var contract = undefined;
var customProvider = undefined;
var address = "0x618F4EBB52C75499dc58458Dc40473aFC4bc5199";
var abi = undefined;
let web3 = undefined;

function initialize () {
  // Check if Web3 has been injected by the browser (Mist/MetaMask)
  if ((typeof window.web3 !== 'undefined') || (typeof window.ethereum !== 'undefined')) {
    //alert('Ethereum interface injection error');
    } 
  
    let provider = new Web3.providers.HttpProvider("http://localhost:7545");
    web3 = new Web3(provider);

  abi = [
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

  contract = new web3.eth.Contract(abi, address);

};

//sends a hash to the blockchain
function sendTranscriptHash(hash, callback) {
    web3.eth.getAccounts(function (error, accounts) {
      contract.methods.addHash(hash).send({
        from: accounts[0]
      },function(error, tx) {
        if (error) callback(error, null);
        else callback(null, tx);
      });
    });
};

//looks up a hash on the blockchain
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