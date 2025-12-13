"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ExternalLink, CheckCircle2, Circle, AlertCircle, Clock, DollarSign } from "lucide-react"
import dashboardData from "@/data/dashboard.json"

export default function PartnersPage() {
  const [selectedPartner, setSelectedPartner] = useState<(typeof dashboardData.partners.organizations)[0] | null>(null)
  const { partners } = dashboardData

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{partners.headline}</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">{partners.description}</p>
      </div>

      {/* Partner Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.organizations.map((org) => (
          <Card
            key={org.id}
            className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => setSelectedPartner(org)}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img
                    src={org.logo || "/placeholder.svg"}
                    alt={org.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">{org.acronym}</h3>
                  <p className="text-sm text-muted-foreground truncate">{org.name}</p>
                </div>
              </div>
              <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                {org.tag}
              </span>
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{org.category}</span>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                  View Guide
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Partner Detail Modal */}
      <Dialog open={!!selectedPartner} onOpenChange={() => setSelectedPartner(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedPartner && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
                    <img
                      src={selectedPartner.logo || "/placeholder.svg"}
                      alt={selectedPartner.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div>
                    <DialogTitle className="text-xl">How to join {selectedPartner.acronym}</DialogTitle>
                    <p className="text-sm text-muted-foreground">{selectedPartner.name}</p>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Registration Fee</p>
                      <p className="text-sm font-medium text-foreground">{selectedPartner.fee}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Processing Time</p>
                      <p className="text-sm font-medium text-foreground">{selectedPartner.processingTime}</p>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Membership Benefits</h4>
                  <ul className="space-y-2">
                    {selectedPartner.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements Checklist */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Requirements Checklist</h4>
                  <ul className="space-y-2">
                    {selectedPartner.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        {req.important ? (
                          <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        )}
                        <span className={req.important ? "text-foreground" : "text-muted-foreground"}>{req.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Step-by-Step Guide (Accordion for mobile) */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Step-by-Step Guide</h4>
                  <Accordion type="single" collapsible className="w-full">
                    {selectedPartner.steps.map((step, index) => (
                      <AccordionItem key={index} value={`step-${index}`}>
                        <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline">
                          <span className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center flex-shrink-0">
                              {index + 1}
                            </span>
                            {step.title}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground pl-9">
                          {step.description}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                {/* CTA */}
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2" asChild>
                  <a href={selectedPartner.portalUrl} target="_blank" rel="noopener noreferrer">
                    Go to Official Registration Portal
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
