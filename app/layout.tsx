import type { Metadata } from "next"
import { Manrope } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
})

const cabinetGrotesk = localFont({
  src: [
    {
      path: "../public/fonts/Fonts/WEB/fonts/CabinetGrotesk-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Fonts/WEB/fonts/CabinetGrotesk-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Fonts/WEB/fonts/CabinetGrotesk-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-cabinet-grotesk",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
})

export const metadata: Metadata = {
  title: "MealPlate - Stop overthinking what to cook",
  description: "MealPlate turns your budget + routine into a personalised meal plan.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${cabinetGrotesk.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}

