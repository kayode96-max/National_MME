"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import AccountForm from "@/components/signup/account-form"
import PaymentSummary from "@/components/signup/payment-summary"
import ProcessingState from "@/components/signup/processing-state"
import SuccessState from "@/components/signup/success-state"

export type SignupFormData = {
  fullName: string
  email: string
  institution: string
  password: string
  confirmPassword: string
}

export type SignupStep = "account" | "payment" | "processing" | "success"

export default function SignupPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<SignupStep>("account")
  const [landingData, setLandingData] = useState<any>(null)
  const [formData, setFormData] = useState<SignupFormData>({
    fullName: "",
    email: "",
    institution: "",
    password: "",
    confirmPassword: "",
  })
  const [paymentError, setPaymentError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/landing')
      .then(res => res.json())
      .then(data => setLandingData(data))
      .catch(err => console.error('Error loading data:', err))
  }, [])

  if (!landingData) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  const { signup, site } = landingData

  const handleAccountSubmit = (data: SignupFormData) => {
    setFormData(data)
    setCurrentStep("payment")
  }

  const handlePayment = async () => {
    setPaymentError(null)
    setCurrentStep("processing")

    // Simulate payment and processing
    // In production, this would integrate with Paystack/Flutterwave
    await new Promise((resolve) => setTimeout(resolve, 5000))

    // Simulate success (in production, handle failures appropriately)
    setCurrentStep("success")
  }

  const handlePaymentError = () => {
    setPaymentError(signup.errors.paymentFailed)
    setCurrentStep("payment")
  }

  const handleGoToDashboard = () => {
    router.push("/dashboard")
  }

  const handleBackToAccount = () => {
    setCurrentStep("account")
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <img src={site.logo} alt={`${site.name} logo`} className="w-8 h-8" />
            </div>
            <span className="font-bold text-lg text-foreground">{site.name}</span>
          </div>
        </div>

        {/* Step Content */}
        {currentStep === "account" && (
          <AccountForm initialData={formData} onSubmit={handleAccountSubmit} signupData={signup} />
        )}

        {currentStep === "payment" && (
          <PaymentSummary
            formData={formData}
            onPay={handlePayment}
            onBack={handleBackToAccount}
            error={paymentError}
            signupData={signup}
          />
        )}

        {currentStep === "processing" && <ProcessingState signupData={signup} />}

        {currentStep === "success" && (
          <SuccessState formData={formData} onGoToDashboard={handleGoToDashboard} signupData={signup} />
        )}

        {(currentStep === "account" || currentStep === "payment") && (
          <div className="text-center mt-6">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
