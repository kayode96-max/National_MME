"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Award, Shield, Download, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import landingData from "@/data/landing.json"

const iconMap: { [key: string]: React.ElementType } = {
  shield: Shield,
  download: Download,
  award: Award,
  eye: Eye,
}

export default function CertificateSection() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const { certificate, navigation } = landingData

  return (
    <section id="benefits" className="py-20 lg:py-32 bg-card/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Certificate Visual */}
          <div className="order-2 lg:order-1">
            <div className="relative mx-auto max-w-md group cursor-pointer" onClick={() => setIsPreviewOpen(true)}>
              {/* Certificate Image */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] group-hover:shadow-primary/20">
                <Image
                  src={certificate.image || "/placeholder.svg"}
                  alt="NAMMES Membership Certificate"
                  width={450}
                  height={600}
                  className="w-full h-auto"
                />
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-primary rounded-full p-3 shadow-lg animate-pulse">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>

              {/* Click hint */}
              <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                <div className="flex items-center gap-2 bg-primary px-4 py-2 rounded-full">
                  <Eye className="w-4 h-4 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">Click to Preview</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary">{certificate.badge}</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">{certificate.headline}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{certificate.description}</p>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4">
              {certificate.features.map((feature, index) => {
                const IconComponent = iconMap[feature.icon] || Shield
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <Link href={navigation.cta.primaryHref || "/signup"}>{certificate.cta.primary}</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-secondary bg-transparent"
                onClick={() => setIsPreviewOpen(true)}
              >
                <Eye className="w-4 h-4 mr-2" />
                {certificate.cta.secondary}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="bg-card border-border max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-foreground">Certificate Preview</DialogTitle>
          </DialogHeader>
          <div className="bg-secondary/30 rounded-lg p-4">
            <Image
              src={certificate.previewImage || "/placeholder.svg"}
              alt="Certificate Preview"
              width={600}
              height={800}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <p className="text-center text-sm text-muted-foreground">{certificate.previewNote}</p>
        </DialogContent>
      </Dialog>
    </section>
  )
}
