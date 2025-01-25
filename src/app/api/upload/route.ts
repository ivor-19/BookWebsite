import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null; // Type assertion

    if (!file) {
      return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + file.name.replaceAll(" ", "_");

    const filePath = path.join(process.cwd(), "public/uploads", filename);

    // Ensure that the uploads directory exists (you might need to handle directory creation if not present)
    await writeFile(filePath, buffer);

    return NextResponse.json(
      { message: "File uploaded successfully", filename },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error occurred while uploading the file: ", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
};
