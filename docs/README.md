# Chobify - Smart Quizzes. Smarter Minds.

Chobify is a modern web application for personality quizzes that provides insightful results and personalized guides through a clean, intuitive interface.

## Project Structure

The project has been modularized for better maintainability and easier extension:

```
/app                  # Next.js app router pages
  /confirmation       # Payment confirmation page
  /privacy            # Privacy policy page
  /quiz               # Quiz page
  /terms              # Terms & conditions page
  layout.tsx          # Main app layout
  page.tsx            # Homepage

/components           # React components
  /ui                 # UI component library
  navbar.tsx          # Navigation bar
  quiz-container.tsx  # Main quiz container
  quiz-question.tsx   # Question component
  results-screen.tsx  # Results display
  ...

/lib                  # Application logic
  /quiz-data          # Quiz data files
    broken-window.ts  # Broken window quiz data
    index.ts          # Quiz registry
  /utils              # Utility functions
    quiz-utils.ts     # Quiz-related utilities
  config.ts           # Global configuration
  types.ts            # TypeScript type definitions
  
/public               # Static assets
  /downloads          # Downloadable PDF guides
  *.png               # Images for results
  favicon.ico         # Browser tab icon
  logo.png            # App logo

/docs                 # Documentation
  HOW_TO_ADD_NEW_QUIZ.md  # Guide for adding quizzes
  README.md           # Project overview (this file)
```

## Configuration and Customization

The application is designed to be easily configurable through the centralized `lib/config.ts` file, which includes:

- Application metadata (name, description)
- Quiz types and configuration
- File paths for downloadable PDFs
- Image paths for result illustrations
- Route definitions

## Adding New Quizzes

The project supports adding multiple quizzes with different themes. See `docs/HOW_TO_ADD_NEW_QUIZ.md` for step-by-step instructions.

## Key Features

- Modular quiz system supporting multiple quiz types
- Centralized configuration
- Clean separation of concerns
- Responsive design
- Dark/light mode support
- Stripe payment integration
- PDF guide delivery

## Technologies

- Next.js 14+
- React
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- Stripe for payments

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Configure environment variables:
   - Copy `.env.example` to `.env.local`
   - Add your Stripe API keys

3. Start the development server:
   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Testing

All parts of the application can be tested:

- Quizzes
- Result calculation
- PDF downloads
- Stripe payment flow

## Deployment

The app is ready for deployment on Vercel or similar platforms.

## Extending

The modular structure makes it easy to:

- Add new quiz types
- Create new result types
- Customize styling
- Add new features 