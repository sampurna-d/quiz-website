import { createClient } from '@supabase/supabase-js';

// These environment variables are set in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Log environment variables for debugging (remove in production)
if (process.env.NODE_ENV === 'development') {
  console.log('Supabase URL:', supabaseUrl ? 'URL exists' : 'URL missing');
  console.log('Supabase Key:', supabaseKey ? 'Key exists' : 'Key missing');
}

// Create a singleton Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey); 