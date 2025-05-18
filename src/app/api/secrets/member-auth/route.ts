import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  if (password !== process.env.MEMBERS_PASSWORD) {
    return NextResponse.json({ valid: false }, { status: 401 })
  }

  const response = NextResponse.json({ valid: true })
  response.cookies.set('member_auth', 'true', {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  return response
}
