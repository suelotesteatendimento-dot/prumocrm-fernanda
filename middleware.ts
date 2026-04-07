import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/lib/supabase/database.types";

const protectedRoutes = ["/dashboard", "/leads", "/pipeline", "/perfil"];
const authRoutes = ["/login"];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers
    }
  });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        }
      }
    }
  );

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (!user && isProtectedRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    return NextResponse.redirect(redirectUrl);
  }

  if (user && (isAuthRoute || pathname === "/")) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/dashboard";
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*", "/leads/:path*", "/pipeline/:path*", "/perfil/:path*"]
};
