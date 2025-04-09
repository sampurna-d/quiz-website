# Personality Quiz Website

A web application that features a personality quiz with Stripe payment integration for a premium guide.

## Features

- Interactive personality quiz with 8 questions
- Dynamic results based on user responses
- Stripe payment integration for purchasing a premium guide
- Responsive design

## Project Structure

- `index.html` - Main quiz page
- `confirmation.html` - Payment confirmation page
- `server.js` - Express server with Stripe integration
- `quiz-data.js` - Quiz questions and results data
- `quiz.js` - Quiz logic implementation
- `stripe-integration.js` - Frontend Stripe integration
- `theme-toggle.js` - Theme toggling functionality
- `styles.css` - Styling for the application

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Set up environment variables:
   Create a `.env` file with your Stripe API keys:
   ```
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## User Flow

1. User starts the personality quiz
2. After completing the quiz, they receive their personality type
3. Option to purchase a premium guide appears
4. Upon successful payment, user can download the guide