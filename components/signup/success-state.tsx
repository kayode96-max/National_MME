"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Mail, Download } from "lucide-react"
import type { SignupFormData } from "@/app/signup/page"
import Confetti from "@/components/signup/confetti"

type SuccessStateProps = {
  formData: SignupFormData
  onGoToDashboard: () => void
  signupData: any
}

export default function SuccessState({ formData, onGoToDashboard, signupData }: SuccessStateProps) {
  const { success } = signupData

  return (
    <>
      <Confetti />
      <Card className="bg-card border-border shadow-xl">
        <CardContent className="pt-8 pb-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-foreground mb-2">{success.title}</h2>
          <p className="text-muted-foreground mb-6">{success.message}</p>

          {/* User Info */}
          <div className="bg-secondary/30 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-muted-foreground mb-1">Registered as</p>
            <p className="font-semibold text-foreground">{formData.fullName}</p>
            <p className="text-sm text-muted-foreground">{formData.institution}</p>
          </div>

          {/* Email Notice */}
          <div className="flex items-center gap-3 bg-primary/10 rounded-lg p-4 mb-6 text-left">
            <Mail className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">Check your email</p>
              <p className="text-xs text-muted-foreground">Your certificate has been sent to {formData.email}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={onGoToDashboard}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              size="lg"
            >
              {success.dashboardButton}
              <ArrowRight className="w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              className="w-full border-border text-foreground hover:bg-secondary gap-2 bg-transparent"
            >
              <Download className="w-4 h-4" />
              Download Certificate
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
