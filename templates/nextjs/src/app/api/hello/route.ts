import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Hello from {{project-name}} API!',
    timestamp: new Date().toISOString(),
    scalixPowered: true
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  return NextResponse.json({
    message: 'Data received successfully',
    data: body,
    timestamp: new Date().toISOString()
  })
}
