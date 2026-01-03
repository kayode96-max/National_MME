"use client"

import { useState, useEffect, Suspense, lazy } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { MapPin, Lock, Users } from "lucide-react"
import Link from "next/link"

// Lazy load the map component to avoid SSR issues
const InteractiveMap = lazy(() => import('./interactive-map'))

export default function NetworkSection() {
  const [landingData, setLandingData] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSchool, setSelectedSchool] = useState<any>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    fetch('/api/landing')
      .then(res => res.json())
      .then(data => setLandingData(data))
      .catch(err => console.error('Error loading data:', err))
  }, [])

  if (!landingData) return <div className="py-20">Loading...</div>

  const { network, navigation } = landingData

  const handleSchoolClick = (school: any) => {
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
        <div className="relative bg-card border border-border rounded-2xl p-4 lg:p-8 overflow-hidden">
          {isMounted ? (
            <Suspense fallback={
              <div className="w-full h-[500px] rounded-2xl bg-secondary/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-sm text-muted-foreground">Loading interactive map...</p>
                </div>
              </div>
            }>
              <InteractiveMap schools={network.schools} onSchoolClick={handleSchoolClick} />
            </Suspense>
          ) : (
            <div className="w-full h-[500px] rounded-2xl bg-secondary/50 flex items-center justify-center">
              <p className="text-sm text-muted-foreground">Initializing map...</p>
            </div>
          )}

          {/* Stats Overlay */}
          <div className="mt-4 flex flex-wrap justify-center gap-4 lg:gap-8">
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
