// import { createClient } from "@supabase/supabase-js";

// export const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL,
//   import.meta.env.VITE_SUPABASE_ANON_KEY
// );

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://rvqophrajudbampgojdh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2cW9waHJhanVkYmFtcGdvamRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwMzY0MDAsImV4cCI6MjA4NTYxMjQwMH0.JBg2zvxgYaXSZLaRePkCseRRhy57EDfcCAAXl8GkaDE"
);
