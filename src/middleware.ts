import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseReqResClient } from "./lib/supabase/server-client";
import createIntlMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

const routingMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = await createSupabaseReqResClient(request, response);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // protects the "/account" route and its sub-routes
  if (!user && request.nextUrl.pathname.startsWith("/app")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return routingMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|slice-simulator|.*\\..*).*)"],
};
