var Nebulas = require('nebulas');
var Neb = Nebulas.Neb;
var Account = Nebulas.Account;
var nebClient = new Neb();
nebClient.setRequest(new Nebulas.HttpRequest('https://testnet.nebulas.io'));
var api = nebClient.api;

var v4 =
	'{"version":4,"id":"13ea098e-e8f5-4223-abe4-383097f7a422","address":"n1X8LWYbQbQqv8fZQmwFpo6azYRT6NxpEPc","crypto":{"ciphertext":"4ddfb2cbb82e591225ba7d2e1ebc8ddc9444f8ef0546b5ed2252021d319586c6","cipherparams":{"iv":"17b7a4ab91c88275d7bcefc53345f65c"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"6185bfe35c89d3498c33a9f878fa2e7e9a13f0c4f5102ce7e7b0af5c2c188e43","n":4096,"r":8,"p":1},"mac":"f76215ce79c6bbb99cd1f19330b6e88d3d96741ab523102fcd0a028f2bff0cd3","machash":"sha3256"}}';
var acc = new Account();
var dappAddress = 'n1oXdmwuo5jJRExnZR5rbceMEyzRsPeALgm';
acc = acc.fromKey(v4, 'nodecapital', true);

var from = acc.getAddressString();
var value = '0';
var nonce = '0';
var gas_price = '1000000';
var gas_limit = '2000000';

function createRank(rank) {
	if (!rank) {
		return;
	}
	const req = {
		name: rank.name,
		description: rank.description,
		max_voter: rank.max_voter,
		items: rank.items
	};

	var callFunction = 'createRank';
	var callArgs = '["' + JSON.stringify(req) + '"]';
	var contract = {
		function: callFunction,
		args: callArgs
	};
	return new Promise(function(resolve, reject) {
		api
			.call(from, dappAddress, value, nonce, gas_price, gas_limit, contract)
			.then(function(resp) {
				resolve(resp);
			})
			.catch(function(err) {
				reject(err);
			});
	});
}

function inviteVoter(voter) {
	if (!voter) {
		return;
	}
	const req = {
		name: voter.name,
		description: voter.description,
		rankId: voter.rankId
	};

	var callFunction = 'inviteVoter';
	var callArgs = '["' + JSON.stringify(req) + '"]';
	var contract = {
		function: callFunction,
		args: callArgs
	};
	return new Promise(function(resolve, reject) {
		api
			.call(from, dappAddress, value, nonce, gas_price, gas_limit, contract)
			.then(function(resp) {
				resolve(resp);
			})
			.catch(function(err) {
				reject(err);
			});
	});
}

function vote(v) {
	if (!v) {
		return;
	}

	const req = {
		itemId: v.itemId,
		rankId: v.rankId
	};

	var callFunction = 'vote';
	var callArgs = '["' + JSON.stringify(req) + '"]';
	var contract = {
		function: callFunction,
		args: callArgs
	};
	return new Promise(function(resolve, reject) {
		api
			.call(from, dappAddress, value, nonce, gas_price, gas_limit, contract)
			.then(function(resp) {
				resolve(resp);
			})
			.catch(function(err) {
				reject(err);
			});
	});
}

function getVoteInfo(rankId) {
	if (!rankId) {
		return;
	}

	var callFunction = 'getVoteInfo';
	var callArgs = '["' + rankId + '"]';
	var contract = {
		function: callFunction,
		args: callArgs
	};
	return new Promise(function(resolve, reject) {
		api
			.call(from, dappAddress, value, nonce, gas_price, gas_limit, contract)
			.then(function(resp) {
				resolve(resp);
			})
			.catch(function(err) {
				reject(err);
			});
	});
}

function getRanksInfo() {
	var callFunction = 'getRanksInfo';
	var callArgs = '[0]';
	var contract = {
		function: callFunction,
		args: callArgs
	};
	return new Promise(function(resolve, reject) {
		api
			.call(from, dappAddress, value, nonce, gas_price, gas_limit, contract)
			.then(function(resp) {
				resolve(resp);
			})
			.catch(function(err) {
				reject(err);
			});
	});
}

module.exports = {
	createRank,
	inviteVoter,
	vote,
	getVoteInfo,
	getRanksInfo
};
