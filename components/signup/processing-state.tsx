"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Check, FileText, Mail, Rocket, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type ProcessingStateProps = {
  signupData: any
}

const iconMap: { [key: string]: React.ElementType } = {
  check: Check,
  file: FileText,
  mail: Mail,
  rocket: Rocket,
}

export default function ProcessingState({ signupData }: ProcessingStateProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const { processing } = signupData

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < processing.steps.length - 1) {
          return prev + 1
        }
        return prev
      })
    }, 1200)

    return () => clearInterval(interval)
  }, [processing.steps.length])

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="bg-card border-border shadow-2xl max-w-md w-full mx-4">
        <CardContent className="pt-8 pb-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Setting up your account...</h2>
            <p className="text-sm text-muted-foreground mt-2">This will only take a moment</p>
          </div>

          <div className="space-y-4">
            {processing.steps.map((step: any, index: number) => {
              const IconComponent = iconMap[step.icon] || Check
              const isCompleted = index < currentStep
              const isCurrent = index === currentStep

              return (
                <div
                  key={step.id}
                  className={cn(
                    "flex items-center gap-4 p-3 rounded-lg transition-all duration-500",
                    isCompleted && "bg-primary/10",
                    isCurrent && "bg-secondary",
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
                      isCompleted
                        ? "bg-primary text-primary-foreground"
                        : isCurrent
                          ? "bg-primary/20 text-primary"
                          : "bg-secondary text-muted-foreground",
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : isCurrent ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <IconComponent className="w-5 h-5" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors duration-500",
                      isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {step.text}
                    {isCompleted && "..."}
                    {isCurrent && "..."}
                  </span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
