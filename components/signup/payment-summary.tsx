"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ArrowLeft, Lock, AlertCircle, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SignupFormData } from "@/app/signup/page"

type PaymentSummaryProps = {
  formData: SignupFormData
  onPay: () => void
  onBack: () => void
  error: string | null
  signupData: any
}

export default function PaymentSummary({ formData, onPay, onBack, error, signupData }: PaymentSummaryProps) {
  const { payment, steps, header } = signupData

  return (
    <Card className="bg-card border-border shadow-xl">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold text-foreground">{header.title}</CardTitle>

        {/* Progress Bar */}
        <div className="flex items-center justify-center gap-2 pt-6">
          {steps.map((step: any, index: number) => (
            <div key={step.id} className="flex items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  index <= 1 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground",
                )}
              >
                {index === 0 ? <Check className="w-4 h-4" /> : step.id}
              </div>
              <span
                className={cn(
                  "text-sm hidden sm:block",
                  index === 1 ? "text-foreground font-medium" : "text-muted-foreground",
                )}
              >
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <div className={cn("w-8 h-0.5 mx-2", index === 0 ? "bg-primary" : "bg-border")} />
              )}
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        {/* User Info Summary */}
        <div className="bg-secondary/30 rounded-lg p-4 space-y-2">
          <p className="text-sm text-muted-foreground">Registering as</p>
          <p className="font-semibold text-foreground">{formData.fullName}</p>
          <p className="text-sm text-muted-foreground">{formData.email}</p>
          <p className="text-sm text-muted-foreground">{formData.institution}</p>
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">{payment.summaryTitle}</h3>

          <div className="bg-secondary/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium text-foreground">{payment.item}</span>
              <span className="text-xl font-bold text-primary">{payment.amount}</span>
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-sm text-muted-foreground mb-3">Includes:</p>
              <ul className="space-y-2">
                {payment.benefits.map((benefit: string, index: number) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={onPay}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
            size="lg"
          >
            <Lock className="w-4 h-4" />
            {error ? signupData.errors.retryButton : payment.payButton}
          </Button>

          <Button onClick={onBack} variant="ghost" className="w-full text-muted-foreground hover:text-foreground gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Account Details
          </Button>
        </div>

        {/* Security Note */}
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Shield className="w-4 h-4" />
          <span>{payment.secureNote}</span>
        </div>
      </CardContent>
    </Card>
  )
}
