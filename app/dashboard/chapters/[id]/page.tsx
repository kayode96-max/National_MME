"use client"

import { use, useEffect, useState } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, MapPin, CheckCircle2, Users, Mail, Phone, Building2, GraduationCap, Calendar } from "lucide-react"

export default function SchoolProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const schoolId = Number.parseInt(id)
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [school, setSchool] = useState<any>(null)

  useEffect(() => {
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(data => {
        setDashboardData(data)
        const foundSchool = data.chapters.schools.find((s: any) => s.id === schoolId)
        setSchool(foundSchool)
      })
      .catch(err => console.error('Error loading data:', err))
  }, [schoolId])

  if (!dashboardData) return <div className="p-8">Loading...</div>

  if (!school) {
    notFound()
  }

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link href="/dashboard/chapters">
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" />
          Back to Chapters
        </Button>
      </Link>

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary/20 via-primary/10 to-transparent border border-border p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-xl bg-card border border-border flex items-center justify-center overflow-hidden shrink-0">
            <img
              src={school.logo || "/placeholder.svg"}
              alt={school.name}
              className="w-full h-full object-contain p-3"
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{school.name}</h1>
              {school.status === "active" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm font-medium rounded-full">
                  <CheckCircle2 className="w-4 h-4" />
                  Active Chapter
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {school.zone}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                {school.members} Members
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                Est. {school.established}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed Content */}
      <Tabs defaultValue="department" className="space-y-6">
        <TabsList className="bg-card border border-border">
          <TabsTrigger value="department">Department Info</TabsTrigger>
          <TabsTrigger value="leadership">Student Leadership</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        {/* Tab 1: Department Info */}
        <TabsContent value="department" className="space-y-6">
          {/* Department Overview */}
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">{school.department.name}</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{school.department.faculty}</p>
              <p className="text-muted-foreground leading-relaxed">{school.department.description}</p>
            </CardContent>
          </Card>

          {/* HOD Profile */}
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Head of Department</h3>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-32 h-32 rounded-xl overflow-hidden bg-secondary shrink-0">
                  <img
                    src={school.hod.image || "/placeholder.svg"}
                    alt={school.hod.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{school.hod.name}</h4>
                  <p className="text-sm text-primary mb-3">{school.hod.title}</p>
                  <div className="bg-secondary/50 rounded-lg p-4 mb-4">
                    <p className="text-sm text-muted-foreground italic">"{school.hod.message}"</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`mailto:${school.hod.email}`}
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      {school.hod.email}
                    </a>
                    <a
                      href={`tel:${school.hod.phone}`}
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      {school.hod.phone}
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Staff List */}
          {school.staff && school.staff.length > 0 && (
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Academic Staff</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {school.staff.map((member, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary shrink-0">
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.title}</p>
                        <p className="text-xs text-primary">{member.specialization}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Tab 2: Student Leadership */}
        <TabsContent value="leadership" className="space-y-6">
          {school.executives && school.executives.length > 0 && (
            <>
              {/* President Highlight */}
              {school.executives
                .filter((e) => e.role === "President")
                .map((president) => (
                  <Card
                    key={president.name}
                    className="bg-linear-to-br from-primary/10 to-transparent border-primary/30"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-36 h-36 rounded-xl overflow-hidden bg-secondary shrink-0uto md:mx-0">
                          <img
                            src={president.image || "/placeholder.svg"}
                            alt={president.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full mb-3">
                            <GraduationCap className="w-3.5 h-3.5" />
                            Chapter President
                          </span>
                          <h3 className="text-xl font-bold text-foreground">{president.name}</h3>
                          <p className="text-muted-foreground mb-4">{president.level}</p>
                          <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
                              <a href={`mailto:${president.email}`}>
                                <Mail className="w-4 h-4" />
                                Email
                              </a>
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
                              <a href={`tel:${president.phone}`}>
                                <Phone className="w-4 h-4" />
                                Call
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

              {/* Other Executives */}
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Executive Committee</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {school.executives
                      .filter((e) => e.role !== "President")
                      .map((exec, index) => (
                        <div key={index} className="p-4 bg-secondary/30 rounded-xl">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="w-14 h-14 rounded-full overflow-hidden bg-secondary shrink-0">
                              <img
                                src={exec.image || "/placeholder.svg"}
                                alt={exec.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-semibold text-foreground">{exec.name}</p>
                              <p className="text-sm text-primary">{exec.role}</p>
                              <p className="text-xs text-muted-foreground">{exec.level}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <a
                              href={`mailto:${exec.email}`}
                              className="flex-1 flex items-center justify-center gap-1.5 p-2 bg-secondary rounded-lg text-xs text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              Email
                            </a>
                            <a
                              href={`tel:${exec.phone}`}
                              className="flex-1 flex items-center justify-center gap-1.5 p-2 bg-secondary rounded-lg text-xs text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              Call
                            </a>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        {/* Tab 3: Contact */}
        <TabsContent value="contact" className="space-y-6">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Department Contact Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Address</p>
                      <p className="text-sm text-muted-foreground">{school.department.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <a href={`mailto:${school.department.email}`} className="text-sm text-primary hover:underline">
                        {school.department.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Phone</p>
                      <a href={`tel:${school.department.phone}`} className="text-sm text-primary hover:underline">
                        {school.department.phone}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="bg-secondary/30 rounded-xl p-6">
                  <h4 className="font-medium text-foreground mb-3">Quick Contact</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Reach out to the chapter president for inquiries about joining NAMMES {school.shortName} or
                    participating in chapter activities.
                  </p>
                  {school.executives && school.executives[0] && (
                    <div className="space-y-2">
                      <Button className="w-full gap-2 bg-primary text-primary-foreground" asChild>
                        <a href={`mailto:${school.executives[0].email}`}>
                          <Mail className="w-4 h-4" />
                          Email Chapter President
                        </a>
                      </Button>
                      <Button variant="outline" className="w-full gap-2 bg-transparent" asChild>
                        <a href={`tel:${school.executives[0].phone}`}>
                          <Phone className="w-4 h-4" />
                          Call Chapter President
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
