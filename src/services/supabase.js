import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://fgaiufdkufonrcaudzlm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnYWl1ZmRrdWZvbnJjYXVkemxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg0OTc4NzYsImV4cCI6MjA0NDA3Mzg3Nn0.769M5tsyEtBh-eH8wl7LDs5v-E7zenY7roY-6J_WEwc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
