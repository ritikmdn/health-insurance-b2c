// pages/_middleware.ts
import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from './utils/supabase/middleware';
import { User } from '@supabase/supabase-js';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply middleware logic to the '/chat' route
  if (pathname === '/chat') {
    const { supabase, response } = createClient(request);

    try {
      const { data } = await supabase.auth.getUser();

      // Redirect to login if user is not authenticated
      if (!data.user) {
        const url = request.nextUrl.clone();
        url.pathname = '/login'; // Redirect to the login page
        return NextResponse.redirect(url);
      }

      // Proceed to the chat page if user is authenticated
      return response;
    } catch (e) {
      // Handle any errors (e.g., Supabase client not created)
      return NextResponse.next({
        request: {
          headers: request.headers,
        },
      });
    }
  }

  // For all other routes, do nothing and continue with the normal flow
  return NextResponse.next();
}
