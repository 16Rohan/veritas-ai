-- Create the 'scans' table
-- Since the user table is "user-profiles", we need to reference that instead of auth.users
-- Note: Requires "user-profiles" table to exist first.

CREATE TABLE public.scans (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public."user-profiles"(id) ON DELETE CASCADE,
    phishing_id TEXT,
    scan_type TEXT NOT NULL,
    risk_level INTEGER CHECK (risk_level IN (1, 2, 3)), -- 1=safe, 2=suspicious, 3=high
    confidence FLOAT NOT NULL,
    threat_type TEXT NOT NULL,
    scan_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add indexes for performance ( dashboard queries filter by user_id and order by scan_date)
CREATE INDEX idx_scans_user_id ON public.scans(user_id);
CREATE INDEX idx_scans_scan_date ON public.scans(scan_date);

-- Enable Row Level Security (RLS)
ALTER TABLE public.scans ENABLE ROW LEVEL SECURITY;

-- Create policies

-- 1. Policy to allow users to view their own scans
-- We join with user-profiles to verify ownership, or simply check user_id if we trust the jwt 'sub' claim matches user-profiles.id
-- Since our custom auth puts user_id in the token payload as 'id', and we trust our backend to verify it...
-- BUT wait, for RLS to work with Supabase Client, we need `auth.uid()` to match. 
-- If we are using custom JWTs not signed by Supabase Auth (or if we are, but user isn't in auth.users), `auth.uid()` might not work as expected in SQL.
-- However, since this app seems to use a backend proxy for all DB ops (`supabaseAdmin`), RLS is bypassed by the service role key anyway.
-- The RLS policies below are for completeness if client-side access is ever enabled.

-- Since we are using `supabaseAdmin` (service role) in the backend, these policies are not strictly enforced for backend calls.
-- But successful creation implies valid schema.

-- For completeness (assuming future client access):
-- We need a way to link the requesting user to the `user_id` column.
-- If using custom auth, `auth.uid()` might be null or mismatch. 
-- Let's just create a permissive policy for now for the service role to definitely work without warnings, 
-- or rely on the fact that service role bypasses RLS.

-- Policy: Allow all operations for service role (implicit, but good to know)
-- Policy: Allow users to view their own scans based on user_id match (requires auth.uid() to be populated correctly)

CREATE POLICY "Users can view their own scans" ON public.scans
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own scans" ON public.scans
    FOR INSERT WITH CHECK (auth.uid() = user_id);
