// An express server which will handle api requests
const openAI = require("openai");
const { Configuration, OpenAIApi } = openAI;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;

const configuration = new Configuration({
	organization: "org-VI66HIekYTk2FtRLIIBevQfy",
	apiKey: "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"
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
	const { startFrom, endTo, enRoute, startDate } = req.body;
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: `Imagine you are a travel assistant with Travalana. 
1. Explain as you'd explain to a traveler. 
2. Give the full travel itinerary with options of flight, bus, train, car rental, or self-drive when visiting ${endTo} from ${startFrom}, en route to ${enRoute} on ${startDate}. Give good three-star or four-star hotels, and great restaurants . 
3. Separate each day having dates and day numbers with \n\n\n###\n\n\n. 
4. Show places to visit nearby ${endTo} and how to get there.
5. Show places to visit nearby ${enRoute}, hotels to stay, and great restaurant options.
6. Show how to return to ${startFrom} from ${enRoute} and the options.
7. Use appropriate emojis in all your responses until you are asked to stop doing so. 
8. Continue.`,
		max_tokens: 800,
		temperature: 0
	});
	console.log(response.data);

	if (response.data.choices[0].text) {
		res.json({ message: response.data.choices[0].text });
	}
});

app.listen(port, () => {
	console.log(`App is running on port ${port}`);
});
