-- Create events table for analytics tracking
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT NOT NULL,
  session_id TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  device TEXT,
  referrer TEXT,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create index on session_id for faster queries
CREATE INDEX IF NOT EXISTS idx_events_session_id ON events(session_id);

-- Create index on event_name for filtering
CREATE INDEX IF NOT EXISTS idx_events_event_name ON events(event_name);

-- Create index on timestamp for time-based queries
CREATE INDEX IF NOT EXISTS idx_events_timestamp ON events(timestamp);

-- Enable Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (for analytics)
CREATE POLICY "Allow anonymous inserts" ON events
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to read their own events
-- (Optional: if you want to add user tracking later)
-- CREATE POLICY "Users can read own events" ON events
--   FOR SELECT
--   TO authenticated
--   USING (auth.uid()::text = session_id);

-- Create waitlist_emails table for storing email addresses
CREATE TABLE IF NOT EXISTS waitlist_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  session_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(email)
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_emails_email ON waitlist_emails(email);

-- Create index on created_at for time-based queries
CREATE INDEX IF NOT EXISTS idx_waitlist_emails_created_at ON waitlist_emails(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist_emails ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts
CREATE POLICY "Allow anonymous inserts waitlist" ON waitlist_emails
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create form_responses table for storing user form submissions
CREATE TABLE IF NOT EXISTS form_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  response_text TEXT NOT NULL,
  session_id TEXT NOT NULL,
  character_count INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on session_id for faster queries
CREATE INDEX IF NOT EXISTS idx_form_responses_session_id ON form_responses(session_id);

-- Create index on created_at for time-based queries
CREATE INDEX IF NOT EXISTS idx_form_responses_created_at ON form_responses(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE form_responses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts
CREATE POLICY "Allow anonymous inserts form_responses" ON form_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

