"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { quizData } from "@/lib/quiz-data"
import { ACTIVE_QUIZ_TYPE, getResultImagePath } from "@/lib/config"
import { calculateResultType, calculateResultPercentages } from "@/lib/utils/quiz-utils"
import confetti from "canvas-confetti"
import { ListChecks, Loader2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface ResultsScreenProps {
  userAnswers: string[]
}

export function ResultsScreen({ userAnswers }: ResultsScreenProps) {
  const [resultType, setResultType] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Calculate result using our utility function
    const predominantType = calculateResultType(userAnswers)
    setResultType(predominantType)

    // Trigger confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }, [userAnswers])

  const result = resultType ? quizData.results[resultType] : null

  // Calculate percentages using our utility function
  const percentages = calculateResultPercentages(userAnswers)

  const initiateStripeCheckout = async () => {
    try {
      setIsLoading(true)
      
      // Call our API route to create a Stripe checkout session
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resultType,
          answers: userAnswers,
        }),
      })
      
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      
      const { url } = await response.json()
      
      // Redirect to Stripe Checkout
      router.push(url)
    } catch (error) {
      console.error('Error initiating checkout:', error)
      alert('There was an error initiating the checkout process. Please try again.')
      setIsLoading(false)
    }
  }

  if (!result) return <div>Calculating your results...</div>

  // Get image path from config
  const imagePath = getResultImagePath(ACTIVE_QUIZ_TYPE, resultType)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
        className="mb-6 w-full max-w-sm mx-auto"
      >
        <Image
          src={imagePath}
          alt={`Image representing ${result.title}`}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
          priority
        />
      </motion.div>

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-2 text-3xl font-bold text-primary"
      >
        {result.title}
      </motion.h2>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-6 max-w-2xl text-lg leading-relaxed"
      >
        {result.description}
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mb-8 w-full max-w-md rounded-lg border bg-card p-6 text-left shadow-sm"
      >
        <h3 className="mb-4 flex items-center text-xl font-semibold">
          <ListChecks className="mr-2 h-5 w-5 text-primary" />
          Your Fix Toolkit
        </h3>
        <ul className="list-inside list-disc space-y-2 pl-2 text-muted-foreground">
          {result.fixTools.map((tool, index) => (
            <li key={index}>{tool}</li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-0"
      >
        <Button
          onClick={initiateStripeCheckout}
          disabled={isLoading}
          size="lg"
          className="bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-6 text-lg font-semibold text-white"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
            </>
          ) : (
            "Get Your Personalized Fix Guide ✨"
          )}
        </Button>
      </motion.div>
    </motion.div>
  )
}
