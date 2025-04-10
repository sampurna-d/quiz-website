import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    // Get the table name from query params
    const tableName = request.nextUrl.searchParams.get('table') || 'purchases';
    const columnName = request.nextUrl.searchParams.get('column') || 'payment_status';
    
    console.log(`Checking constraints for ${tableName}.${columnName}`);
    
    // Query to get check constraints
    const { data: constraints, error: constraintsError } = await supabase
      .from('information_schema.check_constraints')
      .select('constraint_name, check_clause')
      .eq('table_name', tableName);
    
    if (constraintsError) {
      console.error('Error fetching constraints:', constraintsError);
    }
    
    // Try to get column type information
    const { data: columns, error: columnsError } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type, udt_name')
      .eq('table_name', tableName);
    
    if (columnsError) {
      console.error('Error fetching column info:', columnsError);
    }
    
    // Try to execute a simple query to see what's in the table
    const { data: sampleData, error: sampleError } = await supabase
      .from(tableName)
      .select('*')
      .limit(2);
    
    if (sampleError) {
      console.error('Error fetching sample data:', sampleError);
    }
    
    // Try to see what enums exist
    const { data: enums, error: enumsError } = await supabase
      .from('pg_enum')
      .select('*');
    
    if (enumsError) {
      console.error('Error fetching enums:', enumsError);
    }
    
    // Try inserting with different payment statuses to see which ones work
    const statuses = ['paid', 'succeeded', 'pending', 'failed', 'complete'];
    const results: Record<string, boolean> = {};
    
    for (const status of statuses) {
      // Insert with a unique session ID to avoid conflicts
      const testSessionId = `test-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      
      const { error: insertError } = await supabase
        .from('purchases')
        .insert({
          stripe_session_id: testSessionId,
          result_type: 'A',
          payment_status: status,
          amount: 1000
        });
      
      results[status] = !insertError;
      
      if (insertError) {
        console.error(`Error inserting with status '${status}':`, insertError);
      } else {
        // Clean up the test data
        await supabase
          .from('purchases')
          .delete()
          .eq('stripe_session_id', testSessionId);
      }
    }
    
    return NextResponse.json({
      constraints,
      columns,
      sampleData,
      enums,
      statusTests: results
    });
  } catch (error: any) {
    console.error('Error checking constraints:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to check constraints' },
      { status: 500 }
    );
  }
} 