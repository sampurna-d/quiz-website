export default function PrivacyPolicy() {
  return (
    <div className="relative z-10 prose dark:prose-invert mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold text-primary mb-6">Privacy Policy</h1>
      <p className="font-medium text-muted-foreground mb-8"><strong>Effective Date: 4/11/2025</strong></p>
      <p className="mb-6">We care about your privacy, and we're not out here trying to be data goblins.</p>
      
      <h3 className="text-xl font-semibold mb-4">1. What We Collect</h3>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Info you give us when you take the quiz (email, quiz answers)</li>
        <li>Purchase info if you buy a guide (through Stripe, etc.)</li>
        <li>Basic analytics (views, clicks, etc.)</li>
      </ul>

      <h3 className="text-xl font-semibold mb-4">2. How We Use It</h3>
      <p className="mb-2">We use your info to:</p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Send you your quiz results and guide</li>
        <li>Improve the quiz and videos</li>
        <li>Occasionally email you something useful (if you opt in)</li>
      </ul>

      <h3 className="text-xl font-semibold mb-4">3. What We Don't Do</h3>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>We don't sell your data</li>
        <li>We don't spam</li>
        <li>We don't track you across the web like a creep</li>
      </ul>

      <h3 className="text-xl font-semibold mb-4">4. Third-Party Tools</h3>
      <p className="mb-2">We may use tools like:</p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Google Analytics (for traffic)</li>
        <li>Email providers (for quiz results + updates)</li>
        <li>Payment processors (like Stripe/Gumroad)</li>
      </ul>
      <p className="mb-6">They have their own privacy policies—check those too if you're curious.</p>

      <h3 className="text-xl font-semibold mb-4">5. Your Rights</h3>
      <p className="mb-6">You can request your data, ask us to delete it, or opt out of any marketing emails. Just email us at <a href="mailto:business.uahd@gmail.com" className="text-primary hover:underline">business.uahd@gmail.com</a></p>
    </div>
  )
} 