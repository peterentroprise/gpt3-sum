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
      temperature: 0,
      max_tokens: 7,
    });

    res.status(200).send(jsonc.stringify(result));
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "failed to fetch data" });
  }
}
