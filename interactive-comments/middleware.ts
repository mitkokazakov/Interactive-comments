import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuth = !!token;
  const { pathname } = req.nextUrl;

  console.log("Middleware:", token);
  

  const authRoutes = ["/login", "/register"];
  const protectedRoutes = ["/myprofile", "/profiledetails"];

  // If user is logged in and trying to access login/register -> redirect to /
  if (authRoutes.some((route) => pathname.startsWith(route)) && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If user is not logged in and trying to access protected routes -> redirect to /login
  if ( protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
    console.log("Protect:", token);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  //return NextResponse.next();
}

export const config = {
   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
