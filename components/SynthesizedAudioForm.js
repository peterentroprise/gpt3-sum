import { useState } from "react";

export const SynthesizedAudioForm = ({
  voiceId,
  setVoiceId,
  text,
  setText,
}) => {
  const [isLoading, setLoading] = useState(false);

  const [audioSrc, setAudioSrc] = useState(null);
  const [similarity, setSimilarity] = useState(1);
  const [stability, setStability] = useState(1);

  const handleSubmit = (e) => {
    setLoading(true);
    setAudioSrc(null);
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/synthesizeAudio/`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        text: text,
        voiceId: voiceId,
        similarity: similarity,
        stability: stability,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.blob();
        }
        setLoading(false);
        throw new Error("Network response was not ok.");
      })
      .then((blob) => {
        setAudioSrc(URL.createObjectURL(blob));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
      });
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSimilarityChange = (event) => {
    setSimilarity(event.target.value);
  };

  const handleStabilityChange = (event) => {
    setStability(event.target.value);
  };

  return (
    <div className="space-y-4 py-8">
      <div>
        <label
          htmlFor="similarity"
          className="block text-sm font-medium text-gray-700"
        >
          Similarity
        </label>
        <div className="mt-1">
          <input
            type="number"
            name="similarity"
            value={similarity}
            onChangeCapture={handleSimilarityChange}
            id="similarity"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="stability"
          className="block text-sm font-medium text-gray-700"
        >
          Stability
        </label>
        <div className="mt-1">
          <input
            type="number"
            name="stability"
            value={stability}
            onChangeCapture={handleStabilityChange}
            id="stability"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="text"
          className="block text-sm font-medium text-gray-700"
        >
          Text
        </label>
        <div className="mt-1">
          <textarea
            onChange={handleTextChange}
            value={text}
            rows={4}
            name="text"
            id="text"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <button
        disabled={
          text == null ||
          text == "" ||
          voiceId == null ||
          voiceId == "" ||
          isLoading == true
        }
        className="disabled:opacity-25 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={handleSubmit}
      >
        {isLoading ? "Generating Audio..." : "Synthisize Audio From Text"}
      </button>

      {audioSrc && (
        <audio controls>
          <source src={audioSrc} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};
