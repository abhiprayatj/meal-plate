"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { trackEvent } from "@/lib/analytics"
import { supabase } from "@/lib/supabase"
import { getSessionId } from "@/lib/session"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim() && !isSubmitting) {
      setIsSubmitting(true)
      try {
        const sessionId = getSessionId()
        
        // Save email to Supabase
        const { error } = await supabase
          .from('waitlist_emails')
          .insert({
            email: email.trim().toLowerCase(),
            session_id: sessionId,
          })

        if (error) {
          // If it's a duplicate email error, still show success
          // but log other errors
          if (error.code !== '23505') { // 23505 is unique violation
            console.error('Error saving email:', error)
          }
        }

        trackEvent("waitlist_email_submitted")
        setSubmitted(true)
      } catch (error) {
        console.error('Error submitting email:', error)
        // Still show success to user even if save fails
        setSubmitted(true)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  if (submitted) {
    return (
      <div className="text-center">
        <p className="text-lg text-muted-foreground">
          Thank you! We&apos;ll be in touch soon.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      />
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Joining..." : "Join waitlist"}
      </Button>
    </form>
  )
}

