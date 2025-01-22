import { NextResponse } from "next/server";


// To handle a POST request to /api
export async function POST(request:Request) {
    const body = await request.json()
    console.log(body);
    
    
  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

