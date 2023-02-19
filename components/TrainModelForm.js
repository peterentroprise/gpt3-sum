import { useState } from "react";
import { WebcamStreamCapture } from "./WebcamStreamCapture";

export const TrainModelForm = ({
  transcript,
  setTranscript,
  voiceId,
  setVoiceId,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/trainModel/`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setVoiceId(data.voiceId);
        setTranscript(data.transcriptUrl);
        setFile(null);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setFile(null);
        setLoading(false);
      });
  };

  return (
    <div className="space-y-4 py-8">
      <form
        className="flex flex-wrap gap-4"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <input
          id="file_input"
          className="w-full text-sm
            file:mr-5 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-medium
            file:bg-indigo-600 file:text-white
            hover:file:cursor-pointer hover:file:bg-indigo-700
            hover:file:text-white"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          disabled={file == null || isLoading == true}
          className="disabled:opacity-25 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          type="submit"
        >
          {isLoading ? "Training Voice Model..." : "Train Model From File"}
        </button>
      </form>
    </div>
  );
};
