import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        faqSheetId: process.env.FAQ_SHEET_ID
    });
}