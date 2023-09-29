import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";
// This requires user to sign in to see any page or call any API route

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/db/getGeneration",
    "/gen/:id",
    "/api/generate",
    "/sign-in",
    "/sign-up",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
