import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        dataSheetId: process.env.OTHER_DATA_SHEET_ID
    });
}