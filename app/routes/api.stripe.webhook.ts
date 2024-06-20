import { ActionFunction } from '@remix-run/node';
import Stripe from 'stripe';
import { json } from '@remix-run/node';

const stripe = new Stripe('sk_test_51MHXZUEgY6MBu39VixkCIV3jGzyEwiNH4erWFmOQOw3ikBTFYlg4q3Tr1Pyl0qVmcareUPki52ZPox4FQiAPVyJ200JfF9B16T', {
  apiVersion: '2022-11-15',
});

export const action: ActionFunction = async ({ request }) => {
  const sig = request.headers.get('stripe-signature')!;
  const secret = 'whsec_...'; // Your webhook signing secret

  let event;

  try {
    const body = await request.text();
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err) {
    console.error('Webhook signature verification failed.');
    return new Response('Webhook Error', { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Payment was successful!', session);
      // Handle successful payment here
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response(null, { status: 200 });
};
