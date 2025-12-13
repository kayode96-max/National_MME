"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Mail, Twitter } from "lucide-react"
import dashboardData from "@/data/dashboard.json"

export default function CouncilPage() {
  const { council } = dashboardData

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{council.headline}</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">{council.description}</p>
      </div>

      {/* Executives Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {council.executives.map((executive) => (
          <Card key={executive.id} className="bg-card border-border overflow-hidden">
            <div className="aspect-square bg-secondary overflow-hidden">
              <img
                src={executive.image || "/placeholder.svg"}
                alt={executive.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground">{executive.name}</h3>
              <p className="text-sm text-primary font-medium">{executive.role}</p>
              <p className="text-xs text-muted-foreground mt-1">{executive.institution}</p>
              <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{executive.bio}</p>

              {/* Social Links */}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                <a
                  href={executive.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${executive.email}`}
                  className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href={executive.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
