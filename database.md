# Database Schema

This file documents the database structure for the Quiz Website.

## Supabase Tables

### quiz_results
- `id`: uuid (primary key, auto-generated)
- `user_id`: uuid (optional, for authenticated users)
- `result_type`: varchar (A, B, C, D - the quiz result type)
- `answers`: jsonb (array of answers)
- `created_at`: timestamp with time zone (default: now())

### purchases
- `id`: uuid (primary key, auto-generated)
- `user_id`: uuid (optional, for authenticated users)
- `result_type`: varchar (quiz result type)
- `stripe_session_id`: varchar (Stripe checkout session ID)
- `payment_status`: varchar (succeeded, pending, failed)
- `amount`: integer (payment amount in cents)
- `created_at`: timestamp with time zone (default: now())
- `updated_at`: timestamp with time zone (default: now())

### downloads
- `id`: uuid (primary key, auto-generated)
- `purchase_id`: uuid (references purchases.id)
- `download_link`: varchar (secure link to the PDF file)
- `download_count`: integer (number of times downloaded)
- `expires_at`: timestamp with time zone (when the download link expires)
- `created_at`: timestamp with time zone (default: now()) 