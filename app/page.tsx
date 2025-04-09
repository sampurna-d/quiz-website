import { QuizContainer } from "@/components/quiz-container"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background bg-fixed">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(93,140,214,0.1),transparent_60%),radial-gradient(circle_at_bottom_left,rgba(255,107,107,0.1),transparent_60%)]"></div>
      <div className="container relative z-10 mx-auto max-w-4xl px-4 py-8">
        <QuizContainer />
      </div>
    </main>
  )
}
