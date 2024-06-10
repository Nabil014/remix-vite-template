import { useState, useEffect, useRef } from 'react'
import { validateEmail, validatePassword } from '~/utils/validators.server'
import { ActionFunction, json, redirect } from '@remix-run/node'
import { useActionData } from '@remix-run/react'
import { Input } from '~/components/Input'
import { Label } from '~/components/Label' // Make sure this import is correct
import { cn } from '~/utils/cn'
import { login } from '~/utils/queries'
import { setAuthOnResponse } from '~/utils/auth'

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const email = form.get('email')
  const password = form.get('password')

  if (typeof email !== 'string' || typeof password !== 'string') {
    return json({ error: `Invalid Form Data`, form: 'login' }, { status: 400 })
  }

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
  }

  if (Object.values(errors).some(Boolean)) {
    return json(
      { errors, fields: { email, password }, form: 'login' },
      { status: 400 },
    )
  }

  let userId = await login(email, password)

  if (userId === false) {
    return json({ ok: false, errors: { password: 'Invalid credentials' } }, 400)
  }

  let response = redirect('/dashboard/bubbles')
  return setAuthOnResponse(response, userId.toString())
}

export default function Login() {
  const actionData = useActionData()
  const firstLoad = useRef(true)
  let actionResult = useActionData<typeof action>()

  const [errors, setErrors] = useState(actionData?.errors || {})
  const [formData, setFormData] = useState({
    email: actionData?.fields?.email || '',
    password: actionData?.fields?.password || '',
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    setFormData(form => ({ ...form, [field]: event.target.value }))
  }

  useEffect(() => {
    firstLoad.current = false
  }, [])

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center ">
      <div className="mx-auto w-full max-w-md rounded-lg p-6">
        <div className="mb-6 flex flex-col items-center">
          <img
            src="https://res.cloudinary.com/dug5cohaj/image/upload/v1714945513/qg0xzn0ocr0vz9nafhim.png"
            alt="Crypto Ghost Logo"
            className="w-[293px]"
          />
        </div>
        <h2 className="mb-4 text-center text-xl text-white">Sign in</h2>
        <p className="mb-6 text-center text-gray-400">
          Enter your email and password to continue
        </p>
        <form method="POST" className="space-y-4">
          <LabelInputContainer>
            <Label htmlFor="email" className="text-white">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              aria-describedby={
                actionResult?.errors?.email ? 'email-error' : 'login-header'
              }
              value={formData.email}
              onChange={e => handleInputChange(e, 'email')}
              placeholder="Enter your email"
              type="email"
              className={cn(
                "w-full rounded border bg-gradient-radial p-2 text-white",
                actionResult?.errors?.email ? 'border-red-500' : 'border-[#04E6E6] border-opacity-50'
              )}
              style={{ borderWidth: '0.5px' }}
            />
            {actionResult?.errors?.email && (
              <span id="email-error" className="text-red-500 mt-1 text-sm">
                {actionResult.errors.email}
              </span>
            )}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              aria-describedby={
                actionResult?.errors?.password ? 'password-error' : ''
              }
              value={formData.password}
              onChange={e => handleInputChange(e, 'password')}
              placeholder="Enter your password"
              type="password"
              className={cn(
                "w-full rounded border bg-gradient-radial p-2 text-white",
                actionResult?.errors?.password ? 'border-red-500' : 'border-[#04E6E6] border-opacity-50'
              )}
              style={{ borderWidth: '0.5px' }}
            />
            {actionResult?.errors?.password && (
              <span id="password-error" className="text-red-500 mt-1 text-sm">
                {actionResult.errors.password}
              </span>
            )}
          </LabelInputContainer>
          {actionResult?.errors?.email && (
            <span id="email-error" className="text-red-500 mt-1 text-sm">
              {actionResult.errors.email}
            </span>
          )}
          {actionResult?.errors?.password && (
            <span id="password-error" className="text-red-500 mt-1 text-sm">
              {actionResult.errors.password}
            </span>
          )}
          <button
            className="w-full rounded-md bg-teal-500 px-4 py-2 font-bold text-white transition duration-200 hover:bg-teal-600"
            type="submit"
          >
            Continue
          </button>
          <div className='text-center'>
            <a href="#" className="text-[#04E6E6] font-[16px] hover:underline">
              Forgot password?
            </a>
          </div>
          <div className="mt-4 text-center text-sm text-white">
            <a href="#" className="hover:underline">
            Don’t have an account? <span className="text-[#04E6E6]"> Sign up</span>
            </a>
          </div>
        </form>
        <div className="mt-6 flex items-center justify-center text-white">
          <div className="border-[#F5F5F533] opacity-20 w-full border-t"></div>
          <span className="mx-4">or</span>
          <div className="border-[#F5F5F533] opacity-20 w-full border-t"></div>
        </div>
        <button
          className="mt-4 w-full rounded-md border border-teal-500 bg-transparent px-4 py-2 font-bold text-teal-500 transition duration-200 hover:bg-teal-500 hover:text-white"
          onClick={toggleModal}
        >
          Sign in with Wallet
        </button>
      </div>
      {isModalOpen && <WalletModal onClose={toggleModal} />}
    </div>
  )
}

const LabelInputContainer = ({ children, className }: any) => {
  return (
    <div className={cn('flex flex-col space-y-2', className)}>{children}</div>
  )
}



const WalletModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div
        className="bg-[#022527] p-8 rounded-[30px] w-[370px] h-[320px] border border-[#04E6E6] border-opacity-50"
        style={{ padding: '32px', gap: '32px', borderWidth: '0.5px' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-white">Connect Wallet</h2>
          <button onClick={onClose} className="text-white text-xl">&times;</button>
        </div>
        <div className="space-y-4">
          <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-[#334155] border border-[#04E6E6] border-opacity-50">
            <span>Metamask</span>
            <img src="/images/metamask-logo.svg" alt="Metamask" className="w-6 h-6" />
          </button>
          <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-[#334155] border border-[#04E6E6] border-opacity-50">
            <span>Coinbase Wallet</span>
            <img src="/images/coinbase-logo.jpg" alt="Coinbase" className="w-6 h-6" />
          </button>
          <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-[#334155] border border-[#04E6E6] border-opacity-50">
            <span>Other Wallets</span>
            <img src="https://avatars.githubusercontent.com/u/37784886?s=200&v=4" alt="Other Wallets" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  )
}


