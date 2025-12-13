"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText, Download, ArrowRight } from "lucide-react"
import landingData from "@/data/landing.json"

export default function NewsSection() {
  const { news } = landingData

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "event":
        return Calendar
      case "resource":
        return Download
      default:
        return FileText
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "event":
        return { label: "Event", variant: "default" as const }
      case "resource":
        return { label: "Resource", variant: "secondary" as const }
      default:
        return { label: "News", variant: "outline" as const }
    }
  }

  return (
    <section className="py-20 lg:py-32 bg-card/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{news.headline}</h2>
          <p className="text-lg text-muted-foreground">{news.description}</p>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.items.map((item) => {
            const TypeIcon = getTypeIcon(item.type)
            const badge = getTypeBadge(item.type)

            return (
              <Card
                key={item.id}
                className="bg-card border-border overflow-hidden group hover:border-primary/50 transition-colors"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant={badge.variant} className="bg-background/80 backdrop-blur text-foreground">
                      <TypeIcon className="w-3 h-3 mr-1" />
                      {badge.label}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                  <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.excerpt}</p>
                  <Button
                    variant="ghost"
                    className="p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
            {news.viewAllCta}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
