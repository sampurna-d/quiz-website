import { brokenWindowQuiz } from "./broken-window"
import { ACTIVE_QUIZ_TYPE, QUIZ_TYPES, type QuizType } from "../config"
import type { QuizDataType } from "../types"

/**
 * This file serves as a central registry for all quizzes in the application
 * To add a new quiz:
 * 1. Create a new file in this directory with the quiz data
 * 2. Import it here
 * 3. Add it to the QUIZZES_BY_TYPE object with its appropriate type
 * 4. Update the QUIZ_TYPES in the config.ts file
 */

// Map of all quizzes by their type
export const QUIZZES_BY_TYPE: Record<QuizType, QuizDataType> = {
  BROKEN_WINDOW: brokenWindowQuiz,
}

// Get the currently active quiz data
export function getActiveQuizData(): QuizDataType {
  return QUIZZES_BY_TYPE[ACTIVE_QUIZ_TYPE]
}

// Get quiz data by type
export function getQuizDataByType(type: QuizType): QuizDataType {
  return QUIZZES_BY_TYPE[type]
}

// Default export for backward compatibility
export const quizData = getActiveQuizData() 