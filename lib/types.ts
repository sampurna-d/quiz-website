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

// Stripe integration types
export interface CheckoutRequest {
  resultType: string
  answers: string[]
}

export interface CheckoutResponse {
  id: string
  url: string
}

// Supabase database types
export interface QuizResult {
  id: string
  user_id?: string
  result_type: string
  answers: string[]
  created_at: string
}

export interface Purchase {
  id: string
  user_id?: string
  result_type: string
  stripe_session_id: string
  payment_status: string
  amount: number
  created_at: string
  updated_at: string
}

export interface Download {
  id: string
  purchase_id: string
  download_link: string
  download_count: number
  expires_at: string
  created_at: string
}
