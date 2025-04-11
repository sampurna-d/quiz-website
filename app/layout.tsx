import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"
import { Navbar } from "@/components/navbar"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Chobify | Smart Quizzes. Smarter Minds.",
  description: "Take our personality quiz to discover your broken window and learn how to fix it.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          <div className="min-h-screen bg-gradient-to-br from-background via-background to-background bg-fixed">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(93,140,214,0.1),transparent_60%),radial-gradient(circle_at_bottom_left,rgba(255,107,107,0.1),transparent_60%)]"></div>
            <div className="container relative z-10 mx-auto max-w-4xl px-4 py-8">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'