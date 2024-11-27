import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env(REACT_APP_SUPABASE_URL);
// const supabaseAnonKey = process.env(REACT_APP_SUPABASE_ANON_KEY);
const supabaseUrl = "https://chquhyusmyvqovkfigaz.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNocXVoeXVzbXl2cW92a2ZpZ2F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExNzQwMjEsImV4cCI6MjA0Njc1MDAyMX0.J2vd5lvLTig3W-WDZfGaI5zaWTpvJn_SXosl90L269U";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
