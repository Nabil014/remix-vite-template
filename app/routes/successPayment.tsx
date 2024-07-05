import { useEffect } from 'react';
import { Link, useNavigate } from '@remix-run/react'; 

export default function ForgotPassword() {
  const navigate = useNavigate(); 
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard/home'); 
    }, 5000); 

  
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-radial">
      <div className="mx-auto w-full max-w-md rounded-lg p-6">
        <div className="mb-6 flex flex-col items-center">
          <img
            src="https://res.cloudinary.com/dug5cohaj/image/upload/v1714945513/qg0xzn0ocr0vz9nafhim.png"
            alt="Crypto Ghost Logo"
            className="w-[293px]"
          />
        </div>
        <h2 className="mb-4 text-center text-xl text-white">
          Thank you very much for making your purchase
        </h2>
        <p className="mb-6 text-center text-gray-400">
          In a few seconds you will be redirected to the main screen, or you can do it manually with the button below.
        </p>
        <div className="flex justify-center mt-10">
          <Link to="/dashboard/home" className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600">Go to Home</Link>
        </div>
      </div>
    </div>
  );
}
