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
app.set('view engine', 'ejs')

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

app.get('/public/ranks/:id', async ({ params }, res) => {
	// const info = await getRankById(params.id);
	console.log(params.id)
	res.render('index', {
		name: '黑客马拉松',
		items: [{
			count: 19,
			percent: 20,
			name: 'HC',
			desc: '描述文字'
		},{
			count: 5,
			percent: 5,
			name: '对标链',
			desc: '描述文字'
		},{
			count: 5,
			percent: 5,
			name: '无鱼排行',
			desc: '描述文字'
		},{
			count: 5,
			percent: 25,
			name: '无鱼排行',
			desc: '描述文字'
		},{
			count: 5,
			percent: 35,
			name: '无鱼排行',
			desc: '描述文字'
		},{
			count: 5,
			percent: 15,
			name: '无鱼排行',
			desc: '描述文字'
		},{
			count: 5,
			percent: 95,
			name: '无鱼排行',
			desc: '描述文字'
		},{
			count: 5,
			percent: 55,
			name: '无鱼排行',
			desc: '描述文字'
		}]
	});
})

app.listen(process.env.PORT || 8080);
