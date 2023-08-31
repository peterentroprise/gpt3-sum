
import React, { useState, useRef, useEffect  } from 'react';

export const ImagePrediction = ({}) => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [shouldRequest, setShouldRequest] = useState(true);
  const [responseImage, setResponseImage] = useState(null);
  const [counter, setCounter] = useState(0);


  useEffect(() => {
    let intervalId;

    if (stream) {
      intervalId = setInterval(() => {
        console.log("Function executed");
        if(shouldRequest == true){
          setShouldRequest(false)
          setCounter(prevCounter => prevCounter + 1);
          handleUpload()
        } 
      }, 1000);
    }

    return () => {
      clearInterval(intervalId); 
    };
  }, [stream]);


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
      setCounter(0)
      setShouldRequest(true)
    }
  };

  const handleSave = async () => {
    if (videoRef.current) {

      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);


      canvas.toBlob(async(blob) => {

      const screenshotFile = new File([blob], 'screenshot.png', { type: 'image/png' });
      const formData = new FormData();
      formData.append('file', screenshotFile);
  
      try {
    
        const response = await fetch('https://entroprise.ngrok.io/upload/save/', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          const responseData = await response.blob();
          setResponseImage(URL.createObjectURL(responseData));
          setShouldRequest(true)
  
        } else {
          console.error('Error uploading image');
        }
      } catch (error) {
        console.error('Error uploading image', error);
      }

      });
      
    }

  
  };

  const handleUpload = async () => {
    if (videoRef.current) {

      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);


      canvas.toBlob(async(blob) => {

      const screenshotFile = new File([blob], 'screenshot.png', { type: 'image/png' });
      const formData = new FormData();
      formData.append('file', screenshotFile);
  
      try {
    
        const response = await fetch('https://entroprise.ngrok.io/upload/single/', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          const responseData = await response.blob();
          setResponseImage(URL.createObjectURL(responseData));
          setShouldRequest(true)
  
        } else {
          console.error('Error uploading image');
        }
      } catch (error) {
        console.error('Error uploading image', error);
      }

      });
      
    }

  
  };


  return (
    <div className="space-y-4 py-8">
      <div className='flex gap-4'> <p>Frame Counter: {counter}</p>
        <p>Processing Request: {shouldRequest ? "False" : "True"}</p></div>

    <div className='space-x-4'>
      <button disabled={stream} className="disabled:opacity-25 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={startCapture}>Start Screenshare</button>
      <button disabled={!stream} className="disabled:opacity-25 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={stopCapture}>Stop Screenshare</button>
      <button disabled={!videoRef.current} className="disabled:opacity-25 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={handleSave}>Save Screenshot For Training</button>
    </div>
    {responseImage && (
        <div>
          <img src={responseImage} alt="Response" />
        </div>
      )}
      <div className="hidden"> <video  ref={videoRef} autoPlay playsInline controls /></div>
   
    </div>
  );
};
