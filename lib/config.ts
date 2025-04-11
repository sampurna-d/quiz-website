/**
 * Global configuration for the Chobify application
 * This file centralizes all constants, settings, and configuration options
 */

// Application metadata
export const APP_NAME = "Chobify"
export const APP_TAGLINE = "Smart Quizzes. Smarter Minds."
export const APP_DESCRIPTION = "Take our personality quiz to discover your broken window and learn how to fix it."
export const CONTACT_EMAIL = "business.uahd@gmail.com"

// Quiz configuration
export const QUIZ_TYPES = ["BROKEN_WINDOW"] as const
export type QuizType = typeof QUIZ_TYPES[number]

// Current active quiz
export const ACTIVE_QUIZ_TYPE: QuizType = "BROKEN_WINDOW"

// Result type mappings (for each quiz type)
export const RESULT_TITLES: Record<QuizType, Record<string, string>> = {
  BROKEN_WINDOW: {
    "A": "The Doom Scroller",
    "B": "The Overthinker",
    "C": "The Multitask Monster",
    "D": "The Chaos Starter"
  }
}

// File paths for downloadable PDFs by result type
export const PDF_FILE_PATHS: Record<QuizType, Record<string, string>> = {
  BROKEN_WINDOW: {
    "A": "doom-scroller-fix-guide.pdf",
    "B": "overthinker-fix-guide.pdf",
    "C": "multitask-monster-fix-guide.pdf",
    "D": "chaos-starter-fix-guide.pdf",
  }
}

// Default fallback PDF if specific type not found
export const DEFAULT_PDF_PATH = "doom-scroller-fix-guide.pdf"

// Image paths for result illustrations
export const RESULT_IMAGE_PATHS: Record<QuizType, Record<string, string>> = {
  BROKEN_WINDOW: {
    "A": "/TheDoomScroller.png",
    "B": "/TheOverthinker.png",
    "C": "/TheMultitaskMonster.png",
    "D": "/TheChaosStarter.png",
  }
}

// Default image if specific type not found
export const DEFAULT_RESULT_IMAGE = "/default-result.png"

// Routes
export const ROUTES = {
  HOME: "/",
  QUIZ: "/quiz",
  CONFIRMATION: "/confirmation",
  PRIVACY: "/privacy",
  TERMS: "/terms",
}

// Logo paths
export const LOGO = {
  FULL: "/logo.png",
  ICON: "/favicon.ico",
}

// Helper functions
export function getResultTitle(quizType: QuizType, resultType: string): string {
  return RESULT_TITLES[quizType]?.[resultType] || "Personalized Result"
}

export function getPdfFilePath(quizType: QuizType, resultType: string): string {
  return PDF_FILE_PATHS[quizType]?.[resultType] || DEFAULT_PDF_PATH
}

export function getResultImagePath(quizType: QuizType, resultType: string): string {
  return RESULT_IMAGE_PATHS[quizType]?.[resultType] || DEFAULT_RESULT_IMAGE
} 