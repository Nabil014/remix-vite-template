import { useState, useEffect, useRef } from 'react'
import { validateEmail, validatePassword } from '~/utils/validators.server'
import { ActionFunction, json, redirect } from '@remix-run/node'
import { useActionData } from '@remix-run/react'
import { Input } from '~/components/Input'
import { Label } from '~/components/Label'
import { cn } from '~/utils/cn'
import { createAccount } from '~/utils/queries'
import { setAuthOnResponse } from '~/utils/auth'
import { useNavigate } from 'react-router-dom'

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const email = form.get('email')
  const password = form.get('password')
  const firstName = form.get('firstName')
  const lastName = form.get('lastName')

  if (typeof email !== 'string' || typeof password !== 'string'|| typeof lastName !== 'string'|| typeof firstName !== 'string') {
    return json(
      { error: `Invalid Form Data`, form: 'register' },
      { status: 400 },
    )
  }

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
  }

  if (Object.values(errors).some(Boolean)) {
    return json(
      { errors, fields: { email, password }, form: 'register' },
      { status: 400 },
    )
  }

  let user = await createAccount(email, password,firstName,lastName)
  return setAuthOnResponse(redirect('/dashboard/home'), user.id.toString())
}

export default function Register() {
  const actionData = useActionData()
  const firstLoad = useRef(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [errors, setErrors] = useState(actionData?.errors || {})
  const [formError, setFormError] = useState(actionData?.error || '')
  const [formData, setFormData] = useState({
    email: actionData?.fields?.email || '',
    password: actionData?.fields?.password || '',
    firstName: actionData?.fields?.firstName || '',
    lastName: actionData?.fields?.lastName || '',

  })

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    setFormData(form => ({ ...form, [field]: event.target.value }))
  }

  const handleClick = () => {
    setIsModalOpen(true)
  }

  useEffect(() => {
    firstLoad.current = false
  }, [])

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

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
        <h2 className="mb-4 text-center text-xl text-white">Get started</h2>
        <p className="mb-6 text-center text-gray-400">
          Choose your email and password
        </p>
        <form method="POST" className="space-y-4">
        <LabelInputContainer>
            <Label htmlFor="email" className="text-white">
              First Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              aria-describedby={
          'register-header'
              }
              value={formData.firstName}
              onChange={e => handleInputChange(e, 'firstName')}
              placeholder="Enter your Firstname"
              type="text"
              className={cn(
                'w-full rounded border bg-gradient-radial p-2 text-white',
                errors?.firstName
                  ? 'border-red-500'
                  : 'border-[#04E6E6] border-opacity-50',
              )}
              style={{ borderWidth: '0.5px' }}
            />
            {errors?.firstName && (
              <span id="email-error" className="mt-1 text-sm text-red-500">
                {errors.firstName}
              </span>
            )}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="email" className="text-white">
              Lastname
            </Label>
            <Input
              id="lastName"
              name="lastName"
              aria-describedby={
                errors?.email ? 'email-error' : 'register-header'
              }
              value={formData.lastName}
              onChange={e => handleInputChange(e, 'lastName')}
              placeholder="Enter your Lastname"
              type="text"
              className={cn(
                'w-full rounded border bg-gradient-radial p-2 text-white',
                errors?.lastName
                  ? 'border-red-500'
                  : 'border-[#04E6E6] border-opacity-50',
              )}
              style={{ borderWidth: '0.5px' }}
            />
            {errors?.lastName && (
              <span id="email-error" className="mt-1 text-sm text-red-500">
                {errors.lastName}
              </span>
            )}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="email" className="text-white">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              aria-describedby={
                errors?.email ? 'email-error' : 'register-header'
              }
              value={formData.email}
              onChange={e => handleInputChange(e, 'email')}
              placeholder="Enter your email"
              type="email"
              className={cn(
                'w-full rounded border bg-gradient-radial p-2 text-white',
                errors?.email
                  ? 'border-red-500'
                  : 'border-[#04E6E6] border-opacity-50',
              )}
              style={{ borderWidth: '0.5px' }}
            />
            {errors?.email && (
              <span id="email-error" className="mt-1 text-sm text-red-500">
                {errors.email}
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
              aria-describedby={errors?.password ? 'password-error' : ''}
              value={formData.password}
              onChange={e => handleInputChange(e, 'password')}
              placeholder="Enter your password"
              type="password"
              className={cn(
                'w-full rounded border bg-gradient-radial p-2 text-white',
                errors?.password
                  ? 'border-red-500'
                  : 'border-[#04E6E6] border-opacity-50',
              )}
              style={{ borderWidth: '0.5px' }}
            />
            {errors?.password && (
              <span id="password-error" className="mt-1 text-sm text-red-500">
                {errors.password}
              </span>
            )}
          </LabelInputContainer>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              className="form-checkbox rounded border-[#3d434d] bg-[#2b2f36] text-[#04E6E6]"
            />
            <label className="ml-2 text-gray-400" htmlFor="terms">
              I agree to{' '}
              <a href="#" className="text-[#04E6E6]">
                Terms of Services & Privacy Policy
              </a>
            </label>
          </div>
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              className="form-checkbox rounded border-[#3d434d] bg-[#2b2f36] text-[#04E6E6]"
            />
            <label className="ml-2 text-gray-400" htmlFor="newsletter">
              Subscribe to receive company news and product updates from
              CryptoGhost. You may unsubscribe at any time.
            </label>
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-teal-500 px-4 py-2 font-bold text-white transition duration-200 hover:bg-teal-600"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-white">
          <p>
            Already have an account?{' '}
            <a href="/login" className="text-[#04E6E6]">
              {' '}
              Sign in
            </a>
          </p>
        </div>
        <div className="mt-4 flex items-center justify-center text-white">
          <div className="w-full border-t border-[#F5F5F533] opacity-20"></div>
          <span className="mx-4">or</span>
          <div className="w-full border-t border-[#F5F5F533] opacity-20"></div>
        </div>
        <button
          className="mt-10 w-full rounded-md border border-teal-500 bg-transparent px-4 py-2 font-bold text-teal-500 transition duration-200 hover:bg-teal-500 hover:text-white"
          onClick={handleClick}
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
        className="h-[310px] w-[370px] rounded-[30px] border border-[#04E6E6] border-opacity-50 bg-[#022527] p-8"
        style={{ padding: '32px', gap: '32px', borderWidth: '0.5px' }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl text-white">Connect Wallet</h2>
          <button onClick={onClose} className="text-xl text-white">
            &times;
          </button>
        </div>
        <div className="space-y-4">
          <button className="flex w-full items-center justify-between rounded-lg border border-[#04E6E6] border-opacity-50 p-3 hover:bg-[#334155]">
            <span>Metamask</span>
            <img
              src="/images/metamask-logo.svg"
              alt="Metamask"
              className="h-6 w-6"
            />
          </button>
          <button className="flex w-full items-center justify-between rounded-lg border border-[#04E6E6] border-opacity-50 p-3 hover:bg-[#334155]">
            <span>Coinbase Wallet</span>
            <img
              src="/images/coinbase-logo.jpg"
              alt="Coinbase"
              className="h-6 w-6"
            />
          </button>
          <button className="flex w-full items-center justify-between rounded-lg border border-[#04E6E6] border-opacity-50 p-3 hover:bg-[#334155]">
            <span>Other Wallets</span>
            <img
              src="https://avatars.githubusercontent.com/u/37784886?s=200&v=4"
              alt="Other Wallets"
              className="h-6 w-6"
            />
          </button>
        </div>
      </div>
    </div>
  )
}
