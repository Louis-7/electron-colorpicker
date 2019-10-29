const nodeAbi = require('node-abi');

console.log("node: " + nodeAbi.getAbi('10.11.0','node'));
console.log("electron: " + nodeAbi.getAbi('4.2.6','electron'));