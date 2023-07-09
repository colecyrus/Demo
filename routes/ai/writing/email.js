const express = require('express');
const openai = require('../../middlewares/openai');

const app = express.Router();

app.post('/writing/email', async (req, res, next) => {
	try {
		const { subject, audience, desc, tone } = req.body;

		let descTrimmed = desc;
		if (desc && desc.length > 600) {
			descTrimmed = desc.substring(desc.length - 600);
		}

		let prompt = `You are an expierenced finicial advisor and have to write an email. Based on the Subject, Audience, tone, and the description of the email:\n"""\n`;

		const promptEng = [
			{
				subject: 'Investment Opportunity',
				audience: 'Unions',
				tone: 'Fun, Sincere, Excited',
				desc: 'Setup a call to talk about investment opportunity.',
				email: `Dear Unions,\n\nI hope this message finds you well! I'm an experienced financial advisor serving investment needs throughout the nation.\n\nI wanted to reach out to you to discuss an invaluable investment opportunity that could create a long-term revenue stream for you and your members.\n\nWe all know the strength of unions is found in the ability to deliver greater benefits to members, and I believe this is just the type of opportunity to do that. I would love to have a conversation with you and your team to discuss further.\n\nI’m excited to learn more about any questions or concerns you may have and to get to know your team better. If you're interested in learning more, please reply to this message and I’ll promptly schedule a call.\n\nI look forward to hearing from you soon.\n\nBest regards,\n[Your Name]`
			},
			{
				subject: 'Company Layoffs',
				audience: 'Internal Employees',
				tone: 'Sad, Sincere, Apologetic',
				desc: 'Let the individual know that the company is downsizing and they will be losing their job.',
				email: `Dear Internal Employees,\n\nI am sure you have all been aware of the difficulties we are enduring during this challenging time. As a result of the current situation, our company is in the tough position of having to downsize our workforce.\n\nThis was not an easy decision, and I wanted to extend my sincerest apology that this has happened. As you are aware, we are struggling to meet our financial goals, and unfortunately, we simply can’t keep everyone on board.\n\nIt is with deep regret that I must inform you that your position is being eliminated. We recognize your hard work and dedication during your time here, and we are sorry to lose you as an important part of our team. We wish you all the best in your future endeavors.\n\nIf you have any questions or need help processing the paperwork, please do not hesitate to reach out.\n\nSincerely,\n[Your Name]`
			}
		];

		promptEng.forEach(example => {
			prompt += `subject: ${example.subject}\n`;
			prompt += audience ? `Audience: ${example.audience}\n` : '';
			prompt += desc ? `Description: ${descTrimmed}\n` : '';
			prompt += tone ? `Tone: ${example.tone}\n` : '';
			prompt += example.email;
			prompt += '"""\n';
		});

		const inputRaw = `Subject: ${subject}\n` +
			`${audience ? `Audience: ${audience}\n` : ''}` +
			`${desc ? `Description: ${descTrimmed}\n` : ''}` +
			`${tone ? `Tone: ${tone}\n` : ''}` +
			'Email:';

		prompt += inputRaw;
		console.log(prompt)
		const gptResponse = await openai.complete({
			engine: 'davinci',
			prompt,
			maxTokens: 200,
			temperature: 0.8,
			frequencyPenalty: 0.2,
			presencePenalty: 0,
			bestOf: 1,
			topP: 1,
			n: 1,
			user: req.user._id,
			stream: false,
			stop: ['"""', 'Subject:', 'Audience:', 'Email:'],
		});

		let output = gptResponse.data.choices[0].text.slice(1);

		if (output.endsWith('"')) {
			output = output.slice(0, -1);
		}

		if (output.endsWith('"')) {
			output = output.slice(0, -1);
		}

		if (output.endsWith('\n')) {
			output = output.slice(0, -1);
		}

		req.locals.input = prompt;
		req.locals.inputRaw = inputRaw;
		req.locals.output = output;

		next();
	} catch (err) {
		console.log(err);
	}
});

module.exports = app;
