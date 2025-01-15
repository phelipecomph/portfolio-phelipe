import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://hzphwkqkmqoufckgriil.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6cGh3a3FrbXFvdWZja2dyaWlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0NzQ1MTAsImV4cCI6MjA1MTA1MDUxMH0.6QSWNu4351b9JwS9569WOUkga4-kt00CtwqZO0GSoZM";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);