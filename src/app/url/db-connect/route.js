import dbConnect from "@/lib/db";
import OriginalUrl from "@/models/OriginalUrl";
import ShortUrl from "@/models/ShortUrl";
import { NextResponse } from "next/server";

function base62Encode(num) {
  let alphabet =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let encoded = "";
  while (num > 0) {
    encoded = alphabet[num % 62] + encoded;
    num = Math.floor(num / 62);
  }
  return encoded;
}
function generateShortUrl() {
  let uniqueNum = Date.now() * 1000; // Use timestamp with milliseconds for more precision
  const encoded = base62Encode(uniqueNum);
  return encoded.substring(0, 7);
}

export async function POST(req) {
  const { url } = await req.json();
  if (!url) {
    return new NextResponse("Invalid data", { status: 400 });
  }
  try {
    console.time("connectDb");
    await dbConnect();
    console.timeEnd("connectDb");
    const originalUrl = await OriginalUrl.create({
      originalUrl: url,
      expiresAt: new Date(Date.now()),
    });
    const data = await ShortUrl.create({
      shortUrl: generateShortUrl(),
      expiresAt: new Date(Date.now()),
      originalUrlId: originalUrl._id,
    });
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return new NextResponse("Connection Failed", { status: 500 });
  }
}
