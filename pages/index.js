import { useState } from "react";

import { TranscriptForm } from "../components/TranscriptForm";
import { GenerateTranscriptForm } from "../components/GenerateTranscriptForm";
import { TranscriptPolling } from "../components/TranscriptPolling";
import { SynthesizedAudioForm } from "../components/SynthesizedAudioForm";
import { TrainModelForm } from "../components/TrainModelForm";
import { WebcamStreamCapture } from "../components/WebcamStreamCapture";
import { VoiceIdSelection } from "../components/VoiceIdSelection";

const Index = () => {
  const [voiceId, setVoiceId] = useState(null);
  const [text, setText] = useState(null);
  const [transcriptPollingId, setTranscriptPollingId] = useState(null);
  const [transcript, setTranscript] = useState(null);
  const [pollForTranscript, setPollForTranscript] = useState(false);

  return (
    <div className="h-screen mx-auto max-w-2xl py-12 px-4">
       <video width="1200" controls muted="muted">
            <source src="https://6f95-35-192-44-164.ngrok.io/video" type="video/mp4" />
        </video>
      <div className=" divide-y-8 py-12 divide-gray-200">
        <p className="text-4xl font-medium py-8">
          Retrieve Media Transformation Demo
        </p>
        <WebcamStreamCapture />
        <TrainModelForm
          voiceId={voiceId}
          setVoiceId={setVoiceId}
          transcript={transcript}
          setTranscript={setTranscript}
        />
        <GenerateTranscriptForm
          voiceId={voiceId}
          setVoiceId={setVoiceId}
          transcriptPollingId={transcriptPollingId}
          setTranscriptPollingId={setTranscriptPollingId}
          setPollForTranscript={setPollForTranscript}
        />
        <TranscriptPolling
          transcriptPollingId={transcriptPollingId}
          setTranscriptPollingId={setTranscriptPollingId}
          transcript={transcript}
          setTranscript={setTranscript}
          pollForTranscript={pollForTranscript}
          setPollForTranscript={setPollForTranscript}
        />
        <TranscriptForm
          text={text}
          setText={setText}
          transcript={transcript}
          setTranscript={setTranscript}
        />
        <VoiceIdSelection voiceId={voiceId} setVoiceId={setVoiceId} />
        <SynthesizedAudioForm
          voiceId={voiceId}
          setVoiceId={setVoiceId}
          text={text}
          setText={setText}
        />
      </div>
    </div>
  );
};

export default Index;
