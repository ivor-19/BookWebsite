import dbConnect from "@/lib/dbConnect";

export async function GET() {
  await dbConnect();
  return new Response('Hello Worldsss', {
    status: 200,
  });
}

