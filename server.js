const app = require('express')();
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const {
	createRank,
	inviteVoter,
	vote,
	getVoteInfo,
	getRanksInfo,
	getRankById
} = require('./index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var votes_temp = [];

app.use(cors());
// create ranking
app.post('/api/rankings', async ({ body }, res) => {
	const response = await createRank({
		name: body.name,
		description: body.description,
		max_voter: body.max_voter,
		items: body.items
	});
	res.json({ success: true });
});

// invite voter
app.post('/api/invite-voter', async ({ body }, res) => {
	const response = await inviteVoter({
		name: body.name,
		description: body.description,
		rankId: body.rankId
	});
	res.json({ success: true });
});

// vote
app.post('/api/vote', async ({ body, params }, res) => {
	votes_temp.push({
		rank_name: body.rank_name,
		voter_name: body.voter_name,
		item_name: body.item_name
	});
	res.json(votes_temp);
});

// get vote info
app.get('/api/vote-info/:id', async ({ params }, res) => {
	const data = await vote(params.id);
	res.json({ data });
});

// get ranking
app.get('/api/rankings', async (req, res) => {
	const data = await getRanksInfo();
	res.json({
		data: data.map(i => ({
			...i,
			votes: votes_temp
		}))
	});
});

// get ranking by id
app.get('/api/rankings/:id', async ({ params }, res) => {
	const data = await getRankById(params.id);
	res.json({
		data: {
			...data,
			votes: votes_temp
		}
	});
});

app.get('/public/ranks/:id', async ({ params }, res) => {
	const info = await getRanksInfo();
	const tickers = info.filter(i => {
		return i.name === '全球区块链黑客马拉松';
	})[0];
	const votes = votes_temp || [];
	const items = tickers.items || [];
	const avotes = items.map(i => {
		const count = votes.filter(a => a.item_name === i.item_name).length;
		const sum = votes.length;
		return {
			count: count,
			percent: sum > 0 ? count / sum * 100 : 0,
			name: i.item_name,
			desc: i.desc
		};
	});
	res.render('index', {
		name: tickers.name,
		items: avotes
	});
});

app.use('/', express.static('nofish-voter/dist'));
app.use('/login', express.static('nofish-voter/dist'));
app.use('/dashboard', express.static('nofish-voter/dist'));

app.listen(9999);
