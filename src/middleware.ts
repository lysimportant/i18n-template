import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
 
const nextIntlMiddleware = createMiddleware({
  locales: ['zh', 'en', 'ru'],
  defaultLocale: 'zh'
});
 
export default function middleware(req: NextRequest): NextResponse {
  return nextIntlMiddleware(req)
}
export const config = {
  matcher: ["/", "/(zh|en|ru)/:path*"]
}