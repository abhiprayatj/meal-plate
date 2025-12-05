"use client"

import { useRouter } from "next/navigation"
import { trackEvent } from "@/lib/analytics"

export function Confirmation() {
  const router = useRouter()

  const handleGenerateClick = () => {
    trackEvent("generate_plan_clicked")
    router.push("/waitlist")
  }

  return (
    <section className="bg-emerald-50 py-6 md:py-8 -mx-4 md:-mx-6 px-4 md:px-6">
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-sm p-6 md:p-8 text-center space-y-4">
        <p className="text-sm md:text-base text-slate-900 leading-relaxed">
          Got it. Building your plan now.
        </p>
        <button
          onClick={handleGenerateClick}
          className="w-full rounded-full bg-amber-300 text-emerald-950 py-3 font-semibold text-sm md:text-base hover:bg-amber-200 transition-colors"
        >
          Show My Plan
        </button>
      </div>
    </section>
  )
}

