import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define explicitly public routes
const isPublicRoute = createRouteMatcher([
  "/", // Landing page is public
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/workflows/(.*)*",
  "/api/webhook/stripe",
  "/dashboard-light.png",
  "/dashboard-dark.png",
]);

export default clerkMiddleware(async (auth, req) => {
  // Protect all routes except explicitly public ones
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|public|images|uploads|api/webhook/stripe|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

    // Protect specific sections
    "/dashboard(.*)", // Protect dashboard pages
    "/forum(.*)", // (Optional) Protect forum pages
    "/api/trpc/(.*)", // Protect tRPC API routes
  ],
};
