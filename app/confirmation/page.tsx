"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Check, Download, Loader2 } from "lucide-react"
import Link from "next/link"
import { ACTIVE_QUIZ_TYPE, getResultTitle, getPdfFilePath, ROUTES } from "@/lib/config"

// Define a fallback component for Suspense
function ConfirmationLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Loader2 className="mb-4 h-10 w-10 animate-spin text-primary" />
      <h2 className="text-2xl font-semibold">Loading Confirmation...</h2>
    </div>
  )
}

// This component contains the logic that uses useSearchParams
function ConfirmationContent() {
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
    async function verifyPaymentAndGetDownload() {
      try {
        if (!sessionId) {
          // If no session ID, redirect immediately.
          router.push(ROUTES.HOME) 
          return
        }

        setLoading(true)
        
        // Fetch Stripe session details directly using the session ID
        const response = await fetch(`/api/stripe/session?session_id=${sessionId}`)
        
        if (!response.ok) {
          const errorData = await response.json()
          // Throw a user-friendly error based on Stripe's response
          throw new Error(errorData.error || "Failed to retrieve payment details. Please contact support.")
        }
          
        const stripeData = await response.json()
          
        // Check payment status directly from Stripe session data
        const paymentStatus = stripeData.payment_status
          
        if (paymentStatus !== 'paid' && paymentStatus !== 'no_payment_required') {
           // Handle cases where payment is not yet complete or failed
           if (paymentStatus === 'unpaid') {
             // Handle pending payments
             throw new Error("Payment is still processing. Please wait a few moments and refresh, or contact support if the issue persists.")
           } else {
             // Handle other unsuccessful statuses (e.g., canceled)
             throw new Error("Payment was not successful. Please contact support or try again.")
           }
        }
          
        // Get the result type from metadata (default if missing)
        const resultType = stripeData.metadata?.resultType || 'A' 
          
        // Generate the correct PDF file name based on the result type using config
        const pdfFileName = getPdfFilePath(ACTIVE_QUIZ_TYPE, resultType)
          
        // Set the download information directly
        setDownloadInfo({
          link: `/downloads/${pdfFileName}`, // Construct the download link
          resultType: resultType
        })
        
      } catch (error: any) {
        console.error("Error verifying payment:", error)
        setError(error.message || "An error occurred during payment verification")
      } finally {
        setLoading(false)
      }
    }
    
    // Only run verifyPayment if sessionId is present
    if (sessionId) {
      verifyPaymentAndGetDownload() // Renamed the function for clarity
    } else {
       console.log("No session ID found in URL parameters.")
       router.push(ROUTES.HOME) // Redirect if no session ID is present
    }

  }, [sessionId, router]) // Keep dependencies
  
  // Display loading state specific to data fetching
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Loader2 className="mb-4 h-10 w-10 animate-spin text-primary" />
        <h2 className="text-2xl font-semibold">Verifying your payment...</h2>
        <p className="mt-2 text-muted-foreground">This will only take a moment</p>
      </div>
    )
  }
  
  // Display error state
  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="max-w-md rounded-lg border bg-card p-8 shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold text-destructive">Payment Verification Failed</h2>
          <p className="mb-6 text-muted-foreground">{error}</p>
          <Button asChild>
            <Link href={ROUTES.HOME}>Return to Home</Link>
          </Button>
        </div>
      </div>
    )
  }
  
  // Display success state
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
              Your {downloadInfo.resultType && getResultTitle(ACTIVE_QUIZ_TYPE, downloadInfo.resultType)} Fix Guide is Ready
            </h2>
            
            <p className="mb-6 text-sm text-muted-foreground">
              Click the button below to download your personalized guide.
            </p>
            
            {/* Use the download link directly */}
            <Button asChild className="mb-4 w-full" size="lg">
              <a href={downloadInfo.link} download>
                <Download className="mr-2 h-4 w-4" /> Download Your Guide
              </a>
            </Button>
            
            <div className="mt-6 rounded-md bg-muted p-4 text-sm">
              <p className="font-medium">What's included in your guide:</p>
              {/* Keep the descriptive list */}
              <ul className="mt-2 list-inside list-disc space-y-1 pl-1 text-muted-foreground">
                <li>Step-by-step instructions based on your quiz results</li>
                <li>Tools and materials checklist</li>
                <li>Tips for preventing future issues</li>
                <li>Personalized recommendations</li>
              </ul>
            </div>
          </>
        )}
        
        <div className="mt-6 text-center">
          <Button variant="outline" asChild>
            <Link href={ROUTES.QUIZ}>Take the Quiz Again</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}


// Main Page component using Suspense
export default function ConfirmationPage() {
  return (
    <Suspense fallback={<ConfirmationLoading />}>
      <ConfirmationContent />
    </Suspense>
  )
} 