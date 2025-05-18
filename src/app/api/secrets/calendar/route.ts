import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        apiKey: process.env.GOOGLE_CALENDAR_API_KEY,
    });
}