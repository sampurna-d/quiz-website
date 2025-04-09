"use client"

import { useState } from "react"
import { StartScreen } from "@/components/start-screen"
import { QuizQuestion } from "@/components/quiz-question"
import { ResultsScreen } from "@/components/results-screen"
import { ProgressBar } from "@/components/progress-bar"
import { quizData } from "@/lib/quiz-data"
import { ThemeToggle } from "@/components/theme-toggle"

export function QuizContainer() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1) // -1 means start screen
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)

  const startQuiz = () => {
    setCurrentQuestionIndex(0)
  }

  const handleAnswer = (optionId: string) => {
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestionIndex] = optionId
    setUserAnswers(newAnswers)
  }

  const goToNextQuestion = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowResults(true)
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const calculateProgress = () => {
    if (currentQuestionIndex === -1) return 0
    return ((currentQuestionIndex + 1) / quizData.questions.length) * 100
  }

  return (
    <div className="flex flex-col">
      <header className="relative mb-8 text-center">
        <h1 className="text-4xl font-bold text-primary">Personality Quiz</h1>
        <p className="mt-2 text-muted-foreground">Discover your broken window type</p>
        <ThemeToggle className="absolute right-0 top-0" />
        <div className="mt-6">
          <ProgressBar progress={calculateProgress()} />
        </div>
      </header>

      <div className="min-h-[500px] rounded-lg border bg-card p-6 shadow-lg">
        {currentQuestionIndex === -1 && !showResults && <StartScreen onStart={startQuiz} />}

        {currentQuestionIndex >= 0 && !showResults && (
          <QuizQuestion
            question={quizData.questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={quizData.questions.length}
            selectedAnswer={userAnswers[currentQuestionIndex]}
            onSelectAnswer={handleAnswer}
            onNext={goToNextQuestion}
            onPrevious={goToPreviousQuestion}
            isFirstQuestion={currentQuestionIndex === 0}
            isLastQuestion={currentQuestionIndex === quizData.questions.length - 1}
          />
        )}

        {showResults && <ResultsScreen userAnswers={userAnswers} />}
      </div>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Personality Quiz</p>
      </footer>
    </div>
  )
}
