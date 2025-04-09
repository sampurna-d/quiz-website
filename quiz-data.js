// Quiz data structure
const quizData = {
    questions: [
        {
            id: 1,
            text: "How do you typically react when faced with a challenge?",
            options: [
                { id: "A", text: "Analyze all possible solutions before acting", emoji: "🔍" },
                { id: "B", text: "Trust your instincts and act quickly", emoji: "⚡" },
                { id: "C", text: "Seek advice from others before deciding", emoji: "👥" },
                { id: "D", text: "Carefully plan each step before proceeding", emoji: "📝" }
            ]
        },
        {
            id: 2,
            text: "In a group setting, you are most likely to:",
            options: [
                { id: "A", text: "Observe and analyze group dynamics", emoji: "👁️" },
                { id: "B", text: "Take charge and lead the conversation", emoji: "🚀" },
                { id: "C", text: "Focus on making everyone feel included", emoji: "🤗" },
                { id: "D", text: "Ensure the group stays on task and follows procedures", emoji: "📊" }
            ]
        },
        {
            id: 3,
            text: "When learning something new, you prefer to:",
            options: [
                { id: "A", text: "Understand the theory and concepts behind it", emoji: "🧠" },
                { id: "B", text: "Jump in and learn through trial and error", emoji: "🏊" },
                { id: "C", text: "Learn alongside others in a collaborative environment", emoji: "👨‍👩‍👧‍👦" },
                { id: "D", text: "Follow a structured, step-by-step approach", emoji: "🪜" }
            ]
        },
        {
            id: 4,
            text: "Your ideal weekend would involve:",
            options: [
                { id: "A", text: "Reading a thought-provoking book or researching a topic of interest", emoji: "📚" },
                { id: "B", text: "Spontaneous adventure or trying something new", emoji: "🏄" },
                { id: "C", text: "Spending quality time with friends or family", emoji: "🍻" },
                { id: "D", text: "Completing planned tasks and organizing for the week ahead", emoji: "✅" }
            ]
        },
        {
            id: 5,
            text: "When making an important decision, you primarily consider:",
            options: [
                { id: "A", text: "Logical analysis of all available facts", emoji: "⚖️" },
                { id: "B", text: "What feels right based on your experience", emoji: "💫" },
                { id: "C", text: "How it will affect the people involved", emoji: "❤️" },
                { id: "D", text: "The most practical and reliable option", emoji: "🛡️" }
            ]
        },
        {
            id: 6,
            text: "In a disagreement, you are most likely to:",
            options: [
                { id: "A", text: "Analyze both sides of the argument objectively", emoji: "🔬" },
                { id: "B", text: "Passionately defend your position", emoji: "🔥" },
                { id: "C", text: "Try to find a compromise that satisfies everyone", emoji: "🤝" },
                { id: "D", text: "Refer to established rules or procedures", emoji: "📜" }
            ]
        },
        {
            id: 7,
            text: "Your workspace is typically:",
            options: [
                { id: "A", text: "Filled with books, notes, and ongoing projects", emoji: "📖" },
                { id: "B", text: "Somewhat chaotic but you know where everything is", emoji: "🌪️" },
                { id: "C", text: "Decorated with personal touches and mementos", emoji: "🖼️" },
                { id: "D", text: "Neat, organized, and everything has its place", emoji: "🧹" }
            ]
        },
        {
            id: 8,
            text: "When facing a setback, you usually:",
            options: [
                { id: "A", text: "Analyze what went wrong to avoid similar issues in the future", emoji: "🔎" },
                { id: "B", text: "Quickly adapt and find a new approach", emoji: "🦎" },
                { id: "C", text: "Seek support from others to help you through it", emoji: "🤲" },
                { id: "D", text: "Create a detailed plan to overcome the obstacle", emoji: "🗺️" }
            ]
        }
    ],
    results: {
        "A": {
            title: "The Analytical Thinker",
            description: "You approach life with a logical and analytical mindset. You value knowledge, enjoy solving complex problems, and make decisions based on careful analysis of facts and data. Your methodical approach helps you see connections others might miss, though you may sometimes overthink situations."
        },
        "B": {
            title: "The Dynamic Adventurer",
            description: "You're spontaneous, adaptable, and thrive on new experiences. You trust your instincts and aren't afraid to take risks. Your ability to think on your feet and embrace change makes you excellent in crisis situations, though you may sometimes act without fully considering consequences."
        },
        "C": {
            title: "The Compassionate Connector",
            description: "You prioritize relationships and emotional connections. Empathetic and supportive, you're attuned to others' needs and excel at creating harmony. Your people-centered approach makes you a valued friend and team member, though you may sometimes neglect your own needs while caring for others."
        },
        "D": {
            title: "The Structured Planner",
            description: "You value order, reliability, and clear procedures. Detail-oriented and organized, you excel at creating and following plans. Your practical approach and attention to detail ensure things run smoothly, though you may sometimes resist unexpected changes or unconventional ideas."
        }
    }
};
