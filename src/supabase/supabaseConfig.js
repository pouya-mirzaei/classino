import { createClient } from '@supabase/supabase-js';

const supabaseURL = process.env.REACT_APP_SUPABASE_URL;
const supabaseKEY = process.env.REACT_APP_SUPABASE_KEY;

export const supabase = createClient(supabaseURL, supabaseKEY);
