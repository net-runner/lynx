import { NextRequest, NextResponse } from 'next/server';

//Cookie auth middleware for all pages
export function middleware(req: NextRequest) {
  const access_token = req.cookies['access_token'];
  const refresh_token = req.cookies['refresh_token'];

  NextResponse.json({
    hasAuthCookies: access_token || refresh_token ? true : false,
  });
}
