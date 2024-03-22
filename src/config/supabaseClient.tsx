import { createClient } from '@supabase/supabase-js'

let supabaseUrl: string;
let supabaseKey: string;

if (process.env.REACT_APP_SUPABASE_URL && process.env.REACT_APP_ANON_KEY){
  supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  supabaseKey = process.env.REACT_APP_ANON_KEY;
} else {
  throw new Error("Env Variables are not set")
}

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
