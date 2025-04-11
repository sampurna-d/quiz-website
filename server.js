// server.js - Backend for Stripe integration
require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Debug logging for static file serving
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

// Middleware
// Use absolute path for static files
app.use(express.static(__dirname));
app.use(express.json());
app.use(cors());

// Add a route for the root path to serve index.html explicitly
app.get('/', (req, res) => {
  console.log('Serving index.html from root path');
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Add a simple test route
app.get('/api/test', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running properly' });
});

// Create a Stripe checkout session
app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Fix Your Broken Window Guide',
              description: 'A comprehensive guide on fixing broken windows',
            },
            unit_amount: 997, // $9.97 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/confirmation.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/index.html`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Verify session and provide download access
app.get('/verify-session/:sessionId', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    
    if (session.payment_status === 'paid') {
      res.json({ 
        success: true, 
        downloadUrl: '/downloads/doom-scroller-fix-guide.pdf' 
      });
    } else {
      res.status(400).json({ success: false, message: 'Payment not completed' });
    }
  } catch (error) {
    console.error('Error verifying session:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(`Current directory: ${__dirname}`);
  // List files in the current directory for debugging
  fs.readdir(__dirname, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }
    console.log('Files in current directory:');
    files.forEach(file => {
      console.log(` - ${file}`);
    });
  });
});
