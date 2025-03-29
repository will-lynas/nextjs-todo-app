import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export function middleware(request: NextRequest) {
  const cookie_name = "session";
  const cookie = request.cookies.get(cookie_name);

  if (cookie) {
    console.log(`found uuid: ${cookie.value}`);
    return NextResponse.next();
  }

  const response = NextResponse.next();
  const uuid = uuidv4();
  console.log(`setting uuid: ${uuid}`);
  response.cookies.set(cookie_name, uuid);
  return response;
}

export const config = {
  matcher: "/",
};
