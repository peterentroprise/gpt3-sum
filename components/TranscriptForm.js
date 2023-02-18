import { useState } from "react";
import { useRouter } from "next/router";

export const TranscriptForm = ({ setText, transcript, setTranscript }) => {
  const [temperature, setTemperature] = useState(0);
  const [maxTokens, setMaxTokens] = useState(2000);
  const [prompt, setPrompt] = useState("Tl;dr");

  const [isLoading, setLoading] = useState(false);
  const handleSubmit = () => {
    setLoading(true);
    fetch("/api/model", {
      method: "POST",
      body: JSON.stringify({
        corpus: transcript,
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
        setText(data.data.choices[0].text);
        setLoading(false);
      });
  };

  return (
    <div className="space-y-14">
      <div className="space-y-8 pb-8">
        <div>
          <label
            htmlFor="transcript"
            className="block text-sm font-medium text-gray-700"
          >
            Transcript
          </label>
          <div className="mt-1">
            <textarea
              onChange={(e) => setTranscript(e.target.value)}
              rows={8}
              type="text"
              name="transcript"
              id="transcript"
              value={transcript}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter corpus here..."
              aria-describedby="transcript-description"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading || transcript == "" || transcript == null}
          className="disabled:opacity-25 mt-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {isLoading
            ? "Generating Summarization..."
            : "Generate Summarization From Transcript"}
        </button>
      </div>
    </div>
  );
};
