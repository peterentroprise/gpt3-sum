import { Configuration, OpenAIApi } from "openai";
import { jsonc } from "jsonc";
import jsonTojsonl from "json-to-jsonl";
import fs from "fs";
export default async function handler(req, res) {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const prompt = `${req.body.prompt}:

    ${req.body.corpus}`;

    const corpusJson = JSON.parse(req.body.corpusJson);

    const corpusDocuments = corpusJson.map((item) => {
      return {
        text: item.text,
        metadata: `${item.startSecond} - ${item.endSecond}`,
      };
    });

    // fs.writeFileSync(
    //   "/tmp/corpusDocuments.json",
    //   JSON.stringify(corpusDocuments)
    // );
    // const response1 = jsonTojsonl("/tmp/corpusDocuments.json");
    // console.log(response1);

    const result = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: parseInt(req.body.temperature),
      max_tokens: parseInt(req.body.maxTokens),
    });

    if (result.data.error) {
      console.log(result.data.error);
    } else {
      // console.log(result.data);
    }

    // await openai.createFile("/data/try.jsonl", "search");

    // await openai.createSearch("ada")

    res.status(200).send(jsonc.stringify(result));
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "failed to fetch data" });
  }
}
