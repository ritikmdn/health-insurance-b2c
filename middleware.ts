// middleware.ts

import { NextResponse, type NextRequest } from 'next/server';
// import { createClient } from './utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // if (pathname === '/chat') {
  //   const { supabase } = createClient(request);
  //   const { data } = await supabase.auth.getUser();

  //   if (!data.user) {
  //     const url = request.nextUrl.clone();
  //     url.pathname = '/login';
  //     return NextResponse.redirect(url);
  //   }
  // }

  return NextResponse.next();
}
