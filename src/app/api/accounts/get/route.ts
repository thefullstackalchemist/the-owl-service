import { NextResponse } from "next/server";


// To handle a POST request to /api
export async function GET(request:Request) {
    console.log(request.body);
    
  // Do whatever you want
  return NextResponse.json([], { status: 200 });
}