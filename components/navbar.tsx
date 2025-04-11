"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { APP_NAME, LOGO, ROUTES } from "@/lib/config"

export function Navbar() {
  const pathname = usePathname()
  const isHomePage = pathname === ROUTES.HOME
  const isMainPage = pathname === ROUTES.QUIZ

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href={ROUTES.HOME} className="mr-6 flex items-center space-x-2">
            <div className="relative h-8 w-8">
              <Image 
                src={LOGO.FULL} 
                alt={APP_NAME} 
                fill 
                className="object-contain" 
                priority
              />
            </div>
            <span className="hidden font-bold sm:inline-block">
              {APP_NAME}
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {!isHomePage && !isMainPage && (
            <Button variant="ghost" size="sm" asChild>
              <Link href={ROUTES.QUIZ}>Take Quiz</Link>
            </Button>
          )}
          {isMainPage && (
            <Button variant="ghost" size="sm" asChild>
              <Link href={ROUTES.HOME}>About</Link>
            </Button>
          )}
          <Button variant="ghost" size="sm" asChild>
            <Link href={ROUTES.PRIVACY}>Privacy</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href={ROUTES.TERMS}>Terms</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
} 