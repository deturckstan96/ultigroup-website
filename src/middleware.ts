import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Sessie verversen (belangrijk voor SSR)
  const { data: { user } } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isPortaalRoute = pathname.startsWith("/portaal");
  const isLoginRoute = pathname === "/portaal/login";

  // Niet ingelogd + portaal route → redirect naar login
  if (isPortaalRoute && !isLoginRoute && !user) {
    return NextResponse.redirect(new URL("/portaal/login", request.url));
  }

  // Al ingelogd + op loginpagina → redirect naar dashboard
  if (isLoginRoute && user) {
    return NextResponse.redirect(new URL("/portaal/dashboard", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/portaal/:path*"],
};
