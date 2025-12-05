"use client"

import { useState, useRef, useEffect } from "react"
import { trackEvent } from "@/lib/analytics"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"
import { getSessionId } from "@/lib/session"

interface InputFormProps {
  onSubmit: (value: string) => void
}

const hintChips = ["Save money", "High protein", "Quick meals", "Healthier eating", "Less waste", "Simple recipes", "Dietary needs", "Taste preferences"]

export function InputForm({ onSubmit }: InputFormProps) {
  const [value, setValue] = useState("")
  const [hasStarted, setHasStarted] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [value])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!hasStarted && e.key.length === 1) {
      setHasStarted(true)
      trackEvent("form_started")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim().length > 0) {
      try {
        const sessionId = getSessionId()
        
        // Save response to Supabase
        const { error } = await supabase
          .from('form_responses')
          .insert({
            response_text: value.trim(),
            session_id: sessionId,
            character_count: value.trim().length,
          })

        if (error) {
          console.error('Error saving form response:', error)
        }

        trackEvent("form_submitted", { character_count: value.length })
        onSubmit(value)
      } catch (error) {
        console.error('Error submitting form:', error)
        // Still proceed with the form submission even if save fails
        trackEvent("form_submitted", { character_count: value.length })
        onSubmit(value)
      }
    }
  }

  const handleChipClick = (chip: string) => {
    if (!hasStarted) {
      setHasStarted(true)
      trackEvent("form_started")
    }
    const newValue = value ? `${value}, ${chip.toLowerCase()}` : chip.toLowerCase()
    setValue(newValue)
    textareaRef.current?.focus()
  }

  const canSubmit = value.trim().length > 0

  return (
    <section id="input-form" className="bg-emerald-50 py-6 md:py-8 -mx-4 md:-mx-6 px-4 md:px-6">
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-sm p-6 md:p-8 space-y-4">
        <div className="text-center">
          <h2 className="text-lg md:text-xl font-bold text-slate-900">
            What do you want this week?
          </h2>
          <p className="text-xs md:text-sm text-slate-600 text-center mt-1 leading-relaxed">
            Budget, health, time, taste. Share what matters. The more detail, the better.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Input Goals and Constraints Here"
              className={cn(
                "w-full rounded-2xl border border-slate-200 p-4 text-sm text-slate-800 leading-relaxed",
                "bg-white resize-none overflow-hidden",
                "focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-300",
                "placeholder:text-slate-400"
              )}
              rows={3}
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {hintChips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleChipClick(chip)}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200 transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full rounded-full bg-amber-300 text-emerald-950 py-3 font-semibold text-sm md:text-base mt-2 hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Generate Plan
          </button>

        </form>
      </div>
    </section>
  )
}

