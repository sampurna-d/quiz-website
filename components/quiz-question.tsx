"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { QuestionType, OptionType } from "@/lib/types"

interface QuizQuestionProps {
  question: QuestionType
  questionNumber: number
  totalQuestions: number
  selectedAnswer: string | undefined
  onSelectAnswer: (optionId: string) => void
  onNext: () => void
  onPrevious: () => void
  isFirstQuestion: boolean
  isLastQuestion: boolean
}

export function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onNext,
  onPrevious,
  isFirstQuestion,
  isLastQuestion,
}: QuizQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(selectedAnswer)
  const [isNextEnabled, setIsNextEnabled] = useState(!!selectedAnswer)

  useEffect(() => {
    setSelectedOption(selectedAnswer)
    setIsNextEnabled(!!selectedAnswer)
  }, [selectedAnswer, question.id])

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId)
    setIsNextEnabled(true)
    onSelectAnswer(optionId)
  }

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col"
    >
      <h2 className="mb-6 text-xl font-medium md:text-2xl">
        <span className="mr-2 text-primary">{questionNumber}.</span>
        {question.text}
      </h2>

      <div className="mb-8 space-y-4">
        <AnimatePresence>
          {question.options.map((option: OptionType) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.01 }}
              className={cn(
                "flex cursor-pointer items-center rounded-lg border p-4 transition-all",
                selectedOption === option.id
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-primary/50 hover:bg-accent",
              )}
              onClick={() => handleOptionSelect(option.id)}
            >
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-muted text-2xl">
                {option.emoji}
              </div>
              <span className="text-lg">{option.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-auto flex justify-between">
        {!isFirstQuestion ? (
          <Button variant="outline" onClick={onPrevious}>
            Previous
          </Button>
        ) : (
          <div></div>
        )}

        <Button
          onClick={onNext}
          disabled={!isNextEnabled}
          className={cn("bg-gradient-to-r from-primary to-primary/80", isNextEnabled && "animate-pulse")}
        >
          {isLastQuestion ? "Submit" : "Next"}
        </Button>
      </div>
    </motion.div>
  )
}
