const app = require('express')();
const bodyParser = require('body-parser');

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
app.post('/api/vote', async ({ body }, res) => {
	const response = await vote({
		itemId: body.itemId,
		rankId: body.rankId
	});
	res.json({ success: true });
});

// get vote info
app.get('/api/vote-info/:id', async ({ params }, res) => {
	const data = await vote(params.id);
	res.json({ data });
});

// get ranking
app.get('/api/rankings', async (req, res) => {
	const data = await getRanksInfo();
	res.json({ data });
});

app.get('/public/ranks/:id', async ({ params }, res) => {
	const info = await getRanksInfo();
	const tickers = info.filter((i) => {
		return i.name === '全球区块链黑客马拉松'
	})[0]
	const votes = tickers.votes || []
	const items = tickers.items || []
	const avotes = items.map(i => {
		const count = votes.filter(a => a.item_name === i.item_name).length
		const sum = votes.length
		console.log(count, sum);
		return {
			count: count,
			percent: (votes / sum) * 100,
			name: i.item_name,
			desc: i.desc
		}
	})
	res.render('index', {
		name: tickers.name,
		items: avotes
	});
});

app.listen(9000);
