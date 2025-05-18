import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const endpoint = process.env.FORMSPREE_ENDPOINT
  if (!endpoint) {
    return NextResponse.json({ error: "Formspree endpoint not set" }, { status: 500 })
  }

  const response = await fetch(`https://formspree.io/f/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(body)
  })

  const data = await response.json()
  return NextResponse.json(data, { status: response.status })
}
