import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseTables, createSupabaseTablesWithSQL } from '@/lib/create-supabase-tables';

export async function GET(request: NextRequest) {
  try {
    // Check if this is a development environment
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json(
        { error: 'This endpoint is only available in development mode' },
        { status: 403 }
      );
    }
    
    // Get method type from query parameters
    const method = request.nextUrl.searchParams.get('method') || 'rpc';
    
    let result;
    
    if (method === 'sql') {
      // Use SQL method
      result = await createSupabaseTablesWithSQL();
    } else {
      // Use RPC method (default)
      result = await createSupabaseTables();
    }
    
    if (result.success) {
      return NextResponse.json({ message: result.message });
    } else {
      return NextResponse.json(
        { error: result.message },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error setting up database:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred setting up the database' },
      { status: 500 }
    );
  }
} 