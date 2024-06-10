export default function ForgotPassword() {
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
          Thank you for joining CryptoGhost
        </h2>
        <p className="mb-6 text-center text-gray-400">
          If you are signing up for the first time, an email will be sent to
          “email”. Please check it and follow the onboarding steps
        </p>
      </div>
    </div>
  )
}
