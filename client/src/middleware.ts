import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  //const refreshToken = req.cookies.get("refresh_token")?.value;
  const { pathname } = req.nextUrl;

  // Redirect logged-in users away from /login
  if (accessToken && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // If access token exists, continue
  if (accessToken) return NextResponse.next();

  // Try to refresh the token if refreshToken exists
  /*if (refreshToken) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/refresh`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (!res.ok) throw new Error("Refresh token failed");

      const data = await res.json();  
      const newAccessToken = data.accessToken;

      // Set new access_token cookie
      const response = NextResponse.next();
      response.cookies.set("access_token", newAccessToken, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60, // 1h
      });
      return response;
    } catch {
      // Refresh failed → redirect to login
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }*/
}

export const config = {
  matcher: ["/profile/:path*", "/login"], // paths à protéger
};
