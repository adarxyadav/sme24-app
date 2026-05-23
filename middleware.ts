import { NextResponse, type NextRequest } from 'next/server'

// Auth guard wired in Feature 04
export function middleware(_request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/portal/:path*'],
}
