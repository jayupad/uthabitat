import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        execSheetId: process.env.EXEC_SHEET_ID
    });
}