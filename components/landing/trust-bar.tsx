import landingData from "@/data/landing.json"

export default function TrustBar() {
  const { trustBar } = landingData

  return (
    <section className="mt-4 py-6 bg-card/50">
      <div className="container mx-auto px-4 lg:px-8">
        <p className="text-center text-md text-muted-foreground mb-8">{trustBar.headline}</p>
        <div className="flex flex-wrap items-center justify-evenly gap-8 lg:gap-16">
          {trustBar.partners.map((partner, index) => (
            <div key={index} className=" opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
              <img
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                className="h-14 lg:h-14 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
