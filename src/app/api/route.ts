import { NextResponse } from "next/server";

/**
 * Health-check endpoint.
 * Returns a simple JSON response to verify the API is running.
 */
export async function GET() {
  return NextResponse.json({ status: "ok", timestamp: Date.now() });
}