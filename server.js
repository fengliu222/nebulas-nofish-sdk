const app = require('express')();
const bodyParser = require('body-parser');

const {
	createRank,
	inviteVoter,
	vote,
	getVoteInfo,
	getRanksInfo
} = require('./index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// create ranking
app.post('/rankings', async ({ body }, res) => {
	const response = await createRank({
		name: body.name,
		description: body.description,
		max_voter: body.max_voter,
		items: body.items
	});
	res.json({ success: true });
});

// invite voter
app.post('/invite-voter', async ({ body }, res) => {
	const response = await inviteVoter({
		name: body.name,
		description: body.description,
		rankId: body.rankId
	});
	res.json({ success: true });
});

// vote
app.post('/vote', async ({ body }, res) => {
	const response = await vote({
		itemId: body.itemId,
		rankId: body.rankId
	});
	res.json({ success: true });
});

// get vote info
app.get('/vote-info/:id', async ({ params }, res) => {
	const response = await vote(params.id);
	res.json({ data: '数据' });
});

// get ranking
app.get('/rankings', async (req, res) => {
	const info = await getRanksInfo();
	res.json({ data: '数据' });
});

app.listen(process.env.PORT || 8080);
