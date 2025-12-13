"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, MapPin } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import landingData from "@/data/landing.json"

export default function HeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const { hero, navigation } = landingData

  return (
    <section id="about" className="relative min-h-screen flex items-center pt-20">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-primary">{hero.badge}</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                {hero.headline.prefix} <span className="text-primary">{hero.headline.highlight}</span>{" "}
                {hero.headline.suffix}
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed">{hero.description}</p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              {hero.stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs - Added Link to signup page */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2" asChild>
                <Link href={navigation.cta.primaryHref || "/signup"}>
                  {hero.cta.primary}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-border text-foreground hover:bg-secondary bg-transparent"
                onClick={() => {
                  document.getElementById("network")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                <MapPin className="w-4 h-4" />
                {hero.cta.secondary}
              </Button>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-card border border-border">
              <img
                src={hero.image || "/placeholder.svg"}
                alt="NMGS Students in the field"
                className="w-full h-full object-cover"
              />
              {/* Play Button Overlay */}
              <button
                onClick={() => setIsVideoPlaying(true)}
                className="absolute inset-0 flex items-center justify-center bg-background/20 hover:bg-background/30 transition-colors group"
              >
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center animate-pulse-glow">
                  <Play className="w-8 h-8 text-primary-foreground fill-primary-foreground ml-1" />
                </div>
              </button>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-4 shadow-2xl max-w-xs hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {hero.floatingCard.avatars.map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar || "/placeholder.svg"}
                      alt="Member"
                      className="w-10 h-10 rounded-full border-2 border-card object-cover"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{hero.floatingCard.text}</p>
                  <p className="text-xs text-muted-foreground">{hero.floatingCard.subtext}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
