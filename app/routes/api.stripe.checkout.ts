// app/routes/api.stripe.checkout.ts
import { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import Stripe from 'stripe';

// Usa la clave secreta correcta de Stripe
const stripe = new Stripe('sk_test_51MHXZUEgY6MBu39VixkCIV3jGzyEwiNH4erWFmOQOw3ikBTFYlg4q3Tr1Pyl0qVmcareUPki52ZPox4FQiAPVyJ200JfF9B16T', {
  apiVersion: '2022-11-15',
});

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const plan = url.searchParams.get('plan');

    if (!plan) {
      return json({ error: 'Plan is required' }, { status: 400 });
    }

    let price;
    switch (plan) {
      case 'gold':
        price = 9900; // $99.00
        break;
      case 'diamond':
        price = 28900; // $289.00
        break;
      default:
        return json({ error: 'Invalid plan' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/successPayment',
      cancel_url: 'http://localhost:3000/cancelPayment',
    });

    return json({ id: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
};
