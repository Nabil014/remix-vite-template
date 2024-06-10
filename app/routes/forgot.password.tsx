import { useState } from 'react';
import { Input } from '~/components/Input';
import { Label } from '~/components/Label';
import { ActionFunction, json } from '@remix-run/server-runtime';
import { useActionData } from '@remix-run/react'
import { validateEmail } from '~/utils/validators.server';
import { cn } from '~/utils/cn'

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get('email');

  if (typeof email !== 'string' || typeof email !== 'string') {
    return json(
      { error: `Invalid Form Data`, form: 'register' },
      { status: 400 },
    );
  }

  const errors = {
    email: validateEmail(email),
  };

  if (Object.values(errors).some(Boolean)) {
    return json(
      { errors, fields: { email }, form: 'register' },
      { status: 400 },
    );
  }

  // Aquí iría el resto de la lógica para manejar el registro, como guardar en la base de datos, etc.

  return json({ success: true });
};

export default function ForgotPassword() {
  const actionData = useActionData();
  const [errors, setErrors] = useState(actionData?.errors || {});
  const [formData, setFormData] = useState({
    email: actionData?.fields?.email || '',
    password: actionData?.fields?.password || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

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
          Enter your email address below and we’ll send you
          instructions on how to create a new one.
        </p>
        <LabelInputContainer>
          <Input
            id="email"
            name="email"
            aria-describedby={errors?.email ? 'email-error' : ''}
            value={formData.email}
            onChange={e => handleInputChange(e, 'email')}
            placeholder="Email Address"
            type="email"
            className={cn(
              'w-full rounded border bg-gradient-radial p-2 text-white',
              errors?.password ? 'border-red-500' : 'border-[#04E6E6] border-opacity-50',
            )}
            style={{ borderWidth: '0.5px' }}
          />
          {errors?.email && (
            <span id="email-error" className="mt-1 text-sm text-red-500">
              {errors.email}
            </span>
          )}
        </LabelInputContainer>
      <button
            className="mt-5 w-full rounded-md bg-[#04E6E6] px-4 py-2 font-bold text-white transition duration-200 hover:bg-teal-600"
            type="submit"
          >
            Continue
          </button>
      </div>
    </div>
  );
}

const LabelInputContainer = ({ children, className }: any) => {
  return (
    <div className={cn('flex flex-col space-y-2', className)}>{children}</div>
  );
};
