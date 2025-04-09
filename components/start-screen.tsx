"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface StartScreenProps {
  onStart: () => void
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="mb-6 text-3xl font-bold text-primary">Welcome to the Personality Quiz!</h2>

      <div className="mb-8 max-w-xl">
        <p className="mb-4 text-lg">Discover your "broken window" type and learn how to fix it.</p>
        <p className="text-muted-foreground">
          Answer 8 questions to reveal insights about your personality and receive personalized recommendations.
        </p>
      </div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          size="lg"
          onClick={onStart}
          className="bg-gradient-to-r from-primary to-primary/80 px-8 py-6 text-lg font-semibold"
        >
          Start Quiz
        </Button>
      </motion.div>
    </motion.div>
  )
}
