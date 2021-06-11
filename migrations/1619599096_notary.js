var NotaryContract = artifacts.require("Notary");
module.exports = function(_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(NotaryContract);
};
