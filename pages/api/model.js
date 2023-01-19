import { Configuration, OpenAIApi } from "openai";
import { jsonc } from "jsonc";
export default async function handler(req, res) {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const prompt = `${req.body.prompt}:

    ${req.body.corpus}`;
    const result = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: parseInt(req.body.temperature),
      max_tokens: parseInt(req.body.maxTokens),
    });

    if (result.data.error) {
      console.log(result.data.error);
    } else {
      console.log(result.data);
    }

    res.status(200).send(jsonc.stringify(result));
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "failed to fetch data" });
  }
}
