import { supabase } from "./supabase";

/**
 * Creates the necessary tables in Supabase for the quiz application
 * Run this once from an API endpoint or script to set up the database
 */
export async function createSupabaseTables() {
  try {
    console.log('Starting table creation process...');
    
    // Create quiz_results table
    const { error: quizResultsError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'quiz_results',
      table_definition: `
        id uuid primary key default uuid_generate_v4(),
        user_id uuid,
        result_type varchar not null,
        answers jsonb not null,
        created_at timestamptz default now()
      `
    });
    
    if (quizResultsError) {
      console.error('Error creating quiz_results table:', quizResultsError);
    } else {
      console.log('quiz_results table created or already exists');
    }
    
    // Create purchases table
    const { error: purchasesError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'purchases',
      table_definition: `
        id uuid primary key default uuid_generate_v4(),
        user_id uuid,
        result_type varchar not null,
        stripe_session_id varchar not null,
        payment_status varchar not null,
        amount integer,
        created_at timestamptz default now(),
        updated_at timestamptz default now()
      `
    });
    
    if (purchasesError) {
      console.error('Error creating purchases table:', purchasesError);
    } else {
      console.log('purchases table created or already exists');
    }
    
    // Create downloads table
    const { error: downloadsError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'downloads',
      table_definition: `
        id uuid primary key default uuid_generate_v4(),
        purchase_id uuid not null,
        download_link varchar not null,
        download_count integer default 0,
        expires_at timestamptz not null,
        created_at timestamptz default now(),
        foreign key (purchase_id) references purchases (id)
      `
    });
    
    if (downloadsError) {
      console.error('Error creating downloads table:', downloadsError);
    } else {
      console.log('downloads table created or already exists');
    }
    
    console.log('Table creation process completed');
    
    return {
      success: true,
      message: 'Tables created successfully'
    };
  } catch (error) {
    console.error('Error creating tables:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Alternative function that creates tables using SQL statements directly
 * Use this if the RPC method doesn't work
 * Note: This requires using the REST API method as supabase-js doesn't support direct SQL queries
 */
export async function createSupabaseTablesWithSQL() {
  try {
    console.log('Starting table creation with SQL...');
    
    // Create quiz_results table
    const { error: quizResultsError } = await supabase.from('quiz_results').select('id').limit(1);
    
    if (quizResultsError && quizResultsError.code === '42P01') { // Relation does not exist
      // Using REST API to execute SQL
      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/execute_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          sql: `
            CREATE TABLE quiz_results (
              id uuid primary key default uuid_generate_v4(),
              user_id uuid,
              result_type varchar not null,
              answers jsonb not null,
              created_at timestamptz default now()
            );
          `
        })
      });
      
      if (!response.ok) {
        console.error('Error creating quiz_results table:', await response.text());
      } else {
        console.log('quiz_results table created');
      }
    } else {
      console.log('quiz_results table already exists');
    }
    
    // Create purchases table
    const { error: purchasesError } = await supabase.from('purchases').select('id').limit(1);
    
    if (purchasesError && purchasesError.code === '42P01') { // Relation does not exist
      // Using REST API to execute SQL
      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/execute_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          sql: `
            CREATE TABLE purchases (
              id uuid primary key default uuid_generate_v4(),
              user_id uuid,
              result_type varchar not null,
              stripe_session_id varchar not null,
              payment_status varchar not null,
              amount integer,
              created_at timestamptz default now(),
              updated_at timestamptz default now()
            );
          `
        })
      });
      
      if (!response.ok) {
        console.error('Error creating purchases table:', await response.text());
      } else {
        console.log('purchases table created');
      }
    } else {
      console.log('purchases table already exists');
    }
    
    // Create downloads table
    const { error: downloadsError } = await supabase.from('downloads').select('id').limit(1);
    
    if (downloadsError && downloadsError.code === '42P01') { // Relation does not exist
      // Using REST API to execute SQL
      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/execute_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          sql: `
            CREATE TABLE downloads (
              id uuid primary key default uuid_generate_v4(),
              purchase_id uuid not null references purchases(id),
              download_link varchar not null,
              download_count integer default 0,
              expires_at timestamptz not null,
              created_at timestamptz default now()
            );
          `
        })
      });
      
      if (!response.ok) {
        console.error('Error creating downloads table:', await response.text());
      } else {
        console.log('downloads table created');
      }
    } else {
      console.log('downloads table already exists');
    }
    
    console.log('Table creation with SQL completed');
    
    return {
      success: true,
      message: 'Tables created successfully'
    };
  } catch (error) {
    console.error('Error creating tables with SQL:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
} 