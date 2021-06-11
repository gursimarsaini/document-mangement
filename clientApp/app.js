const calls = require('./notaryLib.js');
const cmdArgs = require('command-line-args');

const cmdLineOptions = [
  {
    name: "addTranscript",
    alias: "a",
    type: String
  },
  {
    name: "findTranscript",
    alias: "f",
    type: String
  }
];
const choices = cmdArgs(cmdLineOptions);

calls.initialize();

if (choices.addTranscript) {
  console.log("Sending hash for transcript: " + choices.addTranscript);
  let hash = calls.calculateTranscriptHash(choices.addTranscript);
  console.log("Hash value: " + hash);
  calls.sendTranscriptHash(hash, function(error, tx) {
    console.log("Transaction ID: " + tx);
  });
}
else if (choices.findTranscript) {
  console.log("Looking up hash for file: " + choices.findTranscript);
  let hash = calls.calculateTranscriptHash(choices.findTranscript);
  console.log("Hash value: " + hash);
  calls.findTranscriptHash(hash, function (error, result) {
    if (result.blockNum!=0)
    {
      console.log("Transcript found at block No.: " + result.blockNum);
      console.log("Time added: " + result.timestamp);
    }
    else console.log("Transcript not found on blockchain");
  });
}
else {
  console.log("Choice not available");
}