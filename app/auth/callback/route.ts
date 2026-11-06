import { NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseConfig, isSupabaseConfigured } from "@/lib/supabase/config";

type SupabaseCookie = { name: string; value: string; options: CookieOptions };

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/novidades";

  if (!isSupabaseConfigured) {
    return NextResponse.redirect(new URL("/cadastro", origin));
  }

  const cookieStore = await cookies();

  if (code) {
    const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig();
    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (cookiesToSet: SupabaseCookie[]) => {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          },
        },
      },
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) return NextResponse.redirect(new URL("/cadastro?erro=autenticacao", origin));
  }

  return NextResponse.redirect(new URL(next.startsWith("/") ? next : "/novidades", origin));
}
