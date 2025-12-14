"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Calendar, Newspaper, Megaphone, ExternalLink, Clock, Search, TrendingUp } from "lucide-react"
import dashboardData from "@/data/dashboard.json"

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  event: Calendar,
  news: Newspaper,
  announcement: Megaphone,
  blog: TrendingUp,
}

const typeColors: Record<string, string> = {
  event: "bg-blue-500/10 text-blue-500",
  news: "bg-emerald-500/10 text-emerald-500",
  announcement: "bg-purple-500/10 text-purple-500",
  blog: "bg-amber-500/10 text-amber-500",
}

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const { news } = dashboardData

  const filteredItems = news.items.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.type.toLowerCase() === activeCategory.toLowerCase()
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredItems = news.items.filter((item) => item.featured)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{news.headline}</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">{news.description}</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search news and articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-card border-border"
        />
      </div>

      {/* Featured Section */}
      {featuredItems.length > 0 && searchQuery === "" && activeCategory === "All" && (
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Featured Stories</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {featuredItems.slice(0, 2).map((item) => {
              const Icon = typeIcons[item.type] || Newspaper
              return (
                <Card
                  key={item.id}
                  className="bg-card border-border overflow-hidden group cursor-pointer hover:border-primary/50 transition-colors"
                >
                  <div className="aspect-video bg-secondary overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
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
                      <ExternalLink className="w-4 h-4" />
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
        {news.categories.map((category) => (
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

      {/* All Items Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const Icon = typeIcons[item.type] || Newspaper
          return (
            <Card
              key={item.id}
              className="bg-card border-border overflow-hidden hover:border-primary/50 transition-colors group cursor-pointer"
            >
              <div className="aspect-video bg-secondary overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
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
                <h3 className="font-medium text-foreground text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground">{item.date}</p>
                {item.author && <p className="text-xs text-muted-foreground mt-1">By {item.author}</p>}
                <Button variant="ghost" size="sm" className="mt-3 text-primary hover:text-primary/80 p-0 h-auto">
                  {item.cta}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Newspaper className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No articles found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  )
}
