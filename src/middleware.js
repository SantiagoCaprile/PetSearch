// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname.startsWith("/createPet") &&
      req.nextauth.token.role !== "rescuer"
    ) {
      console.log("no es rescuer, no puede crear mascotas");
      return NextResponse.rewrite(new URL("/denied", req.url));
    }
    if (
      req.nextUrl.pathname.startsWith("/adoptionform/") &&
      req.nextauth.token.role !== "user"
    ) {
      console.log("no es user, no puede adoptar mascotas");
      return NextResponse.rewrite(new URL("/denied", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log("authorized", token);
        return !!token;
      },
    },
  }
);

// Applies next-auth only to matching routes - can be regex
export const config = {
  matcher: ["/profile", "/createPet", "/adoptionform/:petId/:path*"]
};
