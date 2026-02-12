import { createClient } from "@supabase/supabase-js";

// Supabase project base URL – derived from the `ref` in your keys.
const DEFAULT_SUPABASE_URL = "https://qjmirmenxsmxlqtcihkh.supabase.co";

// Prefer environment variables in production, but fall back to the
// provided keys so the backend works out-of-the-box for this project.
const supabaseUrl = process.env.SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey =
  process.env.SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqbWlybWVueHNteGxxdGNpaGtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4NTU2MTEsImV4cCI6MjA4NjQzMTYxMX0.ohMCmSXRXIB_0TZ6QJTqxE_j7EM84nGxwHeY3agZqKE";
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqbWlybWVueHNteGxxdGNpaGtoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDg1NTYxMSwiZXhwIjoyMDg2NDMxNjExfQ.n3NN_MkFpADrvd-aDPkynIJFf3WVWwdcqo02XlIKs04";

// Public client (for user operations)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client (for bypassing RLS and rate limits)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
