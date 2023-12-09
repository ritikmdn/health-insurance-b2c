// middleware.ts

import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from './utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply middleware logic for the /chat page
  if (pathname === '/chat') {
    const { supabase, response } = createClient(request);

    try {
      const { data } = await supabase.auth.getUser();

      // If user is authenticated, allow access to /chat
      if (data.user) {
        return response;
      }

      // If user is not authenticated, redirect to /login
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    } catch (e) {
      // Handle any errors that occur during authentication check
      return NextResponse.next({
        request: {
          headers: request.headers,
        },
      });
    }
  }

  // For all other routes, do nothing and proceed as normal
  return NextResponse.next();
}