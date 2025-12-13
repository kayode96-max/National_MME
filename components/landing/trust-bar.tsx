import landingData from "@/data/landing.json"

export default function TrustBar() {
  const { trustBar } = landingData

  return (
    <section className="py-12 border-y border-border bg-card/50">
      <div className="container mx-auto px-4 lg:px-8">
        <p className="text-center text-sm text-muted-foreground mb-8">{trustBar.headline}</p>
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {trustBar.partners.map((partner, index) => (
            <div key={index} className="opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
              <img
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                className="h-8 lg:h-10 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
