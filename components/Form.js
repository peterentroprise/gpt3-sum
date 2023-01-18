import { useState } from "react";

export const Form = ({ className, children, ...props }) => {
  const [prompt, setPrompt] = useState("hello universe");
  const [data, setData] = useState(undefined);
  const [isLoading, setLoading] = useState(false);
  const handleSubmit = () => {
    setLoading(true);
    fetch("/api/model", {
      method: "POST",
      body: JSON.stringify({
        prompt: prompt,
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
      <div>
        <label
          htmlFor="prompt"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <div className="mt-1">
          <input
            onChange={(e) => setPrompt(e.target.value)}
            type="email"
            name="prompt"
            id="prompt"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Magical command here..."
            aria-describedby="prompt-description"
          />
        </div>
        <p
          className="mt-2 text-sm text-gray-500"
          id="prompt-description"
        >
          https://beta.openai.com/docs/guides/fine-tuning
        </p>
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
