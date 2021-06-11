pragma solidity ^0.4.22;

contract Notary {
	struct transStruct {
   		uint timestamp;
   		uint blockNum;
  	}

	mapping (bytes32 => transStruct) private transHashes;

	function Notary() public { 
		// constructor 
	}

	function addHash (bytes32 hash) public {
  		transStruct memory newtransStruct = transStruct(now, block.number);
   		transHashes[hash] = newtransStruct;
  	}

	function findHash (bytes32 hash) public constant returns(uint, uint) {
   		return (transHashes[hash].timestamp, transHashes[hash].blockNum);
 	}
}
