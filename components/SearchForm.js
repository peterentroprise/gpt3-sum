import { useState } from "react";
import { useRouter } from "next/router";
import { ResponseData } from "./ResponseData";
import test1 from "../data/test1.json";

export const SearchForm = ({ className, children, ...props }) => {
  const router = useRouter();
  const { usePrompt } = router.query;
  const modelCostPerToken = 0.00002;
  const [temperature, setTemperature] = useState(0.3);
  const [maxTokens, setMaxTokens] = useState(300);
  const [corpus, setCorpus] = useState(JSON.stringify(test1));
  const [prompt, setPrompt] = useState(
    "Generate summarization bullet points from this transcript"
  );

  let assembledCorpus = "";
  test1.forEach((element) => {
    assembledCorpus = assembledCorpus.concat(`${element.text} `);
  });

  const [data, setData] = useState(undefined);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({
        corpus: assembledCorpus,
        corpusJson: corpus,
        prompt: prompt,
        temperature: temperature,
        maxTokens: maxTokens,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  };
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="space-y-14">
      <div className="space-y-8 pb-8">
        {usePrompt && (
          <div>
            <label
              htmlFor="prompt"
              className="block text-sm font-medium text-gray-700"
            >
              Prompt
            </label>

            <div className="mt-1">
              <input
                onChange={(e) => setPrompt(e.target.value)}
                type="text"
                name="prompt"
                id="prompt"
                value={prompt}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Magical command here..."
                aria-describedby="prompt-description"
              />
            </div>
            <p
              className="mt-2 text-sm text-gray-500"
              id="prompt-description"
            >
              The prompt guides the output of GPT3 in natural language.
            </p>
          </div>
        )}

        <div>
          <label
            htmlFor="corpus"
            className="block text-sm font-medium text-gray-700"
          >
            Retrieve Transcript
          </label>
          <div className="mt-1">
            <textarea
              onChange={(e) => setCorpus(e.target.value)}
              rows={8}
              type="text"
              name="corpus"
              id="corpus"
              value={corpus}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter corpus here..."
              aria-describedby="corpus-description"
            />
          </div>
          <p
            className="mt-2 text-sm text-gray-500"
            id="corpus-description"
          >
            A Retrieve platform video transcript JSON file
          </p>
        </div>
        <div>
          <label
            htmlFor="temperature"
            className="block text-sm font-medium text-gray-700"
          >
            Temperature
          </label>
          <div className="mt-1">
            <input
              onChange={(e) => setTemperature(e.target.value)}
              type="number"
              name="temperature"
              value={temperature}
              id="temperature"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter temperature here..."
              aria-describedby="temperature-description"
            />
          </div>
          <p
            className="mt-2 text-sm text-gray-500"
            id="temperature-description"
          >
            Higher values means the model will take more risks. (0-1)
          </p>
        </div>
        <div>
          <label
            htmlFor="maxTokens"
            className="block text-sm font-medium text-gray-700"
          >
            Max Tokens
          </label>
          <div className="mt-1">
            <input
              onChange={(e) => setMaxTokens(e.target.value)}
              type="number"
              name="maxTokens"
              value={maxTokens}
              id="maxTokens"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Magical command here..."
              aria-describedby="maxTokens-description"
            />
          </div>
          <p
            className="mt-2 text-sm text-gray-500"
            id="maxTokens-description"
          >
            The maximum number of tokens to generate in the completion.
            (16-4096)
          </p>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className=" mt-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </div>

      {data && (
        <div>
          <ResponseData
            data={data}
            modelCostPerToken={modelCostPerToken}
          />
          <p className="font-medium text-2xl py-4">
            Machine learning bullet point reverse look up in transcript coming
            Monday!
          </p>
        </div>
      )}
    </div>
  );
};
