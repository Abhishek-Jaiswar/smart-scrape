import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import AppProviders from "@/components/providers/AppProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SmartScrape",
  description: "Scrape the world wide web effortlessly",
};

const appearance = {
  elements: {
    formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-none",
    card: "bg-background shadow-md",
    headerTitle: "text-foreground font-bold",
    headerSubtitle: "text-muted-foreground",
    socialButtonsBlockButton: "bg-muted text-muted-foreground hover:bg-muted/90",
    formFieldLabel: "text-foreground",
    formFieldInput: "bg-background border border-input text-foreground",
    footerActionLink: "text-primary hover:text-primary/90",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={appearance}
      afterSignOutUrl={"/sign-in"}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <AppProviders>
            {children}
          </AppProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
