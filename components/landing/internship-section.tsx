"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lock, MapPin, Briefcase, DollarSign, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function InternshipSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [landingData, setLandingData] = useState<any>(null)

  useEffect(() => {
    fetch('/api/landing')
      .then(res => res.json())
      .then(data => setLandingData(data))
      .catch(err => console.error('Error loading data:', err))
  }, [])

  if (!landingData) return <div className="py-20">Loading...</div>

  const { internships, navigation } = landingData

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % internships.listings.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + internships.listings.length) % internships.listings.length)
  }

  const visibleCards = 3

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Briefcase className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">{internships.badge}</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{internships.headline}</h2>
            <p className="text-lg text-muted-foreground">{internships.description}</p>
          </div>

          {/* Navigation */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="border-border text-foreground hover:bg-secondary bg-transparent"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="border-border text-foreground hover:bg-secondary bg-transparent"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Cards Carousel */}
        <div className="relative overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
            }}
          >
            {internships.listings.map((internship) => (
              <Card
                key={internship.id}
                className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-card border-border p-6 relative group"
              >
                {/* Blur Overlay - Added Link to signup */}
                <div className="absolute inset-0 bg-card/80 backdrop-blur-sm rounded-lg z-10 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Lock className="w-8 h-8 text-primary mb-3" />
                  <p className="text-sm font-medium text-foreground mb-3">{internships.lockMessage}</p>
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                    <Link href={navigation.cta.primaryHref || "/signup"}>{internships.lockCta}</Link>
                  </Button>
                </div>

                {/* Card Content */}
                <div className="space-y-4">
                  {/* Company Header */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center overflow-hidden">
                      <img
                        src={internship.logo || "/placeholder.svg"}
                        alt={internship.company}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{internship.role}</h3>
                      <p className="text-sm text-muted-foreground">{internship.company}</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{internship.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-primary" />
                      <span className="text-primary font-medium blur-sm">{internship.stipend}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {internship.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-secondary text-secondary-foreground text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Apply Button (blurred) */}
                  <Button className="w-full blur-sm pointer-events-none bg-transparent" variant="outline">
                    Apply Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA - Added Link to signup */}
        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
            <Link href={navigation.cta.primaryHref || "/signup"}>{internships.cta}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
