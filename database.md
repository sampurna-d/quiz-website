# Database Schema

This file documents the database structure for the Quiz Website.

## Database Usage

This application **no longer uses a dedicated database** (like Supabase).

Customer and purchase information is managed by **Stripe**.

- **Customer Information**: Stored within Stripe Customer objects, linked to payments.
- **Purchase Details**: Handled via Stripe Checkout Sessions and Payment Intents.
- **Quiz Results**: Quiz results (like result type 'A', 'B', etc.) are passed as metadata during the Stripe Checkout process and retrieved on the confirmation page to provide the correct download link.
- **Download Links**: Generated dynamically on the confirmation page based on the quiz result type retrieved from Stripe session metadata. The PDF files are served statically.