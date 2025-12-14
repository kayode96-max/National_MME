"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Play, X, MapPin, Calendar, ImageIcon, Video, ChevronLeft, ChevronRight } from "lucide-react"
import dashboardData from "@/data/dashboard.json"

type GalleryItem = (typeof dashboardData.gallery.items)[0]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const { gallery } = dashboardData

  const filteredItems = gallery.items.filter((item) => {
    return activeCategory === "All" || item.category === activeCategory
  })

  const featuredItems = gallery.items.filter((item) => item.featured)

  const currentIndex = selectedItem ? filteredItems.findIndex((item) => item.id === selectedItem.id) : -1

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setSelectedItem(filteredItems[currentIndex - 1])
    }
  }

  const goToNext = () => {
    if (currentIndex < filteredItems.length - 1) {
      setSelectedItem(filteredItems[currentIndex + 1])
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{gallery.headline}</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">{gallery.description}</p>
      </div>

      {/* Featured Gallery */}
      {activeCategory === "All" && featuredItems.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Featured</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {featuredItems.slice(0, 3).map((item) => (
              <Card
                key={item.id}
                className="bg-card border-border overflow-hidden cursor-pointer group"
                onClick={() => setSelectedItem(item)}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={item.thumbnail || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {item.type === "video" && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center">
                        <Play className="w-6 h-6 text-primary-foreground ml-1" />
                      </div>
                      {"duration" in item && (
                        <span className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-white text-xs rounded">
                          {item.duration}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
                      Featured
                    </span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground text-sm line-clamp-1 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </span>
                    {"location" in item && item.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {item.location}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {gallery.categories.map((category) => (
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

      {/* Gallery Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            className="bg-card border-border overflow-hidden cursor-pointer group"
            onClick={() => setSelectedItem(item)}
          >
            <div className="aspect-[4/3] relative overflow-hidden">
              <img
                src={item.thumbnail || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {item.type === "video" ? (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                    <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                    <ImageIcon className="w-5 h-5 text-gray-800" />
                  </div>
                </div>
              )}
              {item.type === "video" && "duration" in item && (
                <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 text-white text-xs rounded">
                  {item.duration}
                </span>
              )}
              <div className="absolute top-2 left-2">
                {item.type === "video" ? (
                  <Video className="w-4 h-4 text-white drop-shadow-lg" />
                ) : (
                  <ImageIcon className="w-4 h-4 text-white drop-shadow-lg" />
                )}
              </div>
            </div>
            <CardContent className="p-3">
              <h3 className="font-medium text-foreground text-sm line-clamp-1 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center gap-2 mt-1.5 text-xs text-muted-foreground">
                <span>{item.date}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <span>{item.category}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No media found</h3>
          <p className="text-muted-foreground">Try selecting a different category.</p>
        </div>
      )}

      {/* Lightbox Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl p-0 bg-black border-none">
          {selectedItem && (
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation Arrows */}
              {currentIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    goToPrevious()
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}
              {currentIndex < filteredItems.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    goToNext()
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}

              {/* Media Content */}
              {selectedItem.type === "video" && "videoUrl" in selectedItem ? (
                <div className="aspect-video">
                  <iframe
                    src={selectedItem.videoUrl?.replace("watch?v=", "embed/")}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <img
                  src={"fullSize" in selectedItem ? selectedItem.fullSize : selectedItem.thumbnail}
                  alt={selectedItem.title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              )}

              {/* Caption */}
              <div className="p-4 bg-black/80">
                <h3 className="font-semibold text-white">{selectedItem.title}</h3>
                <div className="flex items-center gap-3 mt-2 text-sm text-gray-400">
                  <span>{selectedItem.category}</span>
                  <span>•</span>
                  <span>{selectedItem.date}</span>
                  {"location" in selectedItem && selectedItem.location && (
                    <>
                      <span>•</span>
                      <span>{selectedItem.location}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
