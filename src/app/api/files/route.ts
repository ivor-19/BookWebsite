import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/utils/config"
import dbConnect from "@/lib/dbConnect";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const uploadData = await pinata.upload.file(file)
    const url = await pinata.gateways.createSignedURL({
     	cid: uploadData.cid,
     	expires: 3600,
  	});
    return NextResponse.json(url, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
