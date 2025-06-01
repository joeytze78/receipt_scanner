import { useEffect, useRef } from 'react';
import Webcam from 'webcam-easy';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Index() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) navigate('/login');
    }

    async function initWebcam() {
      try {
        const webcam = new Webcam(videoRef.current, 'environment', canvasRef.current, {
          width: 350,
          height: 550,
        });
        await webcam.start();
        console.log('Rear camera started successfully');
      } catch (err) {
        console.error('Error starting webcam:', err);
        alert('Error starting camera. Please make sure you have granted camera permissions.');
      }
    }

    checkUser();
    initWebcam();
  }, [navigate]);

  const captureImage = () => {
    const context = canvasRef.current.getContext('2d');
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const picture = canvasRef.current.toDataURL('image/png');
    if (!picture) {
      alert('Failed to capture image. Please try again.');
      return;
    }
    localStorage.setItem('capturedImage', picture);
    navigate('/display');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <video ref={videoRef} autoPlay playsInline className="w-full max-w-xs h-[550px] object-cover border-2 border-black rounded-lg" />
      <canvas ref={canvasRef} className="hidden"></canvas>
      <button
        onClick={captureImage}
        className="mt-6 px-6 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
      >
        SNAP
      </button>
    </div>
  );
}
