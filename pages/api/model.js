import { Configuration, OpenAIApi } from "openai";
import { jsonc } from "jsonc";
export default async function handler(req, res) {
  try {
    //OpenAI API Call
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const result = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.body.prompt,
      temperature: req.body.temperature,
      max_tokens: req.body.maxTokens,
    });

    console.log(result);

    res.status(200).send(jsonc.stringify(result));
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "failed to fetch data" });
  }
}
