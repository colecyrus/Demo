const express = require('express');
const fetch = require('node-fetch');


const app = express.Router();

app.post('/business/report', async (req, res, next) => {
    try {
        const { company } = req.body;

        const response = await fetch(
            "https://www.stack-inference.com/run_deployed_flow?flow_id=64a8b50dd007c1bd360c3bea&org=a0bd6771-090b-4d99-8b82-6d351ab896d0",
            {
                headers: {
                    'Authorization':
                        'Bearer 40264795-7372-4fc1-b5ab-4fcd40192255',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ "in-0": company }),
            }
        );
        let output = await response.json()

        req.locals.input = company;
        req.locals.inputRaw = `Create a comapny memo`;
        req.locals.output = output['out-0'];

        next();
    } catch (err) {
        console.log(err);
    }
});

module.exports = app;
