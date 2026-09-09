import { NextResponse } from "next/server";
import { getImageKitAuthParams } from "@/lib/imagekit";

export async function GET() {
  try {
    const authenticationParameters = getImageKitAuthParams();
    return NextResponse.json(authenticationParameters);
  } catch (error: any) {
    console.error("ImageKit auth error:", error);
    return NextResponse.json(
      { error: "Failed to generate ImageKit authentication parameters", details: error?.message },
      { status: 500 }
    );
  }
}
