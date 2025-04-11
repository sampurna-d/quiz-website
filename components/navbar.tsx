"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const isMainPage = pathname === "/quiz"

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Button variant="ghost" size="icon" aria-label="Home">
              <Home className="h-5 w-5" />
            </Button>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {!isHomePage && !isMainPage && (
            <Button variant="ghost" size="sm" asChild>
              <Link href="/quiz">Take Quiz</Link>
            </Button>
          )}
          {isMainPage && (
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">About</Link>
            </Button>
          )}
          <Button variant="ghost" size="sm" asChild>
            <Link href="/privacy">Privacy</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/terms">Terms</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
} 