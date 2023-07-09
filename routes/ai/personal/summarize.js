
const express = require('express');
const openai = require('../../middlewares/openai');

let app = express.Router()

app.post('/personal/summarize', async (req, res, next) => {
	try {
		let { content } = req.body
		let inputRaw = `TEXT: ${content}\nKEY POINTS: 1.`
		let prompt = `
      List what key points are, in simple language, based from the text:
      ###
      TEXT: Programmers that don't blog should start right now. You're future self with thank you when your blog helps you getting a better job, earn more money and of course, have an easier time learning new concepts.
      KEY POINTS: 1. Programmers should start blogging
      2. Blogging helps you get a better job
      3. You can earn more money by blogging
      4. Learn new concepts easier by blogging about them
      ###
      TEXT: A tort is an act or omission that gives rise to injury or harm to another and amounts to a civil wrong for which courts impose liability. In the context of torts, 'injury' describes the invasion of any legal right, whereas 'harm' describes a loss or detriment in fact that an individual suffers.
      KEY POINTS: 1. Tort are when you hide information that causes harm or injury
      2. Injury in the context of tort can an invasion of legal rights
      3. Harm can be ways in which a person suffers a type of loss.
      ###
    `;
		prompt += inputRaw


		const gptResponse = await openai.complete({
			engine: 'curie',
			prompt,
			maxTokens: 150,
			temperature: 0.2,
			topP: 1,
			frequencyPenalty: 1,
			presencePenalty: 0,
			bestOf: 1,
			n: 1,
			user: req.user._id,
			stream: false,
			stop: ["###", "<|endoftext|>",],
		});

		const filteredOutputs = gptResponse.data.choices[0].text
			.split('\n')
			.map(output => output.trim())
			.filter(output => output !== "")
			.map(output => output.substring(3));

		let outputs = Array.from(new Set(filteredOutputs));

		req.locals.input = prompt;
		req.locals.inputRaw = `TEXT: ${content}\nKEY POINTS: 1.`;
		req.locals.outputs = outputs;

		next();

	} catch (err) {
		console.log(err.response)
		console.log(err.data)
		console.log(err.message)
	}

})

module.exports = app