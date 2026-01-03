"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface ResourceItem {
  id: number
  title: string
  description: string
  category: string
  fileType: string
  fileSize: string
  downloads: number
  featured: boolean
}
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  FileText,
  Download,
  Search,
  File,
  ImageIcon,
  Video,
  FileSpreadsheet,
  Presentation,
  FolderOpen,
} from "lucide-react"

const fileTypeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  pdf: FileText,
  doc: File,
  docx: File,
  xls: FileSpreadsheet,
  xlsx: FileSpreadsheet,
  ppt: Presentation,
  pptx: Presentation,
  jpg: ImageIcon,
  png: ImageIcon,
  mp4: Video,
  default: File,
}

const categoryColors: Record<string, string> = {
  "Study Materials": "bg-blue-500/10 text-blue-500",
  "Forms & Templates": "bg-emerald-500/10 text-emerald-500",
  "Research Papers": "bg-purple-500/10 text-purple-500",
  Guidelines: "bg-amber-500/10 text-amber-500",
  "Maps & Data": "bg-rose-500/10 text-rose-500",
}

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [dashboardData, setDashboardData] = useState<any>(null)

  useEffect(() => {
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(data => setDashboardData(data))
      .catch(err => console.error('Error loading data:', err))
  }, [])

  if (!dashboardData) return <div className="p-8">Loading...</div>

  const { resources } = dashboardData

  const filteredItems = resources.items.filter((item: ResourceItem) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredItems = resources.items.filter((item: ResourceItem) => item.featured)

  const getFileIcon = (fileType: string) => {
    const ext = fileType.toLowerCase()
    return fileTypeIcons[ext] || fileTypeIcons.default
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{resources.headline}</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">{resources.description}</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-card border-border"
        />
      </div>

      {/* Featured Resources */}
      {featuredItems.length > 0 && searchQuery === "" && activeCategory === "All" && (
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Featured Resources</h2>
          <div className="grid lg:grid-cols-3 gap-4">
            {featuredItems.slice(0, 3).map((item: ResourceItem) => {
              const FileIcon = getFileIcon(item.fileType)
              return (
                <Card
                  key={item.id}
                  className="bg-linear-to-br from-primary/5 to-primary/10 border-primary/20 overflow-hidden"
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <FileIcon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span
                          className={cn(
                            "inline-flex px-2 py-0.5 text-xs font-medium rounded-full mb-2",
                            categoryColors[item.category] || "bg-muted text-muted-foreground",
                          )}
                        >
                          {item.category}
                        </span>
                        <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-2">{item.title}</h3>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {item.fileType.toUpperCase()} • {item.fileSize}
                          </span>
                          <Button
                            size="sm"
                            className="h-8 gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {resources.categories.map((category: string) => (
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

      {/* Resources List */}
      <div className="space-y-3">
        {filteredItems.map((item: ResourceItem) => {
          const FileIcon = getFileIcon(item.fileType)
          return (
            <Card key={item.id} className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <FileIcon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-foreground text-sm truncate">{item.title}</h3>
                      <span
                        className={cn(
                          "inline-flex px-2 py-0.5 text-xs font-medium rounded-full shrink-0",
                          categoryColors[item.category] || "bg-muted text-muted-foreground",
                        )}
                      >
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-4 shrink-0">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {item.fileType.toUpperCase()} • {item.fileSize}
                    </span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{item.downloads} downloads</span>
                    <Button size="sm" variant="outline" className="gap-1.5 bg-transparent">
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </Button>
                  </div>
                  <Button size="sm" variant="outline" className="sm:hidden gap-1.5 bg-transparent">
                    <Download className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No resources found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  )
}
