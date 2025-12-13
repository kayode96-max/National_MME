"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, MapPin, Clock, DollarSign, Bookmark, CheckCircle2, Calendar } from "lucide-react"
import dashboardData from "@/data/dashboard.json"

export default function InternshipsPage() {
  const [search, setSearch] = useState("")
  const [locationFilter, setLocationFilter] = useState("All Locations")
  const [typeFilter, setTypeFilter] = useState("All Types")
  const [durationFilter, setDurationFilter] = useState("All Durations")
  const [selectedInternship, setSelectedInternship] = useState<(typeof dashboardData.internships.listings)[0] | null>(
    null,
  )
  const [savedIds, setSavedIds] = useState<number[]>([])
  const { internships } = dashboardData

  const filteredListings = internships.listings.filter((listing) => {
    const matchesSearch =
      listing.role.toLowerCase().includes(search.toLowerCase()) ||
      listing.company.toLowerCase().includes(search.toLowerCase())
    const matchesLocation = locationFilter === "All Locations" || listing.location === locationFilter
    const matchesType = typeFilter === "All Types" || listing.type === typeFilter
    const matchesDuration = durationFilter === "All Durations" || listing.duration === durationFilter
    return matchesSearch && matchesLocation && matchesType && matchesDuration
  })

  const toggleSave = (id: number) => {
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{internships.headline}</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">{internships.description}</p>
      </div>

      {/* Filters */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by role or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>
        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger className="bg-card border-border">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            {internships.filters.locations.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="bg-card border-border">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            {internships.filters.types.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={durationFilter} onValueChange={setDurationFilter}>
          <SelectTrigger className="bg-card border-border">
            <SelectValue placeholder="Duration" />
          </SelectTrigger>
          <SelectContent>
            {internships.filters.durations.map((dur) => (
              <SelectItem key={dur} value={dur}>
                {dur}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Listings */}
      <div className="space-y-4">
        {filteredListings.map((listing) => (
          <Card
            key={listing.id}
            className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => setSelectedInternship(listing)}
          >
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-14 h-14 rounded-lg bg-secondary flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img
                    src={listing.logo || "/placeholder.svg"}
                    alt={listing.company}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-foreground">{listing.role}</h3>
                      <p className="text-sm text-muted-foreground">{listing.company}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="flex-shrink-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleSave(listing.id)
                      }}
                    >
                      <Bookmark
                        className={`w-5 h-5 ${savedIds.includes(listing.id) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                      />
                    </Button>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {listing.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {listing.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {listing.stipend}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {listing.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex sm:flex-col items-center gap-2 sm:items-end">
                  <span className="text-xs bg-secondary px-2 py-1 rounded text-muted-foreground">{listing.type}</span>
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedInternship(listing)
                    }}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No internships found matching your criteria.</p>
        </div>
      )}

      {/* Internship Detail Modal */}
      <Dialog open={!!selectedInternship} onOpenChange={() => setSelectedInternship(null)}>
        <DialogContent className="sm:max-w-lg">
          {selectedInternship && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
                    <img
                      src={selectedInternship.logo || "/placeholder.svg"}
                      alt={selectedInternship.company}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div>
                    <DialogTitle>{selectedInternship.role}</DialogTitle>
                    <p className="text-sm text-muted-foreground">{selectedInternship.company}</p>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-sm font-medium text-foreground">{selectedInternship.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="text-sm font-medium text-foreground">{selectedInternship.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Stipend</p>
                      <p className="text-sm font-medium text-foreground">{selectedInternship.stipend}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Deadline</p>
                      <p className="text-sm font-medium text-foreground">{selectedInternship.deadline}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedInternship.description}</p>
                </div>

                {/* Requirements */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Requirements</h4>
                  <ul className="space-y-2">
                    {selectedInternship.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {selectedInternship.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex gap-3">
                  <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">Apply Now</Button>
                  <Button
                    variant="outline"
                    className="border-border bg-transparent"
                    onClick={() => toggleSave(selectedInternship.id)}
                  >
                    <Bookmark
                      className={`w-4 h-4 ${savedIds.includes(selectedInternship.id) ? "fill-primary text-primary" : ""}`}
                    />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
