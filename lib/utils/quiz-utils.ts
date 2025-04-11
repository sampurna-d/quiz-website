import type { QuizDataType } from "@/lib/types"

/**
 * Calculate the predominant result type based on user answers
 * @param userAnswers - Array of answer IDs selected by the user
 * @param possibleTypes - Array of possible result types (e.g., ["A", "B", "C", "D"])
 * @returns The predominant result type
 */
export function calculateResultType(
  userAnswers: string[],
  possibleTypes: string[] = ["A", "B", "C", "D"]
): string {
  // Initialize counts for each type
  const answerCounts: Record<string, number> = {}
  possibleTypes.forEach(type => {
    answerCounts[type] = 0
  })

  // Count occurrences of each answer type
  userAnswers.forEach(answer => {
    if (answer && answerCounts[answer] !== undefined) {
      answerCounts[answer]++
    }
  })

  // Find predominant type
  let predominantType = possibleTypes[0] // Default to first type
  let maxCount = 0

  for (const [type, count] of Object.entries(answerCounts)) {
    if (count > maxCount) {
      maxCount = count
      predominantType = type
    }
  }

  return predominantType
}

/**
 * Calculate percentage breakdown of result types
 * @param userAnswers - Array of answer IDs selected by the user
 * @param possibleTypes - Array of possible result types
 * @returns Object with percentages for each type
 */
export function calculateResultPercentages(
  userAnswers: string[],
  possibleTypes: string[] = ["A", "B", "C", "D"]
): Record<string, number> {
  // Initialize counts for each type
  const answerCounts: Record<string, number> = {}
  possibleTypes.forEach(type => {
    answerCounts[type] = 0
  })

  // Count occurrences of each answer type
  userAnswers.forEach(answer => {
    if (answer && answerCounts[answer] !== undefined) {
      answerCounts[answer]++
    }
  })

  // Calculate percentages
  const total = userAnswers.length
  const percentages: Record<string, number> = {}

  possibleTypes.forEach(type => {
    percentages[type] = Math.round((answerCounts[type] / total) * 100)
  })

  return percentages
}

/**
 * Create a new quiz template structure
 * @param quizTitle - The title of the quiz
 * @param resultTypes - Array of result type IDs
 * @returns A template quiz data structure
 */
export function createQuizTemplate(
  quizTitle: string,
  resultTypes: string[] = ["A", "B", "C", "D"]
): QuizDataType {
  const quizTemplate: QuizDataType = {
    questions: [
      {
        id: 1,
        text: "Sample Question 1",
        options: resultTypes.map(type => ({
          id: type,
          text: `Sample option for ${type}`,
          emoji: "❓",
        })),
      },
    ],
    results: {},
  }
  
  // Create sample results for each type
  resultTypes.forEach(type => {
    quizTemplate.results[type] = {
      title: `Result Type ${type}`,
      description: `This is a sample description for Result Type ${type}. Update this with real content.`,
      fixTools: [`Sample tool 1 for ${type}`, `Sample tool 2 for ${type}`, `Sample tool 3 for ${type}`],
    }
  })
  
  return quizTemplate
} 