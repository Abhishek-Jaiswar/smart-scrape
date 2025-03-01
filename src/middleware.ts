import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define explicitly public routes
const isPublicRoute = createRouteMatcher([
  "/", // Landing page is public
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/workflows/(.*)*",
  "/api/webhook/stripe"
]);

export default clerkMiddleware(async (auth, req) => {
  // Protect all routes except explicitly public ones
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Exclude Next.js internals & static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

    // Protect only specific sections
    "/dashboard(.*)", // Protect the dashboard
    "/forum(.*)", // (Optional) Protect the forum if needed
    "/api/trpc/(.*)", // Protect all tRPC API routes
  ],
};
