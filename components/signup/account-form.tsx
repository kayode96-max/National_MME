"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import type { SignupFormData } from "@/app/signup/page"

type AccountFormProps = {
  initialData: SignupFormData
  onSubmit: (data: SignupFormData) => void
  signupData: any
}

export default function AccountForm({ initialData, onSubmit, signupData }: AccountFormProps) {
  const [formData, setFormData] = useState<SignupFormData>(initialData)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [institutionOpen, setInstitutionOpen] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof SignupFormData, string>>>({})

  const { form, institutions, header, steps } = signupData

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SignupFormData, string>> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.institution) {
      newErrors.institution = "Please select your institution"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleInputChange = (field: keyof SignupFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <Card className="bg-card border-border shadow-xl">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold text-foreground">{header.title}</CardTitle>
        <CardDescription className="text-muted-foreground">{header.subtitle}</CardDescription>

        {/* Progress Bar */}
        <div className="flex items-center justify-center gap-2 pt-6">
          {steps.map((step: any, index: number) => (
            <div key={step.id} className="flex items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  index === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground",
                )}
              >
                {step.id}
              </div>
              <span
                className={cn(
                  "text-sm hidden sm:block",
                  index === 0 ? "text-foreground font-medium" : "text-muted-foreground",
                )}
              >
                {step.label}
              </span>
              {index < steps.length - 1 && <div className="w-8 h-0.5 bg-border mx-2" />}
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-foreground">
              {form.fullName.label}
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder={form.fullName.placeholder}
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className={cn(
                "bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground",
                errors.fullName && "border-destructive",
              )}
            />
            <p className="text-xs text-muted-foreground">{form.fullName.hint}</p>
            {errors.fullName && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              {form.email.label}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={form.email.placeholder}
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={cn(
                "bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground",
                errors.email && "border-destructive",
              )}
            />
            <p className="text-xs text-muted-foreground">{form.email.hint}</p>
            {errors.email && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Institution */}
          <div className="space-y-2">
            <Label className="text-foreground">{form.institution.label}</Label>
            <Popover open={institutionOpen} onOpenChange={setInstitutionOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={institutionOpen}
                  className={cn(
                    "w-full justify-between bg-secondary/50 border-border text-foreground hover:bg-secondary",
                    !formData.institution && "text-muted-foreground",
                    errors.institution && "border-destructive",
                  )}
                >
                  {formData.institution || form.institution.placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0 bg-card border-border" align="start">
                <Command className="bg-transparent">
                  <CommandInput placeholder="Search institution..." className="text-foreground" />
                  <CommandList>
                    <CommandEmpty className="text-muted-foreground py-6 text-center text-sm">
                      No institution found.
                    </CommandEmpty>
                    <CommandGroup>
                      {institutions.map((institution: string) => (
                        <CommandItem
                          key={institution}
                          value={institution}
                          onSelect={() => {
                            handleInputChange("institution", institution)
                            setInstitutionOpen(false)
                          }}
                          className="text-foreground hover:bg-secondary cursor-pointer"
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              formData.institution === institution ? "opacity-100" : "opacity-0",
                            )}
                          />
                          {institution}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <p className="text-xs text-muted-foreground">{form.institution.hint}</p>
            {errors.institution && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.institution}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">
              {form.password.label}
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={form.password.placeholder}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={cn(
                  "bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground pr-10",
                  errors.password && "border-destructive",
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">{form.password.hint}</p>
            {errors.password && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-foreground">
              {form.confirmPassword.label}
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder={form.confirmPassword.placeholder}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className={cn(
                  "bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground pr-10",
                  errors.confirmPassword && "border-destructive",
                )}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
            size="lg"
          >
            {form.submitButton}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        {/* Sign-in link for existing members */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already a member?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
