import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NAMMES - National Association of Materials and Metallurgical Engineers Students",
  description:
    "The National Body for Materials and Metallurgical Engineers Students. Connect with peers, secure top-tier internships, and get certified.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/nammes_logo.jpg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/nammes_logo.jpg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/nammes_logo.jpg",
        type: "image/jpeg",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
