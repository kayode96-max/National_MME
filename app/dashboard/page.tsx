"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Award, Briefcase, Building, MapPin, Download, ChevronRight, Calendar, Users, Verified } from "lucide-react"
import dashboardData from "@/data/dashboard.json"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  award: Award,
  briefcase: Briefcase,
  building: Building,
  "map-pin": MapPin,
}

const colorMap: Record<string, string> = {
  primary: "bg-primary text-primary-foreground",
  blue: "bg-blue-600 text-white",
  amber: "bg-amber-600 text-white",
  emerald: "bg-emerald-600 text-white",
}

export default function DashboardPage() {
  const [certificateModalOpen, setCertificateModalOpen] = useState(false)
  const { user, quickActions, internships } = dashboardData

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Welcome back, {user.name.split(" ")[0]}.</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-muted-foreground">Member ID: #{user.membershipId}</span>
            {user.verified && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                <Verified className="w-3 h-3" />
                Verified
              </span>
            )}
          </div>
        </div>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
          onClick={() => setCertificateModalOpen(true)}
        >
          <Download className="w-4 h-4" />
          Download Certificate
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Member Since</p>
                <p className="text-sm font-medium text-foreground">{user.memberSince}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Chapter</p>
                <p className="text-sm font-medium text-foreground truncate max-w-30">{user.institution}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Level</p>
                <p className="text-sm font-medium text-foreground">{user.level}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Institution</p>
                <p className="text-sm font-medium text-foreground">{user.institution}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Cards Grid */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((card: any) => {
            const Icon = iconMap[card.icon] || Award
            const isModal = card.id === "certificate"

            const CardWrapper = isModal ? "button" : Link
            const cardProps = isModal
              ? { onClick: () => setCertificateModalOpen(true), className: "text-left w-full" }
              : { href: card.href }

            return (
              <CardWrapper key={card.id} {...(cardProps as any)}>
                <Card className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div
                      className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", colorMap[card.color])}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{card.title}</h3>
                    <p className="text-sm text-muted-foreground">{card.description}</p>
                  </CardContent>
                </Card>
              </CardWrapper>
            )
          })}
        </div>
      </div>

      {/* Recent Internships */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Latest Opportunities</h2>
          <Link
            href="/dashboard/internships"
            className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {internships.listings.slice(0, 3).map((internship) => (
            <Card key={internship.id} className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center overflow-hidden shrink-0">
                    <img
                      src={internship.logo || "/placeholder.svg"}
                      alt={internship.company}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">{internship.position}</h3>
                    <p className="text-sm text-muted-foreground">{internship.company}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">{internship.type}</span>
                      <span className="text-xs text-muted-foreground">{internship.location}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      <Dialog open={certificateModalOpen} onOpenChange={setCertificateModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Your Membership Certificate</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="aspect-[1.4/1] bg-secondary rounded-lg overflow-hidden">
              <img
                src="/professional-membership-certificate-with-gold-bord.jpg"
                alt="NMGS Membership Certificate"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex gap-3">
              <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
              <Button variant="outline" className="flex-1 border-border bg-transparent">
                Share
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ")
}
