"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Users, Mail, Phone } from "lucide-react"
import dashboardData from "@/data/dashboard.json"

export default function ChaptersPage() {
  const [search, setSearch] = useState("")
  const [zoneFilter, setZoneFilter] = useState("All Zones")
  const [stateFilter, setStateFilter] = useState("All States")
  const [selectedSchool, setSelectedSchool] = useState<(typeof dashboardData.chapters.schools)[0] | null>(null)
  const { chapters } = dashboardData

  const filteredSchools = chapters.schools.filter((school) => {
    const matchesSearch = school.name.toLowerCase().includes(search.toLowerCase())
    const matchesZone = zoneFilter === "All Zones" || school.zone === zoneFilter
    const matchesState = stateFilter === "All States" || school.state === stateFilter
    return matchesSearch && matchesZone && matchesState
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{chapters.headline}</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">{chapters.description}</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search schools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>
        <Select value={zoneFilter} onValueChange={setZoneFilter}>
          <SelectTrigger className="w-full sm:w-[180px] bg-card border-border">
            <SelectValue placeholder="Filter by Zone" />
          </SelectTrigger>
          <SelectContent>
            {chapters.filters.zones.map((zone) => (
              <SelectItem key={zone} value={zone}>
                {zone}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={stateFilter} onValueChange={setStateFilter}>
          <SelectTrigger className="w-full sm:w-[180px] bg-card border-border">
            <SelectValue placeholder="Filter by State" />
          </SelectTrigger>
          <SelectContent>
            {chapters.filters.states.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Schools Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchools.map((school) => (
          <Card
            key={school.id}
            className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => setSelectedSchool(school)}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-lg bg-secondary flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img
                    src={school.logo || "/placeholder.svg"}
                    alt={school.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-sm leading-tight">{school.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {school.state}, {school.zone}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{school.members} members</span>
                </div>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSchools.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No chapters found matching your search.</p>
        </div>
      )}

      {/* School Detail Modal */}
      <Dialog open={!!selectedSchool} onOpenChange={() => setSelectedSchool(null)}>
        <DialogContent className="sm:max-w-md">
          {selectedSchool && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
                    <img
                      src={selectedSchool.logo || "/placeholder.svg"}
                      alt={selectedSchool.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div>
                    <DialogTitle className="text-lg">{selectedSchool.name}</DialogTitle>
                    <p className="text-sm text-muted-foreground">
                      {selectedSchool.state}, {selectedSchool.zone}
                    </p>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">Members</p>
                    <p className="text-lg font-semibold text-foreground">{selectedSchool.members}</p>
                  </div>
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">Established</p>
                    <p className="text-lg font-semibold text-foreground">{selectedSchool.established}</p>
                  </div>
                </div>

                {/* Chapter President */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Chapter President</h4>
                  <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-secondary">
                      <img
                        src={selectedSchool.president.image || "/placeholder.svg"}
                        alt={selectedSchool.president.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{selectedSchool.president.name}</p>
                      <p className="text-xs text-muted-foreground">Chapter President</p>
                    </div>
                  </div>
                </div>

                {/* Contact Options */}
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start gap-3 border-border bg-transparent" asChild>
                    <a href={`mailto:${selectedSchool.president.email}`}>
                      <Mail className="w-4 h-4 text-primary" />
                      {selectedSchool.president.email}
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-3 border-border bg-transparent" asChild>
                    <a href={`tel:${selectedSchool.president.phone}`}>
                      <Phone className="w-4 h-4 text-primary" />
                      {selectedSchool.president.phone}
                    </a>
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
