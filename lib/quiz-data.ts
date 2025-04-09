import type { QuizDataType } from "./types"

// Updated quiz data based on the "Broken Window Archetypes" concept.
export const quizData: QuizDataType = {
  questions: [
    // Question 1
    {
      id: 1,
      text: "It's 9:00 AM. What's the first thing you do?",
      options: [
        { id: "A", text: "Open TikTok or Insta (👀 just for \"5 minutes\")", emoji: "📱" },
        { id: "B", text: "Review your ultra-optimized Notion page", emoji: "📊" },
        { id: "C", text: "Check email, Slack, and texts all at once", emoji: "📧" },
        { id: "D", text: "Look around your messy room and sigh", emoji: "💨" },
      ],
    },
    // Question 2
    
    {
      id: 2,
      text: "You have a big task to do. What usually derails you first?",
      options: [
        { id: "A", text: "\"Accidentally\" watching memes for 45 mins", emoji: "😂" },
        { id: "B", text: "You re-plan your plan instead of starting", emoji: "🤔" },
        { id: "C", text: "You try doing 3 things at once and get nothing done", emoji: "🤯" },
        { id: "D", text: "The chaos around you gives you chaos brain", emoji: "😵" },
      ],
    },
    // Question 3
    {
      id: 3,
      text: "What's your to-do list style?",
      options: [
        { id: "A", text: "There is no list, just vibes", emoji: "🤷" },
        { id: "B", text: "Color-coded. Prioritized. Overwhelming", emoji: "🌈" },
        { id: "C", text: "Sticky notes everywhere", emoji: "📌" },
        { id: "D", text: "To-do list is buried under a pile of laundry", emoji: "🧺" },
      ],
    },
    // Question 4
    {
      id: 4,
      text: "Your phone usage today:",
      options: [
        { id: "A", text: "6+ hours, mostly social apps", emoji: "📈" },
        { id: "B", text: "A mix of Google Calendar, YouTube, and Notion", emoji: "🗓️" },
        { id: "C", text: "Messaging 3 convos while listening to a podcast", emoji: "🎧" },
        { id: "D", text: "You lost it somewhere under your bed, maybe?", emoji: "❓" },
      ],
    },
    // Question 5
    {
      id: 5,
      text: "Your room/workspace usually looks like:",
      options: [
        { id: "A", text: "Bright, cozy… and covered in snack wrappers", emoji: "🛋️" },
        { id: "B", text: "A productivity influencer's dream", emoji: "✨" },
        { id: "C", text: "Laptop, tablet, phone, wires, 8 tabs open", emoji: "💻" },
        { id: "D", text: "A war zone of random stuff and existential dread", emoji: "🏚️" },
      ],
    },
    // Question 6
    {
      id: 6,
      text: "Pick a motto:",
      options: [
        { id: "A", text: "\"Just one more scroll…\"", emoji: "👇" },
        { id: "B", text: "\"Failing to plan is planning to fail.\"", emoji: "📜" },
        { id: "C", text: "\"I can totally do this while doing three other things.\"", emoji: "🤸" },
        { id: "D", text: "\"I'll clean it later, probably.\"", emoji: "🧹" },
      ],
    },
    // Question 7
    {
      id: 7,
      text: "End of the day feels like:",
      options: [
        { id: "A", text: "\"Where did my time go?\"", emoji: "⏳" },
        { id: "B", text: "\"I didn't do anything on my list 😩\"", emoji: "😫" },
        { id: "C", text: "\"I worked all day but accomplished nothing.\"", emoji: "🔋" },
        { id: "D", text: "\"I can't think in this mess.\"", emoji: "🤯" },
      ],
    },
    // Question 8
    {
      id: 8,
      text: "If your brain was a desktop...",
      options: [
        { id: "A", text: "You'd have 46 open tabs, mostly YouTube", emoji: "🌐" },
        { id: "B", text: "A perfectly labeled folder system (but still overwhelmed)", emoji: "📁" },
        { id: "C", text: "Tabs + notifications + downloads = chaos", emoji: "💥" },
        { id: "D", text: "The Recycle Bin is overflowing and you don't even care", emoji: "🗑️" },
      ],
    },
  ],
  // Results defining the 4 Broken Window Archetypes
  results: {
    A: {
      title: "The Doom Scroller",
      description:
        "Your broken window: Escaping into endless scrolls. You lose hours to social media that was only supposed to be a \"quick break.\" You confuse dopamine hits with rest.",
      fixTools: ["App limits", "Scheduled scroll breaks", "Phone-free AM routine"],
    },
    B: {
      title: "The Overthinker",
      description:
        "Your broken window: Planning paralysis. You love organizing your day… but never start it. You've built 4 Notion dashboards and completed 0 tasks.",
      fixTools: [
        "Set time limits on planning",
        "Start with 1 \"non-negotiable\" task",
        "\"Done is better than perfect\" mantra",
      ],
    },
    C: {
      title: "The Multitask Monster",
      description:
        "Your broken window: Context switching. You're always doing 3 things at once and finishing none. Constant task-switching fries your focus.",
      fixTools: [
        "Pomodoro timer",
        "Single-task sprints",
        "\"No switching mid-task\" rule",
      ],
    },
    D: {
      title: "The Chaos Starter",
      description:
        "Your broken window: Environmental entropy. Your physical mess creates mental mess. You think best in clean spaces but rarely start clean.",
      fixTools: [
        "5-minute reset routine",
        "Declutter cue before work",
        "\"Clean start\" checklist",
      ],
    },
  },
}
