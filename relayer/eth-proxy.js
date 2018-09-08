const Web3 = require('web3');
const Contract = require('truffle-contract');
const Config = require('./config');

let EthProxy = function () {};

let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
let provider = web3.currentProvider;

EthProxy.saveInfo = function (data) {
    console.log('Starting sending data to blockchain...: ' + JSON.stringify(data));
    const Project = loadContract('Project');
    let project = Project.at(Config.projectContractAddress);
    
    return project.validate(data.quality, data.time);
};

function loadContract(contractName) {
    const contractsFolder = '../../blockchain/build/contracts/';
    const artefacts = require(contractsFolder + contractName + '.json');
    var contractObj = Contract(artefacts);
    contractObj.setProvider(provider);
  
    return contractObj;
    return {};
}

module.exports = EthProxy;