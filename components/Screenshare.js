import React, { useState, useRef } from 'react';

export function Screenshare() {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  const captureScreenshot = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas to data URL and open in a new window/tab
      const screenshotURL = canvas.toDataURL('image/png');
      const newWindow = window.open();
      newWindow.document.write(`<img src="${screenshotURL}" alt="Screenshot" />`);
    }
  };

  const startCapture = async () => {
    try {
      const captureStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      setStream(captureStream);

      if (videoRef.current) {
        videoRef.current.srcObject = captureStream;
      }
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const stopCapture = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  return (
    <div className='space-y-4'>
      <button className="disabled:opacity-25 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={startCapture}>Start Screenshare</button>
      <button className="disabled:opacity-25 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={stopCapture}>Stop Screenshare</button>
      <button className="disabled:opacity-25 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={captureScreenshot}>Capture Screenshot</button>
      <video ref={videoRef} autoPlay playsInline controls />
    </div>
  );
}
