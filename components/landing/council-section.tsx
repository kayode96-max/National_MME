"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Linkedin, Mail, ArrowRight } from "lucide-react"
import landingData from "@/data/landing.json"

export default function CouncilSection() {
  const { council } = landingData

  return (
    <section id="partners" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">{council.headline}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{council.description}</p>
            </div>

            {/* Group Photo */}
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={council.groupPhoto.image || "/placeholder.svg"}
                alt="NAMMES Central Executive Council"
                className="w-full aspect-video object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-lg font-semibold text-foreground">{council.groupPhoto.title}</p>
                <p className="text-sm text-muted-foreground">{council.groupPhoto.subtitle}</p>
              </div>
            </div>

            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              {council.cta}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Executive Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {council.executives.map((exec) => (
              <Card key={exec.id} className="bg-card border-border p-4 hover:border-primary/50 transition-colors">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="relative">
                    <img
                      src={exec.image || "/placeholder.svg"}
                      alt={exec.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-primary/20"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-xs font-bold text-primary-foreground">{exec.id}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{exec.name}</h3>
                    <p className="text-xs text-primary font-medium">{exec.role}</p>
                    <p className="text-xs text-muted-foreground mt-1">{exec.institution}</p>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={exec.linkedin}
                      className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={`mailto:${exec.email}`}
                      className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
