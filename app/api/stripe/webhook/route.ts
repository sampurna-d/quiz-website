import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
// import { supabase } from '@/lib/supabase'; // Removed Supabase import
import Stripe from 'stripe';
import { ACTIVE_QUIZ_TYPE, getPdfFilePath } from '@/lib/config';

// This is your Stripe CLI webhook secret for testing your endpoint locally
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Map Stripe payment status to Supabase allowed values - REMOVED as Supabase integration is removed
/*
function mapPaymentStatus(stripeStatus: string): string {
  // Map Stripe payment status to values accepted by Supabase
  const statusMap: Record<string, string> = {
    'paid': 'succeeded',
    'unpaid': 'pending',
    'no_payment_required': 'succeeded',
    'free': 'succeeded',
    'canceled': 'failed'
  };
  
  return statusMap[stripeStatus] || 'pending';
}
*/

export async function POST(request: NextRequest) {
  const payload = await request.text();
  const sig = request.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    // Verify the webhook signature
    if (endpointSecret) {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
      console.log('Webhook signature verified successfully');
    } else {
      // For testing without signature verification
      console.warn('No webhook secret found, parsing event without verification');
      event = JSON.parse(payload) as Stripe.Event;
    }
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  try {
    console.log(`Processing webhook event type: ${event.type}`);
    
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('Processing completed checkout session:', session.id);
        await handleCompletedCheckout(session);
        break;
      }
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        // Handle successful payment intent
        console.log('Payment succeeded:', paymentIntent.id);
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Error processing webhook' }, { status: 500 });
  }
}

async function handleCompletedCheckout(session: Stripe.Checkout.Session) {
  // Extract information from the session
  const resultType = session.metadata?.resultType;
  const sessionId = session.id;
  const stripePaymentStatus = session.payment_status;
  const amount = session.amount_total;

  console.log(`Handling checkout completion for session ${sessionId}`);
  console.log(`Result type: ${resultType}, Payment status: ${stripePaymentStatus}`);

  if (!resultType) {
    console.error('Missing result type in session metadata');
    return;
  }

  // Removed Supabase logic for checking existing purchase and storing purchase/download info
  // Stripe already stores this information, so we don't need a separate database.
  
  // Check if payment was successful
  if (stripePaymentStatus === 'paid') {
    console.log(`Payment successful for session ${sessionId}. Customer email: ${session.customer_details?.email}`);
    // Potentially send confirmation email here or trigger other post-purchase actions if needed.
  } else {
    console.log(`Payment status for session ${sessionId}: ${stripePaymentStatus}. No action taken.`);
  }
  
  // Use the config helper to get the correct PDF file name
  const pdfFileName = getPdfFilePath(ACTIVE_QUIZ_TYPE, resultType);
  console.log(`PDF file for download: ${pdfFileName}`);
  
  console.log('Successfully processed webhook for session', sessionId);
} 