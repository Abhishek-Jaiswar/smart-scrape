import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/workflows/(.*)*",
  "/api/webhook/stripe",
  "/dashboard-light.png",
  "/dashboard-dark.png",
]);

export default clerkMiddleware(async (auth, req) => {
  // Skip authentication for public routes & images
  if (
    !isPublicRoute(req) ||
    req.nextUrl.pathname.startsWith("/public") ||
    req.nextUrl.pathname.startsWith("/_next")
  ) {
    return;
  }

  await auth.protect();
});

export const config = {
  matcher: [
    "/((?!_next|public|images|uploads|api/webhook/stripe|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/dashboard(.*)",
    "/forum(.*)",
    "/api/trpc/(.*)",
  ],
};
