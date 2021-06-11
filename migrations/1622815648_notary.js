var transContract = artifacts.require("Notary");
module.exports = function(deployer) {
	deployer.deploy(transContract);
};