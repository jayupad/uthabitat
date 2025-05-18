import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const authCookie = req.cookies.get('member_auth')

  return NextResponse.json({
    authenticated: authCookie?.value === 'true'
  })
}
