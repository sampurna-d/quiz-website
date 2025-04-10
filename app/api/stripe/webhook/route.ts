import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';
import Stripe from 'stripe';

// This is your Stripe CLI webhook secret for testing your endpoint locally
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Map Stripe payment status to Supabase allowed values
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

  try {
    // Check if this session is already processed
    const { data: existingPurchase } = await supabase
      .from('purchases')
      .select('id')
      .eq('stripe_session_id', sessionId)
      .single();
    
    if (existingPurchase) {
      console.log(`Session ${sessionId} already processed, skipping`);
      return;
    }

    // Map the Stripe payment status to a value that's valid for our database
    const dbPaymentStatus = mapPaymentStatus(stripePaymentStatus);
    console.log(`Mapped payment status: ${stripePaymentStatus} -> ${dbPaymentStatus}`);

    // Store purchase information in Supabase
    console.log('Creating purchase record in Supabase');
    const { data: purchase, error: purchaseError } = await supabase
      .from('purchases')
      .insert({
        stripe_session_id: sessionId,
        result_type: resultType,
        payment_status: dbPaymentStatus,
        amount: amount,
      })
      .select()
      .single();

    if (purchaseError) {
      console.error('Error storing purchase:', purchaseError);
      return;
    }

    // Generate download link
    const pdfFileName = getPdfFileNameByResultType(resultType);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // Set expiry to 30 days from now

    // Store download information
    console.log('Creating download record in Supabase');
    const { error: downloadError } = await supabase.from('downloads').insert({
      purchase_id: purchase.id,
      download_link: pdfFileName,
      download_count: 0,
      expires_at: expiresAt.toISOString(),
    });

    if (downloadError) {
      console.error('Error creating download record:', downloadError);
    } else {
      console.log('Successfully processed session', sessionId);
    }
  } catch (error) {
    console.error('Error in handleCompletedCheckout:', error);
  }
}

function getPdfFileNameByResultType(resultType: string): string {
  const fileNames = {
    'A': 'doom-scroller-fix-guide.pdf',
    'B': 'overthinker-fix-guide.pdf',
    'C': 'multitask-monster-fix-guide.pdf',
    'D': 'chaos-starter-fix-guide.pdf',
  };
  return fileNames[resultType as keyof typeof fileNames] || 'fix-broken-window-guide.pdf';
} 