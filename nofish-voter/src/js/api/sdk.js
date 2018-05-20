import { requestWatcher } from './utils';
import { headers, parseJSON } from './utils';

var nebulas = require('nebulas');
var Neb = require('nebulas').Neb;
var Account = require('nebulas').Account;
var nebClient = new Neb()
nebClient.setRequest(new nebulas.HttpRequest("https://mainnet.nebulas.io"))
var api = nebClient.api


var v4 = '{"version":4,"id":"4b80625e-eef0-42f4-97ad-e4005b3b20a1","address":"n1Uvh5mFqNWApVdWXnWKxaiRrMPYcBsfWWN","crypto":{"ciphertext":"64f7267c6376ceea314e579d29ddf7b7032401bd97acbcb969c42f2460e6fd6c","cipherparams":{"iv":"37ac99ce2e44095d0fca8d4a59200559"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"31cc27adc182aeb1a626af47ca53926cdd3cb0df819b357aff1766daefb83e24","n":4096,"r":8,"p":1},"mac":"976c44d7a7be970e5512c59a9e812143216d50c02a51c3d6c8ac3db7844e0943","machash":"sha3256"}}';
var acc = new Account();
var dappAddress = "n23BRD8CQE8btGtVD6GZuJ7hcg2TpsTpmKR";
acc = acc.fromKey(v4, "liuzhenkuo0316", true);

var from = acc.getAddressString();
var value = '0';
var nonce = '76';
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
        items: rank.items,
        banner_url: rank.banner_url
	};
    var callFunction = "createRank";
    var callArgs = JSON.stringify([req.name, req.description, '', req.max_voter, req.banner_url])
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
    var callArgs = "[\"" + req.rankId + "\", \"" + req.name + "\", \"" + req.description + "\"]";
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

function vote(rank_name, voter_name, item_name, ) {
	if (!rank_name || !voter_name) {
		return;
	}
    
    var callFunction = "vote";
    var callArgs = "[\"" + rank_name + "\", \"" + item_name + "\", \"" + voter_name + "\"]";
    var contract = {
        "function": callFunction,
        "args": callArgs
    }
    return fetch('http://localhost:9000/api/vote', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            rank_name,
            item_name,
            voter_name
        })
    })
      .then(parseJSON)
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
    var callArgs = "[]";
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

// createRank({
//     name: "a",
//     description: "bb",
//     banner_url: "https://placehold.it/400x400", 
//     max_voter: 10
// }).then(function(res){
//     console.log('res', res.length)
// }).catch(function(e){
//     console.log(e)
// })


// getRanksInfo().then(function(res){
//     console.log(res[0])
// })


// inviteVoter({
//     rankId: '黑客马拉松',
//     name: '刘剑锋',
//     description: '参赛选手'
// }).then(function(res){
//     console.log(res)
// })
