"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search, Users, MapPin, CheckCircle2 } from "lucide-react"
import dashboardData from "@/data/dashboard.json"

export default function ChaptersPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [zoneFilter, setZoneFilter] = useState("All Zones")
  const [stateFilter, setStateFilter] = useState("All States")
  const [autocompleteOpen, setAutocompleteOpen] = useState(false)
  const { chapters } = dashboardData

  const suggestions = useMemo(() => {
    if (!search || search.length < 2) return []
    const query = search.toLowerCase()
    return chapters.schools
      .filter(
        (school) =>
          school.name.toLowerCase().includes(query) ||
          school.shortName.toLowerCase().includes(query) ||
          school.state.toLowerCase().includes(query),
      )
      .slice(0, 6)
  }, [search, chapters.schools])

  const filteredSchools = chapters.schools.filter((school) => {
    const matchesSearch =
      school.name.toLowerCase().includes(search.toLowerCase()) ||
      school.shortName.toLowerCase().includes(search.toLowerCase())
    const matchesZone = zoneFilter === "All Zones" || school.zone === zoneFilter
    const matchesState = stateFilter === "All States" || school.state === stateFilter
    return matchesSearch && matchesZone && matchesState
  })

  const handleSchoolClick = (schoolId: number) => {
    router.push(`/dashboard/chapters/${schoolId}`)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{chapters.headline}</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">{chapters.description}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Popover open={autocompleteOpen && suggestions.length > 0} onOpenChange={setAutocompleteOpen}>
            <PopoverTrigger asChild>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search schools (e.g., 'Uni...', 'ABU', 'Lagos')..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setAutocompleteOpen(true)
                  }}
                  onFocus={() => setAutocompleteOpen(true)}
                  className="pl-10 bg-card border-border"
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
              <Command>
                <CommandList>
                  <CommandEmpty>No schools found.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    {suggestions.map((school) => (
                      <CommandItem
                        key={school.id}
                        value={school.name}
                        onSelect={() => {
                          setSearch(school.name)
                          setAutocompleteOpen(false)
                          handleSchoolClick(school.id)
                        }}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center overflow-hidden">
                            <img
                              src={school.logo || "/placeholder.svg"}
                              alt=""
                              className="w-full h-full object-contain p-1"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{school.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {school.shortName} • {school.state}
                            </p>
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
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
            className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer group"
            onClick={() => handleSchoolClick(school.id)}
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
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground text-sm leading-tight group-hover:text-primary transition-colors">
                      {school.name}
                    </h3>
                    {school.status === "active" && <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {school.shortName} • {school.state}
                  </p>
                </div>
              </div>

              {/* Zone Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                  <MapPin className="w-3 h-3" />
                  {school.zone}
                </span>
                {school.status === "active" && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-medium rounded">
                    Active Chapter
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{school.members} members</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary/80 group-hover:bg-primary/10"
                >
                  View Chapter
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
    </div>
  )
}
