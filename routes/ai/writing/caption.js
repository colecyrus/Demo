const express = require('express');
const fetch = require('node-fetch');


const app = express.Router();

app.post('/writing/caption', async (req, res, next) => {
	try {
		const { article } = req.body;

		const response = await fetch(
			"https://www.stack-inference.com/run_deployed_flow?flow_id=64949fa385cef886369191d4&org=a0bd6771-090b-4d99-8b82-6d351ab896d0",
			{
				headers: {
					'Authorization':
						'Bearer 40264795-7372-4fc1-b5ab-4fcd40192255',
					'Content-Type': 'application/json'
				},
				method: "POST",
				body: JSON.stringify({ "in-0": `draft social media post relates article for a professional in the finical industry.`, "in-1": article }),
			}
		);
		let output = await response.json()

		req.locals.input = article;
		req.locals.inputRaw = `draft social media post relates article for a professional in the finical industry.`;
		req.locals.output = output['out-0'];

		next();
	} catch (err) {
		console.log(err);
	}
});

module.exports = app;
