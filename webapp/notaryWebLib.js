
var contract = undefined;
var customProvider = undefined;
var address = "0x8cdaB1DE0D56e82203FeAFAC142Cbe8Cd0Ad44F3";
address = "0x94B3f6B4C0bC076E9f17202EFC3D0151Bfd2DDAc";
address = "0x13cf4cd2205fdd11cd5786206e100e0d8ec5f6d6";
var abi = undefined;
let web3 = undefined;



function notary_init () {

  // Check if Web3 has been injected by the browser (Mist/MetaMask)
  if ((typeof window.ethereum !== 'undefined')
    || (typeof window.web3 !== 'undefined')){
    alert('a');
  
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
      "name": "addDocHash",
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
      "name": "findDocHash",
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
function notary_send(hash, callback) {
  
    web3.eth.getAccounts(function (error, accounts) {
      contract.methods.addDocHash(hash).send({
        from: accounts[0]
      },function(error, tx) {
        if (error) callback(error, null);
        else callback(null, tx);
      });
    });
};

//looks up a hash on the blockchain
function notary_find (hash, callback) {
  // alert('hash');
  alert(hash);
  contract.methods.findDocHash(hash).call( function (error, result) {
    // alert('check1');
    if (error) alert(error);
    else {
      // alert('check2');
      let resultObj = {
        mineTime:  new Date(result[0] * 1000),
        blockNumber: result[1]
      }
      callback(null, resultObj);
    }
  });
};


