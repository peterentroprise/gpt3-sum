import React, { useState, useEffect } from "react";
export const TranscriptPolling = ({
  transcript,
  setTranscript,
  pollForTranscript,
  transcriptPollingId,
  setTranscriptPollingId,
  setPollForTranscript,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (pollForTranscript) {
      const interval = setInterval(() => {
        fetch(
          `https://api.assemblyai.com/v2/transcript/${transcriptPollingId}`,
          {
            headers: {
              authorization: "7fdf42ab12b54f909316cb2e2897788c",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.status == "completed") {
              setTranscript(data.text);
              setPollForTranscript(false);
            }
          });
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [pollForTranscript]);

  return (
    <div className="space-y-14">
      {pollForTranscript
        ? "Polling For Transcript Results..."
        : "Not Polling For Transcript"}
    </div>
  );
};
