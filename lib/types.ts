export interface OptionType {
  id: string
  text: string
  emoji: string
}

export interface QuestionType {
  id: number
  text: string
  options: OptionType[]
}

export interface ResultType {
  title: string
  description: string
  fixTools: string[]
}

export interface QuizDataType {
  questions: QuestionType[]
  results: {
    [key: string]: ResultType
  }
}
