import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: any }) {
  try {
    const body = await req.json();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    };
    const res = await fetch(process.env.AUTH_API + "/Auth/Register", options);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
