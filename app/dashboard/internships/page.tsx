"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Bookmark,
  CheckCircle2,
  Calendar,
  Home,
  Users,
  Mail,
  Phone,
  Building2,
  ArrowRight,
} from "lucide-react"
import dashboardData from "@/data/dashboard.json"

type InternshipListing = (typeof dashboardData.internships.listings)[0]

export default function InternshipsPage() {
  const [search, setSearch] = useState("")
  const [locationFilter, setLocationFilter] = useState("All Locations")
  const [typeFilter, setTypeFilter] = useState("All Types")
  const [industryFilter, setIndustryFilter] = useState("All Industries")
  const [accommodationFilter, setAccommodationFilter] = useState("Any")
  const [selectedInternship, setSelectedInternship] = useState<InternshipListing | null>(null)
  const [savedIds, setSavedIds] = useState<number[]>([])
  const { internships } = dashboardData

  const filteredListings = internships.listings.filter((listing) => {
    const matchesSearch =
      listing.position.toLowerCase().includes(search.toLowerCase()) ||
      listing.company.toLowerCase().includes(search.toLowerCase())
    const matchesLocation = locationFilter === "All Locations" || listing.location === locationFilter
    const matchesType = typeFilter === "All Types" || listing.type === typeFilter
    const matchesIndustry = industryFilter === "All Industries" || listing.industry === industryFilter
    const matchesAccommodation =
      accommodationFilter === "Any" ||
      (accommodationFilter === "Provided" && listing.accommodationProvided) ||
      (accommodationFilter === "Not Provided" && !listing.accommodationProvided)
    return matchesSearch && matchesLocation && matchesType && matchesIndustry && matchesAccommodation
  })

  const toggleSave = (id: number) => {
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const featuredListings = filteredListings.filter((l) => l.featured)
  const regularListings = filteredListings.filter((l) => !l.featured)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{internships.headline}</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">{internships.description}</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by role or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>
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
        <Select value={industryFilter} onValueChange={setIndustryFilter}>
          <SelectTrigger className="bg-card border-border">
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent>
            {internships.filters.industries.map((ind) => (
              <SelectItem key={ind} value={ind}>
                {ind}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
        <Select value={accommodationFilter} onValueChange={setAccommodationFilter}>
          <SelectTrigger className="bg-card border-border">
            <SelectValue placeholder="Accommodation" />
          </SelectTrigger>
          <SelectContent>
            {internships.filters.accommodation.map((acc) => (
              <SelectItem key={acc} value={acc}>
                {acc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Featured Listings */}
      {featuredListings.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Featured Opportunities</h2>
          <div className="grid lg:grid-cols-3 gap-4">
            {featuredListings.map((listing) => (
              <Card
                key={listing.id}
                className="bg-gradient-to-br from-primary/10 to-transparent border-primary/30 cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => setSelectedInternship(listing)}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-card border border-border flex items-center justify-center overflow-hidden">
                        <img
                          src={listing.logo || "/placeholder.svg"}
                          alt={listing.company}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">{listing.position}</h3>
                        <p className="text-xs text-muted-foreground">{listing.company}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleSave(listing.id)
                      }}
                    >
                      <Bookmark
                        className={`w-4 h-4 ${savedIds.includes(listing.id) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                      />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" />
                      {listing.location}
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      {listing.duration}
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-500 font-medium">
                      <DollarSign className="w-3.5 h-3.5" />
                      {listing.stipend}
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Home className="w-3.5 h-3.5" />
                      {listing.accommodationProvided ? "Provided" : "Not Provided"}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Users className="w-3.5 h-3.5" />
                      {listing.openings} openings
                    </div>
                    <span className="text-xs text-orange-500 font-medium">Deadline: {listing.deadline}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Regular Listings */}
      <div className="space-y-4">
        {regularListings.length > 0 && featuredListings.length > 0 && (
          <h2 className="text-lg font-semibold text-foreground">All Opportunities</h2>
        )}
        {regularListings.map((listing) => (
          <Card
            key={listing.id}
            className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => setSelectedInternship(listing)}
          >
            <CardContent className="p-5">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-14 h-14 rounded-lg bg-secondary flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img
                      src={listing.logo || "/placeholder.svg"}
                      alt={listing.company}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-foreground">{listing.position}</h3>
                        <p className="text-sm text-muted-foreground">{listing.company}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {listing.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {listing.duration}
                      </span>
                      <span className="flex items-center gap-1 text-emerald-500 font-medium">
                        <DollarSign className="w-4 h-4" />
                        {listing.stipend}
                      </span>
                      <span className="flex items-center gap-1">
                        <Home className="w-4 h-4" />
                        {listing.accommodationProvided ? "Accommodation Provided" : "No Accommodation"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 lg:flex-col lg:items-end">
                  <span className="text-xs bg-secondary px-2 py-1 rounded text-muted-foreground">{listing.type}</span>
                  <span className="text-xs text-orange-500">Deadline: {listing.deadline}</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleSave(listing.id)
                      }}
                    >
                      <Bookmark
                        className={`w-4 h-4 ${savedIds.includes(listing.id) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                      />
                    </Button>
                    <Button
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedInternship(listing)
                      }}
                    >
                      View Details
                    </Button>
                  </div>
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

      <Dialog open={!!selectedInternship} onOpenChange={() => setSelectedInternship(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedInternship && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
                    <img
                      src={selectedInternship.logo || "/placeholder.svg"}
                      alt={selectedInternship.company}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="flex-1">
                    <DialogTitle className="text-xl">{selectedInternship.position}</DialogTitle>
                    <p className="text-muted-foreground">{selectedInternship.company}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded">
                        {selectedInternship.type}
                      </span>
                      <span className="px-2 py-0.5 bg-secondary text-muted-foreground text-xs rounded">
                        {selectedInternship.industry}
                      </span>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-xs">Location</span>
                    </div>
                    <p className="font-medium text-foreground text-sm">{selectedInternship.location}</p>
                  </div>
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs">Duration</span>
                    </div>
                    <p className="font-medium text-foreground text-sm">{selectedInternship.duration}</p>
                  </div>
                  <div className="p-3 bg-emerald-500/10 rounded-lg">
                    <div className="flex items-center gap-2 text-emerald-500 mb-1">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-xs">Stipend</span>
                    </div>
                    <p className="font-medium text-emerald-500 text-sm">{selectedInternship.stipend}</p>
                  </div>
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs">Deadline</span>
                    </div>
                    <p className="font-medium text-orange-500 text-sm">{selectedInternship.deadline}</p>
                  </div>
                </div>

                {/* Accommodation */}
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Home className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold text-foreground">Accommodation</h4>
                    {selectedInternship.accommodationProvided ? (
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-500 text-xs font-medium rounded">
                        Provided
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-orange-500/20 text-orange-500 text-xs font-medium rounded">
                        Not Provided
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedInternship.accommodationDetails}</p>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">About the Role</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedInternship.description}</p>
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

                {/* Benefits */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">What You Get</h4>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {selectedInternship.benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-muted-foreground p-2 bg-secondary/30 rounded"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Application Steps */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">How to Apply</h4>
                  <Accordion type="single" collapsible className="space-y-2">
                    {selectedInternship.applicationSteps.map((step, index) => (
                      <AccordionItem key={index} value={`step-${index}`} className="border border-border rounded-lg">
                        <AccordionTrigger className="px-4 py-3 hover:no-underline">
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center justify-center">
                              {step.step}
                            </span>
                            <span className="font-medium text-foreground text-sm">{step.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <p className="text-sm text-muted-foreground pl-9">{step.description}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                {/* Contact Information */}
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold text-foreground">Contact Information</h4>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-foreground">{selectedInternship.contact.name}</p>
                    <div className="flex flex-wrap gap-4">
                      <a
                        href={`mailto:${selectedInternship.contact.email}`}
                        className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        <Mail className="w-4 h-4" />
                        {selectedInternship.contact.email}
                      </a>
                      <a
                        href={`tel:${selectedInternship.contact.phone}`}
                        className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        <Phone className="w-4 h-4" />
                        {selectedInternship.contact.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex gap-3 pt-2">
                  <Button className="flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
                  </Button>
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
