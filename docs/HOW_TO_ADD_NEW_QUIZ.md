# How to Add a New Quiz to Chobify

This guide will walk you through the process of adding a new quiz to the Chobify application.

## Step 1: Define the Quiz Type

First, add your new quiz type to the config file:

1. Open `lib/config.ts`
2. Add your new quiz type to the `QUIZ_TYPES` array:
   ```typescript
   export const QUIZ_TYPES = ["BROKEN_WINDOW", "YOUR_NEW_QUIZ_TYPE"] as const
   ```
3. Update the result title mappings:
   ```typescript
   export const RESULT_TITLES: Record<QuizType, Record<string, string>> = {
     BROKEN_WINDOW: { /* existing mappings */ },
     YOUR_NEW_QUIZ_TYPE: {
       "A": "Your Type A Title",
       "B": "Your Type B Title",
       // Add more result types as needed
     }
   }
   ```
4. Add PDF file paths:
   ```typescript
   export const PDF_FILE_PATHS: Record<QuizType, Record<string, string>> = {
     BROKEN_WINDOW: { /* existing mappings */ },
     YOUR_NEW_QUIZ_TYPE: {
       "A": "type-a-guide.pdf",
       "B": "type-b-guide.pdf",
       // Add more result types as needed
     }
   }
   ```
   
   Note: The default fallback PDF is `doom-scroller-fix-guide.pdf`. Make sure this file always exists in your `public/downloads/` directory.

5. Add result image paths:
   ```typescript
   export const RESULT_IMAGE_PATHS: Record<QuizType, Record<string, string>> = {
     BROKEN_WINDOW: { /* existing mappings */ },
     YOUR_NEW_QUIZ_TYPE: {
       "A": "/YourTypeA.png",
       "B": "/YourTypeB.png",
       // Add more result types as needed
     }
   }
   ```

## Step 2: Create the Quiz Data

1. You can use the template generator to create a starting point:
   ```typescript
   import { createQuizTemplate } from "@/lib/utils/quiz-utils";
   
   const newQuizTemplate = createQuizTemplate(
     "Your Quiz Title",
     ["A", "B", "C", "D"] // Or your custom result types
   );
   
   console.log(JSON.stringify(newQuizTemplate, null, 2));
   ```

2. Create a new file in `lib/quiz-data/your-new-quiz.ts`:
   ```typescript
   import type { QuizDataType } from "../types"
   
   export const yourNewQuiz: QuizDataType = {
     questions: [
       // Define your questions here
       {
         id: 1,
         text: "Your first question?",
         options: [
           { id: "A", text: "Option A", emoji: "😀" },
           { id: "B", text: "Option B", emoji: "🤔" },
           // Add more options
         ],
       },
       // Add more questions
     ],
     results: {
       "A": {
         title: "Result A Title",
         description: "Description for result A",
         fixTools: ["Tool 1", "Tool 2", "Tool 3"],
       },
       "B": {
         title: "Result B Title",
         description: "Description for result B",
         fixTools: ["Tool 1", "Tool 2", "Tool 3"],
       },
       // Add more results
     },
   }
   ```

## Step 3: Register Your Quiz

Open `lib/quiz-data/index.ts` and add your quiz to the `QUIZZES_BY_TYPE` object:

```typescript
import { brokenWindowQuiz } from "./broken-window"
import { yourNewQuiz } from "./your-new-quiz"
import { ACTIVE_QUIZ_TYPE, QUIZ_TYPES, type QuizType } from "../config"
import type { QuizDataType } from "../types"

export const QUIZZES_BY_TYPE: Record<QuizType, QuizDataType> = {
  BROKEN_WINDOW: brokenWindowQuiz,
  YOUR_NEW_QUIZ_TYPE: yourNewQuiz,
}
```

## Step 4: Create the Result PDFs and Images

1. Create PDF guides for each result type and place them in the `public/downloads/` directory
2. Create result images and place them in the `public/` directory
3. Ensure the filenames match what you specified in `config.ts`
4. Make sure you have a file matching the DEFAULT_PDF_PATH (`doom-scroller-fix-guide.pdf`) as a fallback

## Step 5: Set Your Quiz as Active (Optional)

To make your quiz the active quiz, update `ACTIVE_QUIZ_TYPE` in `lib/config.ts`:

```typescript
export const ACTIVE_QUIZ_TYPE: QuizType = "YOUR_NEW_QUIZ_TYPE"
```

## Step 6: Test Your Quiz

1. Start the development server: `npm run dev`
2. Navigate to `/quiz` to make sure your quiz loads correctly
3. Test the entire flow including results and PDF generation

## Adding Multiple Quizzes with Navigation

If you want to allow users to select from multiple quizzes:

1. Create a quiz selection page
2. Add routes for each quiz (e.g., `/quiz/broken-window`, `/quiz/your-new-quiz`)
3. Update the main quiz page to pass the selected quiz type to the QuizContainer component

## Example Multiple Quiz Selection Component

```tsx
import { QUIZ_TYPES, getQuizLabel } from "@/lib/config"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function QuizSelector() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {QUIZ_TYPES.map((quizType) => (
        <Button asChild key={quizType} className="h-auto p-4 text-left" variant="outline">
          <Link href={`/quiz/${quizType.toLowerCase()}`}>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold">{getQuizLabel(quizType)}</h3>
              <p className="text-sm text-muted-foreground">
                Take the {getQuizLabel(quizType)} quiz
              </p>
            </div>
          </Link>
        </Button>
      ))}
    </div>
  )
}
```

Need more help? Contact the development team. 