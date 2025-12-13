"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { MapPin, Lock, Users } from "lucide-react"
import Link from "next/link"
import landingData from "@/data/landing.json"

export default function NetworkSection() {
  const { network, navigation } = landingData

  const [hoveredSchool, setHoveredSchool] = useState<(typeof network.schools)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSchool, setSelectedSchool] = useState<(typeof network.schools)[0] | null>(null)

  const handleSchoolClick = (school: (typeof network.schools)[0]) => {
    setSelectedSchool(school)
    setIsModalOpen(true)
  }

  return (
    <section id="network" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{network.headline}</h2>
          <p className="text-lg text-muted-foreground">{network.description}</p>
        </div>

        {/* Map Container */}
        <div className="relative bg-card border border-border rounded-2xl p-8 overflow-hidden">
          {/* Nigeria Map SVG Representation */}
          <div className="relative aspect-[16/10] max-w-4xl mx-auto">
            {/* Simplified Nigeria outline */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Nigeria shape approximation */}
              <path
                d="M15 30 L25 20 L45 18 L70 22 L85 35 L75 50 L80 70 L60 85 L40 80 L25 75 L15 55 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-border"
              />
              {/* Grid lines */}
              {[20, 40, 60, 80].map((y) => (
                <line
                  key={`h-${y}`}
                  x1="10"
                  y1={y}
                  x2="90"
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="0.1"
                  className="text-border/50"
                />
              ))}
              {[20, 40, 60, 80].map((x) => (
                <line
                  key={`v-${x}`}
                  x1={x}
                  y1="10"
                  x2={x}
                  y2="90"
                  stroke="currentColor"
                  strokeWidth="0.1"
                  className="text-border/50"
                />
              ))}
            </svg>

            {/* School Pins */}
            {network.schools.map((school) => (
              <button
                key={school.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${school.x}%`, top: `${school.y}%` }}
                onMouseEnter={() => setHoveredSchool(school)}
                onMouseLeave={() => setHoveredSchool(null)}
                onClick={() => handleSchoolClick(school)}
              >
                <div className="relative">
                  <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
                  <div className="absolute inset-0 w-4 h-4 rounded-full bg-primary/50 animate-ping" />
                </div>

                {/* Tooltip */}
                {hoveredSchool?.id === school.id && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10 whitespace-nowrap">
                    <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-xl">
                      <p className="text-sm font-medium text-foreground">{school.name}</p>
                      <p className="text-xs text-muted-foreground">{school.state} State</p>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Stats Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap justify-center gap-4 lg:gap-8">
            <div className="bg-card/80 backdrop-blur border border-border rounded-lg px-4 py-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{network.stats.chapters}</span>
              </div>
            </div>
            <div className="bg-card/80 backdrop-blur border border-border rounded-lg px-4 py-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{network.stats.students}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-foreground">
                <Lock className="w-5 h-5 text-primary" />
                {network.modal.title}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {selectedSchool && (
                  <>
                    Connect with the {selectedSchool.name} chapter and {selectedSchool.members}+ members by becoming a
                    registered member.
                  </>
                )}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="bg-secondary/50 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2">Chapter Benefits</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {network.modal.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <Link href={navigation.cta.primaryHref || "/signup"}>{network.modal.cta}</Link>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
