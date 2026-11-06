const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export function getSupabaseConfig(): { supabaseUrl: string; supabaseAnonKey: string } {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("As variáveis de ambiente do Supabase não foram configuradas.");
  }

  return { supabaseUrl, supabaseAnonKey };
}
