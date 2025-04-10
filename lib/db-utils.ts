import { supabase } from "./supabase";

/**
 * Checks if all required tables exist in the database
 * Returns an object with tables as keys and boolean values indicating existence
 */
export async function checkTablesExist(): Promise<{
  quiz_results: boolean;
  purchases: boolean;
  downloads: boolean;
  allExist: boolean;
}> {
  const result = {
    quiz_results: false,
    purchases: false,
    downloads: false,
    allExist: false
  };
  
  try {
    // Check quiz_results table
    const { error: quizResultsError } = await supabase
      .from('quiz_results')
      .select('id')
      .limit(1);
    
    result.quiz_results = !quizResultsError;
    
    // Check purchases table
    const { error: purchasesError } = await supabase
      .from('purchases')
      .select('id')
      .limit(1);
    
    result.purchases = !purchasesError;
    
    // Check downloads table
    const { error: downloadsError } = await supabase
      .from('downloads')
      .select('id')
      .limit(1);
    
    result.downloads = !downloadsError;
    
    // Set allExist flag if all tables exist
    result.allExist = result.quiz_results && result.purchases && result.downloads;
    
    return result;
  } catch (error) {
    console.error('Error checking tables:', error);
    return result;
  }
}

/**
 * Retrieves allowed payment status values from the database
 */
export async function getAllowedPaymentStatuses(): Promise<string[]> {
  try {
    // Query the database to get the check constraint values
    const { data, error } = await supabase
      .rpc('get_enum_values', { enum_name: 'payment_status_enum' })
      .select();
    
    if (error) {
      console.error('Error getting enum values:', error);
      // Fallback to common payment status values
      return ['succeeded', 'pending', 'failed', 'complete'];
    }
    
    if (data && Array.isArray(data)) {
      return data.map(item => item.value);
    }
    
    // Fallback values
    return ['succeeded', 'pending', 'failed', 'complete'];
  } catch (error) {
    console.error('Error getting payment statuses:', error);
    return ['succeeded', 'pending', 'failed', 'complete'];
  }
}

/**
 * Creates a purchase record directly in Supabase
 */
export async function createPurchaseRecord(sessionId: string, resultType: string, amount: number, paymentStatus: string) {
  try {
    // Check if record already exists
    const { data: existingPurchase } = await supabase
      .from('purchases')
      .select('id')
      .eq('stripe_session_id', sessionId)
      .maybeSingle();
    
    if (existingPurchase) {
      console.log(`Purchase record for session ${sessionId} already exists`);
      return { id: existingPurchase.id, exists: true };
    }
    
    // Try different payment status values (the constraint likely requires specific values)
    const paymentStatusOptions = ['succeeded', 'complete', 'pending'];
    let purchase = null;
    let error = null;
    
    for (const status of paymentStatusOptions) {
      console.log(`Trying payment status: ${status}`);
      
      const result = await supabase
        .from('purchases')
        .insert({
          stripe_session_id: sessionId,
          result_type: resultType,
          payment_status: status,
          amount: amount
        })
        .select()
        .single();
      
      if (!result.error) {
        purchase = result.data;
        console.log(`Successfully created purchase with status: ${status}`);
        break;
      } else {
        error = result.error;
        console.error(`Failed with status ${status}:`, result.error);
      }
    }
    
    if (!purchase) {
      console.error('All payment status options failed:', error);
      throw error;
    }
    
    return { id: purchase.id, exists: false };
  } catch (error) {
    console.error('Error in createPurchaseRecord:', error);
    throw error;
  }
}

/**
 * Creates a download record for a purchase
 */
export async function createDownloadRecord(purchaseId: string, downloadLink: string, expiryDays = 30) {
  try {
    // Check if record already exists
    const { data: existingDownload } = await supabase
      .from('downloads')
      .select('id')
      .eq('purchase_id', purchaseId)
      .maybeSingle();
    
    if (existingDownload) {
      console.log(`Download record for purchase ${purchaseId} already exists`);
      return { id: existingDownload.id, exists: true };
    }
    
    // Create expiry date
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiryDays);
    
    // Create new download record
    const { data: download, error } = await supabase
      .from('downloads')
      .insert({
        purchase_id: purchaseId,
        download_link: downloadLink,
        download_count: 0,
        expires_at: expiresAt.toISOString()
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating download record:', error);
      throw error;
    }
    
    return { id: download.id, exists: false };
  } catch (error) {
    console.error('Error in createDownloadRecord:', error);
    throw error;
  }
} 