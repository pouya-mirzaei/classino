import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xfaxxfgoyfefybbixlmk.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmYXh4ZmdveWZlZnliYml4bG1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYyOTUxMTYsImV4cCI6MjAxMTg3MTExNn0.LbX5xxPPcelmwk6AGkx5KPFDRghrJ3Bh-FW3PIYD--8';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
