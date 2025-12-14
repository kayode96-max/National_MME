"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Linkedin, Mail, Building2 } from "lucide-react"
import dashboardData from "@/data/dashboard.json"

export default function CouncilPage() {
  const { council } = dashboardData
  const [activeTab, setActiveTab] = useState("staffAdvisers")

  const renderPersonCard = (person: {
    id: number
    name: string
    role: string
    institution: string
    image: string
    bio: string
    linkedin: string
    email: string
  }) => (
    <Card key={person.id} className="bg-card border-border overflow-hidden group">
      <div className="aspect-square bg-secondary overflow-hidden">
        <img
          src={person.image || "/placeholder.svg"}
          alt={person.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardContent className="p-5">
        <h3 className="font-semibold text-foreground">{person.name}</h3>
        <p className="text-sm text-primary font-medium">{person.role}</p>
        <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
          <Building2 className="w-3.5 h-3.5" />
          {person.institution}
        </div>
        <p className="text-sm text-muted-foreground mt-3 line-clamp-3">{person.bio}</p>

        {/* Social Links */}
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${person.email}`}
            className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{council.headline}</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">{council.description}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-card border border-border flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="staffAdvisers" className="flex-1 min-w-[120px]">
            Staff Advisers
          </TabsTrigger>
          <TabsTrigger value="cec" className="flex-1 min-w-[120px]">
            CEC
          </TabsTrigger>
          <TabsTrigger value="senate" className="flex-1 min-w-[120px]">
            Senate
          </TabsTrigger>
          <TabsTrigger value="councilOfPresidents" className="flex-1 min-w-[120px]">
            Council of Presidents
          </TabsTrigger>
        </TabsList>

        {/* Staff Advisers Tab */}
        <TabsContent value="staffAdvisers" className="space-y-4">
          <div className="bg-secondary/30 rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground">
              Staff Advisers provide guidance and mentorship to NMGS leadership. They serve as the link between the
              student body and academic institutions.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{council.staffAdvisers.map(renderPersonCard)}</div>
        </TabsContent>

        {/* CEC Tab */}
        <TabsContent value="cec" className="space-y-4">
          <div className="bg-secondary/30 rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground">
              The Central Executive Council (CEC) is the elected national leadership responsible for day-to-day
              administration and strategic direction of NMGS.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{council.cec.map(renderPersonCard)}</div>
        </TabsContent>

        {/* Senate Tab */}
        <TabsContent value="senate" className="space-y-4">
          <div className="bg-secondary/30 rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground">
              The Senate is the legislative arm of NMGS, responsible for policy formulation, oversight, and ensuring
              accountability in the association's operations.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{council.senate.map(renderPersonCard)}</div>
        </TabsContent>

        {/* Council of Presidents Tab */}
        <TabsContent value="councilOfPresidents" className="space-y-4">
          <div className="bg-secondary/30 rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground">
              The Council of Presidents comprises all chapter presidents across Nigerian universities. They represent
              their local members and participate in national decision-making.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {council.councilOfPresidents.map(renderPersonCard)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
