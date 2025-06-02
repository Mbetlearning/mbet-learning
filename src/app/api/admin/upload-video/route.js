import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

// Enable Node.js runtime for large uploads
export const runtime = "nodejs";

const s3 = new S3Client({
  region: process.env.WASABI_REGION,
  endpoint: process.env.WASABI_ENDPOINT,
  credentials: {
    accessKeyId: process.env.WASABI_ACCESS_KEY,
    secretAccessKey: process.env.WASABI_SECRET_KEY,
  },
});

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file)
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const params = {
    Bucket: process.env.WASABI_BUCKET_NAME,
    Key: file.name,
    Body: buffer,
    ContentType: file.type,
  };

  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);
    return NextResponse.json({ message: "Upload successful!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
