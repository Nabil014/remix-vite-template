import { useEffect } from 'react'
import { Link, useNavigate } from '@remix-run/react'

export default function ForgotPassword() {
  const navigate = useNavigate()
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/pricing-plans')
    }, 5000)

    return () => clearTimeout(timer)
  }, [navigate])

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
          The payment has been canceled
        </h2>
        <p className="mb-6 text-center text-gray-400">
        In a few seconds you will be redirected to the payment plans screen, so you can try the payment again if necessary. Or exit to the main screen with the button.
        </p>
        <div className="mt-10 flex justify-center">
          <Link
            to="/dashboard/home"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
