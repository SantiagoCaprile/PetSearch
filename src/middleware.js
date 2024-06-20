// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname.startsWith("/createPet") &&
      req.nextauth.token.role !== "rescuer"
    ) {
      return NextResponse.rewrite(new URL("/denied", req.url));
    }
    if (
      req.nextUrl.pathname.startsWith("/mypets") &&
      req.nextauth.token.role !== "rescuer"
    ) {
      return NextResponse.rewrite(new URL("/denied", req.url));
    }
    if (
      req.nextUrl.pathname.startsWith("/adoptionform/") &&
      req.nextauth.token.role !== "user"
    ) {
      return NextResponse.rewrite(new URL("/denied", req.url));
    }
    if (
      req.nextUrl.pathname.startsWith("/adminDashboard") &&
      req.nextauth.token.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/denied", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
  }
);

// Applies next-auth only to matching routes - can be regex
export const config = {
  matcher: ["/createPet", "/adoptionform/:petId/:path*", "/helpMap/create", "/mypets/:path*", "/adminDashboard/:path*"]
};
