import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';

// Type definitions for the request
interface CheckoutRequest {
  resultType: string; // A, B, C, D
  answers: string[];  // Array of user answers
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body: CheckoutRequest = await request.json();
    const { resultType, answers } = body;
    
    // Validate the input
    if (!resultType || !['A', 'B', 'C', 'D'].includes(resultType)) {
      return NextResponse.json({ error: 'Invalid result type' }, { status: 400 });
    }
    
    // Get product details based on result type
    const productName = getProductName(resultType);
    const productDescription = getProductDescription(resultType);
    const price = 997; // $9.97 in cents
    
    // Create a checkout session with Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: productName,
              description: productDescription,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.nextUrl.origin}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/`,
      metadata: {
        resultType,
      },
    });
    
    // Store information in Supabase
    const { error } = await supabase.from('quiz_results').insert({
      result_type: resultType,
      answers: answers,
    });
    
    if (error) {
      console.error('Error storing quiz results:', error);
      // Continue with checkout even if database storage fails
    }
    
    // Return the session ID
    return NextResponse.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}

// Helper functions to get product details based on result type
function getProductName(resultType: string): string {
  const names = {
    'A': 'Doom Scroller Fix Guide',
    'B': 'Overthinker Fix Guide',
    'C': 'Multitask Monster Fix Guide',
    'D': 'Chaos Starter Fix Guide',
  };
  return names[resultType as keyof typeof names] || 'Personalized Fix Guide';
}

function getProductDescription(resultType: string): string {
  const descriptions = {
    'A': 'A comprehensive guide to overcome your Doom Scrolling habits',
    'B': 'A detailed roadmap to break free from Overthinking patterns',
    'C': 'A step-by-step plan to defeat your Multitasking Monster',
    'D': 'A practical system to transform Chaos into Calm',
  };
  return descriptions[resultType as keyof typeof descriptions] || 'Your personalized guide to fixing your broken window';
} 