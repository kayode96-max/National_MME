"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Calendar, FileText, Newspaper, Megaphone, Download, ExternalLink, Clock } from "lucide-react"
import dashboardData from "@/data/dashboard.json"

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  event: Calendar,
  news: Newspaper,
  resource: FileText,
  announcement: Megaphone,
}

const typeColors: Record<string, string> = {
  event: "bg-blue-500/10 text-blue-500",
  news: "bg-emerald-500/10 text-emerald-500",
  resource: "bg-amber-500/10 text-amber-500",
  announcement: "bg-purple-500/10 text-purple-500",
}

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const { resources } = dashboardData

  const filteredItems = resources.items.filter((item) => {
    if (activeCategory === "All") return true
    return item.type.toLowerCase() === activeCategory.toLowerCase()
  })

  const featuredItems = resources.items.filter((item) => item.featured)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{resources.headline}</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">{resources.description}</p>
      </div>

      {/* Featured Section */}
      {featuredItems.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Featured</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {featuredItems.slice(0, 2).map((item) => {
              const Icon = typeIcons[item.type] || Newspaper
              return (
                <Card key={item.id} className="bg-card border-border overflow-hidden">
                  <div className="aspect-video bg-secondary overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full",
                          typeColors[item.type],
                        )}
                      >
                        <Icon className="w-3 h-3" />
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </span>
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.excerpt}</p>
                    {item.location && (
                      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.location}
                      </p>
                    )}
                    {item.deadline && (
                      <p className="text-xs text-amber-500 mt-2 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Deadline: {item.deadline}
                      </p>
                    )}
                    <Button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                      {item.cta}
                      {item.type === "resource" ? (
                        <Download className="w-4 h-4" />
                      ) : (
                        <ExternalLink className="w-4 h-4" />
                      )}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {resources.categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category)}
            className={cn(
              activeCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-transparent border-border text-foreground hover:bg-secondary",
            )}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* All Items Grid (Masonry-style) */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const Icon = typeIcons[item.type] || Newspaper
          return (
            <Card
              key={item.id}
              className="bg-card border-border overflow-hidden hover:border-primary/50 transition-colors"
            >
              <div className="aspect-video bg-secondary overflow-hidden">
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full",
                      typeColors[item.type],
                    )}
                  >
                    <Icon className="w-3 h-3" />
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </span>
                </div>
                <h3 className="font-medium text-foreground text-sm mb-1 line-clamp-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.date}</p>
                {item.fileType && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.fileType} • {item.fileSize}
                  </p>
                )}
                <Button variant="ghost" size="sm" className="mt-3 text-primary hover:text-primary/80 p-0 h-auto">
                  {item.cta}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
