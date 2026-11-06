import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseConfig, isSupabaseConfigured } from "@/lib/supabase/config";

const googleAccountsOrigin = "https://accounts.google.com";

function redirectToCadastro(origin: string) {
  return NextResponse.redirect(new URL("/cadastro?erro=google", origin));
}

export async function GET(request: Request) {
  const { origin } = new URL(request.url);

  if (!isSupabaseConfigured) return redirectToCadastro(origin);

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback?next=/novidades`,
        skipBrowserRedirect: true,
      },
    });

    if (error || !data.url) return redirectToCadastro(origin);

    const authorizeUrl = new URL(data.url);
    const { supabaseUrl } = getSupabaseConfig();
    if (authorizeUrl.origin !== new URL(supabaseUrl).origin) return redirectToCadastro(origin);

    const providerResponse = await fetch(authorizeUrl, {
      cache: "no-store",
      redirect: "manual",
    });
    const location = providerResponse.headers.get("location");

    if (!location) return redirectToCadastro(origin);

    const googleUrl = new URL(location);
    if (googleUrl.origin !== googleAccountsOrigin) return redirectToCadastro(origin);

    return NextResponse.redirect(googleUrl);
  } catch (error) {
    console.error("Não foi possível iniciar o login com Google.", error);
    return redirectToCadastro(origin);
  }
}
