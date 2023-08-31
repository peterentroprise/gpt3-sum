
import React, { useState, useRef } from 'react';

export const ImagePrediction = ({}) => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [responseImage, setResponseImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const captureScreenshot = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas to Blob
      canvas.toBlob((blob) => {
        // Create a file from the blob
        const screenshotFile = new File([blob], 'screenshot.png', { type: 'image/png' });

        // Upload the file or perform any desired action
        setSelectedImage(screenshotFile);
      });
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

  const handleUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
      const response = await fetch('https://entroprise.ngrok.io/upload/single/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.blob();
        setResponseImage(URL.createObjectURL(responseData));
      } else {
        console.error('Error uploading image');
      }
    } catch (error) {
      console.error('Error uploading image', error);
    }
  };

  return (
    <div className="space-y-4 py-8">
      <div>
   <input           id="image" className="w-full text-sm
          file:mr-5 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-medium
          file:bg-indigo-600 file:text-white
          hover:file:cursor-pointer hover:file:bg-indigo-700
          hover:file:text-white" type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <button  className="disabled:opacity-25 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          type="submit" onClick={handleUpload}>Upload And Predict</button>
      {responseImage && (
        <div>
          <img src={responseImage} alt="Response" />
        </div>
      )}
    <div className='space-y-4'>
      <button className="disabled:opacity-25 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={startCapture}>Start Screenshare</button>
      <button className="disabled:opacity-25 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={stopCapture}>Stop Screenshare</button>
      <button className="disabled:opacity-25 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={captureScreenshot}>Capture Screenshot</button>
      <video ref={videoRef} autoPlay playsInline controls />
    </div>

    </div>
  );
};
