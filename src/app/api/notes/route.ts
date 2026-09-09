import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const DEFAULT_NOTES = [
  {
    sender: "Adarsh",
    message: "Meghna, you make every ordinary day feel like a magical movie scene. Thank you for being you! ❤️",
    tag: "Heartfelt",
    imageUrl: "https://ik.imagekit.io/avdarinn/meghna/polaroid1.jpg",
    createdAt: new Date().toISOString(),
    likes: 14,
  },
  {
    sender: "Forever Yours",
    message: "Fourteen days of laughter, inside jokes, and realizing my favorite place is wherever you are. ✨",
    tag: "Romantic",
    imageUrl: "",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    likes: 21,
  },
  {
    sender: "Adarsh",
    message: "Tere chehre ki muskaan hi meri duniya hai. Always keep smiling! 🌸",
    tag: "Shayari",
    imageUrl: "",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    likes: 28,
  },
];

export async function GET() {
  try {
    const db = await getDatabase();
    const collection = db.collection("notes");

    let notes = await collection.find({}).sort({ createdAt: -1 }).limit(50).toArray();

    // If no notes yet in DB, populate initial seeds
    if (notes.length === 0) {
      await collection.insertMany(
        DEFAULT_NOTES.map((n) => ({
          ...n,
          createdAt: new Date(),
        }))
      );
      notes = await collection.find({}).sort({ createdAt: -1 }).toArray();
    }

    return NextResponse.json({
      success: true,
      notes: notes.map((n) => ({
        id: n._id.toString(),
        sender: n.sender,
        message: n.message,
        tag: n.tag || "Love",
        imageUrl: n.imageUrl || "",
        createdAt: n.createdAt,
        likes: n.likes || 0,
      })),
    });
  } catch (error: any) {
    console.error("MongoDB GET notes error:", error);
    // Fallback to default notes if DB connection fails temporarily
    return NextResponse.json({
      success: true,
      fallback: true,
      notes: DEFAULT_NOTES.map((n, i) => ({ id: `fallback-${i}`, ...n })),
      error: error?.message,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sender, message, tag, imageUrl } = body;

    if (!message || message.trim().length === 0) {
      return NextResponse.json({ error: "Message cannot be empty" }, { status: 400 });
    }

    const db = await getDatabase();
    const collection = db.collection("notes");

    const newNote = {
      sender: (sender && sender.trim()) || "Secret Admirer",
      message: message.trim(),
      tag: (tag && tag.trim()) || "Love",
      imageUrl: (imageUrl && imageUrl.trim()) || "",
      createdAt: new Date(),
      likes: 1,
    };

    const result = await collection.insertOne(newNote);

    return NextResponse.json({
      success: true,
      note: {
        id: result.insertedId.toString(),
        ...newNote,
      },
    });
  } catch (error: any) {
    console.error("MongoDB POST notes error:", error);
    return NextResponse.json(
      { error: "Failed to save note to MongoDB Atlas", details: error?.message },
      { status: 500 }
    );
  }
}
