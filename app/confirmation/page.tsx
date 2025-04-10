"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Check, Download, Loader2 } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { checkTablesExist, createPurchaseRecord, createDownloadRecord } from "@/lib/db-utils"

// Map Stripe payment status to Supabase allowed values
function mapPaymentStatus(stripeStatus: string): string {
  // Map Stripe payment status to values accepted by Supabase
  const statusMap: Record<string, string> = {
    'paid': 'succeeded',
    'unpaid': 'pending',
    'no_payment_required': 'succeeded',
    'free': 'succeeded',
    'canceled': 'failed'
  };
  
  return statusMap[stripeStatus] || 'pending';
}

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get("session_id")
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [downloadInfo, setDownloadInfo] = useState<{
    link: string
    resultType: string
  } | null>(null)

  useEffect(() => {
    async function verifyPayment() {
      try {
        if (!sessionId) {
          router.push("/")
          return
        }

        setLoading(true)
        
        // Check if the required tables exist
        const tables = await checkTablesExist()
        console.log("Tables exist check:", tables)
        
        if (!tables.allExist) {
          console.log("Required database tables don't exist, redirecting to setup")
          // Redirect to setup page or show error
          window.open("/api/setup-db", "_blank")
          throw new Error("Database tables not set up. Please contact support.")
        }
        
        // First, try to fetch payment details from the API
        const response = await fetch(`/api/downloads/verify?session_id=${sessionId}`)
        
        // If the verification endpoint succeeds, use its response
        if (response.ok) {
          const data = await response.json()
          setDownloadInfo({
            link: data.downloadLink,
            resultType: data.resultType
          })
          return
        }
        
        // If the verification fails, try to create the purchase and download records directly
        // This is a fallback for when webhooks haven't processed the payment yet
        console.log("API verification failed, creating purchase record directly")
        
        // First fetch session data from the Stripe checkout API
        const stripeResponse = await fetch(`/api/stripe/session?session_id=${sessionId}`)
        
        if (!stripeResponse.ok) {
          const errorData = await stripeResponse.json()
          throw new Error(errorData.error || "Payment verification failed. Please contact support.")
        }
        
        const stripeData = await stripeResponse.json()
        
        if (stripeData.payment_status !== 'paid') {
          throw new Error("Payment is not complete. Please wait or contact support.")
        }
        
        const resultType = stripeData.metadata?.resultType || 'A'
        
        // Create purchase record in Supabase using utility function
        const purchase = await createPurchaseRecord(
          sessionId,
          resultType,
          stripeData.amount_total
        )
        
        // Generate download link
        const pdfFileName = getPdfFileNameByResultType(resultType)
        
        // Create download record using utility function
        await createDownloadRecord(purchase.id, pdfFileName)
        
        setDownloadInfo({
          link: `/downloads/${pdfFileName}`,
          resultType: resultType
        })
        
      } catch (error: any) {
        console.error("Error verifying payment:", error)
        setError(error.message || "An error occurred during payment verification")
      } finally {
        setLoading(false)
      }
    }
    
    verifyPayment()
  }, [sessionId, router])
  
  const getResultTitle = (resultType: string) => {
    const titles: Record<string, string> = {
      "A": "Doom Scroller",
      "B": "Overthinker",
      "C": "Multitask Monster",
      "D": "Chaos Starter"
    }
    return titles[resultType] || "Personalized"
  }
  
  function getPdfFileNameByResultType(resultType: string): string {
    const fileNames: Record<string, string> = {
      'A': 'doom-scroller-fix-guide.pdf',
      'B': 'overthinker-fix-guide.pdf',
      'C': 'multitask-monster-fix-guide.pdf',
      'D': 'chaos-starter-fix-guide.pdf',
    }
    return fileNames[resultType] || 'fix-broken-window-guide.pdf'
  }
  
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Loader2 className="mb-4 h-10 w-10 animate-spin text-primary" />
        <h2 className="text-2xl font-semibold">Verifying your payment...</h2>
        <p className="mt-2 text-muted-foreground">This will only take a moment</p>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="max-w-md rounded-lg border bg-card p-8 shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold text-destructive">Payment Verification Failed</h2>
          <p className="mb-6 text-muted-foreground">{error}</p>
          <Button asChild>
            <Link href="/">Return to Quiz</Link>
          </Button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="max-w-md rounded-lg border bg-card p-8 shadow-lg">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/20">
            <Check className="h-8 w-8" />
          </div>
        </div>
        
        <h1 className="mb-2 text-center text-3xl font-bold">Thank You!</h1>
        <p className="mb-6 text-center text-muted-foreground">
          Your payment has been processed successfully.
        </p>
        
        {downloadInfo && (
          <>
            <h2 className="mb-4 text-xl font-semibold">
              Your {getResultTitle(downloadInfo.resultType)} Fix Guide is Ready
            </h2>
            
            <p className="mb-6 text-sm text-muted-foreground">
              Click the button below to download your personalized guide on fixing your broken window.
            </p>
            
            <Button asChild className="mb-4 w-full" size="lg">
              <a href={downloadInfo.link} download>
                <Download className="mr-2 h-4 w-4" /> Download Your Guide
              </a>
            </Button>
            
            <div className="mt-6 rounded-md bg-muted p-4 text-sm">
              <p className="font-medium">What's included in your guide:</p>
              <ul className="mt-2 list-inside list-disc space-y-1 pl-1 text-muted-foreground">
                <li>Step-by-step instructions for fixing your broken window</li>
                <li>Tools and materials checklist</li>
                <li>Tips for preventing future window damage</li>
                <li>Personalized recommendations based on your quiz results</li>
              </ul>
            </div>
          </>
        )}
        
        <div className="mt-6 text-center">
          <Button variant="outline" asChild>
            <Link href="/">Take the Quiz Again</Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 