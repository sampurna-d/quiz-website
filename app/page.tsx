import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <main className="relative z-10">
      <div className="my-8 flex flex-col space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-primary">CHOBIFY</h1>
          <p className="mt-2 text-xl italic text-muted-foreground">Smart Quizzes. Smarter Minds.</p>
          <div className="mx-auto mt-6 max-w-2xl">
            <blockquote className="border-l-4 border-primary/50 pl-4 italic text-muted-foreground">
              Welcome to Chobify, where quizzes aren't just fun—they're personality-deep, mind-bending, and scarily accurate. We blend humor, psychology, and AI to deliver quizzes that get you.
            </blockquote>
          </div>
        </div>

        <div>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <span className="mr-2">💡</span> How It Works
          </h2>
          <ol className="ml-8 list-decimal space-y-2">
            <li>Pick a quiz (love life? existential dread? productivity types?)</li>
            <li>Answer a few spicy questions</li>
            <li>Get instant results, insights, and probably a minor identity crisis 💅</li>
          </ol>
        </div>

        <div>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <span className="mr-2">💸</span> Pricing
          </h2>
          <ul className="ml-8 list-disc">
            <li className="mb-2"><strong>Basic</strong> – Free forever*</li>
          </ul>
          <p>Unlock exclusive quizzes + deep dive analysis powered by AI.</p>
        </div>

        <div>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <span className="mr-2">🛡️</span> Secure Payments with Stripe
          </h2>
          <p>All payments are securely handled via Stripe. We don't store your card info, ever. Pinky promise.</p>
        </div>

        <div>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <span className="mr-2">📬</span> Contact Us
          </h2>
          <p>Have a question?</p>
          <p>Email us: <a href="mailto:business.uahd@gmail.com" className="text-primary hover:underline">business.uahd@gmail.com</a></p>
        </div>

        <div className="mx-auto mt-4">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/quiz">Take the Quiz Now</Link>
          </Button>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          <p>*Payment may be needed if you need a personalized guide.</p>
        </div>
      </div>
    </main>
  )
}
