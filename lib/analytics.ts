import { supabase } from './supabase'
import { getSessionId } from './session'

export type EventName = 
  | 'page_view'
  | 'cta_click_start_form'
  | 'form_started'
  | 'form_submitted'
  | 'generate_plan_clicked'
  | 'waitlist_email_submitted'

export interface EventMetadata {
  character_count?: number
  [key: string]: unknown
}

export async function trackEvent(
  eventName: EventName,
  metadata?: EventMetadata
): Promise<void> {
  if (typeof window === 'undefined') {
    return
  }

  try {
    const sessionId = getSessionId()
    const device = window.innerWidth < 768 ? 'mobile' : 'desktop'
    const referrer = document.referrer || 'direct'

    await supabase.from('events').insert({
      event_name: eventName,
      session_id: sessionId,
      timestamp: new Date().toISOString(),
      device,
      referrer,
      metadata: metadata || {},
    })
  } catch (error) {
    console.error('Analytics tracking error:', error)
  }
}

