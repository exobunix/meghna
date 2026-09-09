import { NextRequest, NextResponse } from "next/server";
import { getImageKit } from "@/lib/imagekit";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const fileName = (formData.get("fileName") as string) || `meghna_memory_${Date.now()}`;
    const folder = (formData.get("folder") as string) || "/meghna";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ik = getImageKit();
    const uploadResponse = await ik.upload({
      file: buffer,
      fileName: fileName,
      folder: folder,
      useUniqueFileName: true,
    });

    return NextResponse.json({
      success: true,
      url: uploadResponse.url,
      fileId: uploadResponse.fileId,
      thumbnailUrl: uploadResponse.thumbnailUrl,
      name: uploadResponse.name,
    });
  } catch (error: any) {
    console.error("ImageKit upload error:", error);
    return NextResponse.json(
      { error: "Upload failed", details: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
