import { useState } from "react";

export const Form = ({ className, children, ...props }) => {
  const [temperature, setTemperature] = useState(0);
  const [maxTokens, setMaxTokens] = useState(10);
  const [prompt, setPrompt] = useState();
  const [data, setData] = useState(undefined);
  const [isLoading, setLoading] = useState(false);
  const handleSubmit = () => {
    setLoading(true);
    fetch("/api/model", {
      method: "POST",
      body: JSON.stringify({
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
      <div className="space-y-4">
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
              type="email"
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
            prompt
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
              onChange={(e) => setPrompt(e.target.value)}
              type="email"
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
            temperature
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
              onChange={(e) => setPrompt(e.target.value)}
              type="email"
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
            maxTokens
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
          <p className="block text-sm font-medium text-gray-700">Response</p>
          <p className="mt-1">
            {console.log(data)}
            {data.data.choices[0].text}
          </p>
        </div>
      )}
    </div>
  );
};
