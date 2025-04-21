import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const request = await req.formData();
    const file = request.get("file");
    var name = request.get("name") as string;
    name = name.split(" ").join("_");
    const folderName = request.get("folderName");
    if (!fs.existsSync(`public/${folderName}`)) {
      fs.mkdirSync(`public/${folderName}`);
    }
    if (file instanceof Blob && typeof name === "string") {
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      const filePath = path.join(`public/${folderName}`, name + `.jpg`);
      fs.writeFileSync(filePath, fileBuffer);
      const imagePath = `/${folderName}/${name}.jpg`;

      return NextResponse.json({ success: true, path: imagePath });
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid file or filename" },
        { status: 400 }
      );
    }
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Unknown error occurred during upload." },
      { status: 500 }
    );
  }
}
