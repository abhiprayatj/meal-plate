"use client"

import { useState, useEffect } from "react"
import { HeroSection } from "@/components/hero-section"
import { Highlights } from "@/components/highlights"
import { InputForm } from "@/components/input-form"
import { Confirmation } from "@/components/confirmation"
import { trackEvent } from "@/lib/analytics"

export function LandingPageClient() {
  const [constraintsSubmitted, setConstraintsSubmitted] = useState(false)

  useEffect(() => {
    trackEvent("page_view")
  }, [])

  const handleFormSubmit = (value: string) => {
    setConstraintsSubmitted(true)
  }

  return (
    <main className="h-screen overflow-y-auto bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 space-y-6">
        {/* Logo */}
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-slate-900">mealplate</h1>
        </div>
        
        {/* Hero */}
        <HeroSection />
        
        {/* Form */}
        {!constraintsSubmitted ? (
          <InputForm onSubmit={handleFormSubmit} />
        ) : (
          <Confirmation />
        )}
        
        {/* Values */}
        <Highlights />
      </div>
    </main>
  )
}

