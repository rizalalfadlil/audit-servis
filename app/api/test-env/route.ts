import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    key: process.env.KOLOSAL_API_KEY ? "Found" : "Not found",
  });
}
