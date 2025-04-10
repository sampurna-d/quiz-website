import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    // Get session ID from the URL query parameter
    const sessionId = request.nextUrl.searchParams.get('session_id');
    
    console.log(`Verifying download access for session: ${sessionId}`);
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }
    
    // Lookup purchase with this session ID
    const { data: purchase, error: purchaseError } = await supabase
      .from('purchases')
      .select('id, result_type, payment_status')
      .eq('stripe_session_id', sessionId)
      .single();
    
    if (purchaseError) {
      console.error('Purchase lookup error:', purchaseError);
      return NextResponse.json(
        { error: 'Purchase not found or not verified' },
        { status: 404 }
      );
    }
    
    if (!purchase) {
      console.log('No purchase found for session ID:', sessionId);
      return NextResponse.json(
        { error: 'Purchase not found. Please complete payment first.' },
        { status: 404 }
      );
    }
    
    console.log(`Found purchase: ${purchase.id}, payment status: ${purchase.payment_status}`);
    
    if (purchase.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 403 }
      );
    }
    
    // Get download information
    const { data: download, error: downloadError } = await supabase
      .from('downloads')
      .select('download_link, download_count, expires_at')
      .eq('purchase_id', purchase.id)
      .single();
    
    if (downloadError) {
      console.error('Download lookup error:', downloadError);
      return NextResponse.json(
        { error: 'Download information not found' },
        { status: 404 }
      );
    }
    
    if (!download) {
      console.log('No download found for purchase ID:', purchase.id);
      return NextResponse.json(
        { error: 'Download record not found. Please contact support.' },
        { status: 404 }
      );
    }
    
    console.log(`Found download: ${download.download_link}, expires: ${download.expires_at}`);
    
    // Check if download link has expired
    const now = new Date();
    const expiresAt = new Date(download.expires_at);
    
    if (now > expiresAt) {
      return NextResponse.json(
        { error: 'Download link has expired' },
        { status: 403 }
      );
    }
    
    // Increment download count
    const { error: updateError } = await supabase
      .from('downloads')
      .update({ download_count: download.download_count + 1 })
      .eq('purchase_id', purchase.id);
      
    if (updateError) {
      console.error('Failed to update download count:', updateError);
      // Continue even if update fails
    }
    
    // Return download information
    return NextResponse.json({
      downloadLink: `/downloads/${download.download_link}`,
      resultType: purchase.result_type,
    });
  } catch (error: any) {
    console.error('Error verifying download access:', error);
    return NextResponse.json(
      { error: 'Failed to verify download access: ' + error.message },
      { status: 500 }
    );
  }
} 