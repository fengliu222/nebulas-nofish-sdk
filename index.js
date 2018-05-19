var nebulas = require('nebulas');
var Neb = require('nebulas').Neb;
var Account = require('nebulas').Account;
var nebClient = new Neb()
nebClient.setRequest(new nebulas.HttpRequest("https://mainnet.nebulas.io"))
var api = nebClient.api

var v4 = '{"version":4,"id":"4b80625e-eef0-42f4-97ad-e4005b3b20a1","address":"n1Uvh5mFqNWApVdWXnWKxaiRrMPYcBsfWWN","crypto":{"ciphertext":"64f7267c6376ceea314e579d29ddf7b7032401bd97acbcb969c42f2460e6fd6c","cipherparams":{"iv":"37ac99ce2e44095d0fca8d4a59200559"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"31cc27adc182aeb1a626af47ca53926cdd3cb0df819b357aff1766daefb83e24","n":4096,"r":8,"p":1},"mac":"976c44d7a7be970e5512c59a9e812143216d50c02a51c3d6c8ac3db7844e0943","machash":"sha3256"}}';
var acc = new Account();
var dappAddress = "n1hmq48fbGLubbWoPVBEjhaYNKqr53SXPGj";
acc = acc.fromKey(v4, "liuzhenkuo0316", true);

var from = acc.getAddressString();
var value = '0';
var nonce = '0';
var gas_price = '1000000';
var gas_limit = '2000000';

var parseRes = function(text){
    const t = JSON.parse(text.result)
    return t
}
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

    var callFunction = "createRank";
    var callArgs = "[\"" + JSON.stringify(req) + "\"]";
    var contract = {
        "function": callFunction,
        "args": callArgs
    }
    return new Promise(function(resolve, reject){
    api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(function (resp) {
            resolve(parseRes(resp))
        }).catch(function (err) {
            reject(err)
        })  
    })
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

    var callFunction = "inviteVoter";
    var callArgs = "[\"" + JSON.stringify(req) + "\"]";
    var contract = {
        "function": callFunction,
        "args": callArgs
    }
    return new Promise(function(resolve, reject){
        api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(function (resp) {
            resolve(parseRes(resp))
        }).catch(function (err) {
            reject(err)
        })  
    })
}

function vote(v) {
	if (!v) {
		return;
	}

    var callFunction = "vote";
    var callArgs = "[\"" + JSON.stringify(req) + "\"]";
    var contract = {
        "function": callFunction,
        "args": callArgs
    }
    return new Promise(function(resolve, reject){
        api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(function (resp) {
            resolve(parseRes(resp))
        }).catch(function (err) {
            reject(err)
        })  
    })
}

function getVoteInfo(rankId) {
	if (!rankId) {
		return;
	}

    var callFunction = "getVoteInfo";
    var callArgs = "[\"" + rankId + "\"]";
    var contract = {
        "function": callFunction,
        "args": callArgs
    }
    return new Promise(function(resolve, reject){
        api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(function (resp) {
            resolve(parseRes(resp))
        }).catch(function (err) {
            reject(err)
        })  
    })
}

function getRanksInfo() {
    var callFunction = "getRanksInfo";
    var callArgs = "[\"\"]";
    var contract = {
        "function": callFunction,
        "args": callArgs
    }
    return new Promise(function(resolve, reject){
        api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(function (resp) {
            resolve(parseRes(resp))
        }).catch(function (err) {
            reject(err)
        })  
    })
}

function getRankById(id) {
    var callFunction = "getRankInfo";
    var callArgs = "[\"" + id + "\"]";
    var contract = {
        "function": callFunction,
        "args": callArgs
    }
    return new Promise(function(resolve, reject){
        api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(function (resp) {
            resolve(parseRes(resp))
        }).catch(function (err) {
            reject(err)
        })  
    })
}

module.exports = {
	createRank,
	inviteVoter,
	vote,
	getVoteInfo,
    getRanksInfo,
    getRankById
};


getRanksInfo().then(function(res){
    console.log('res', res.length)
})
