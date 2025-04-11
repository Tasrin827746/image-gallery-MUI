import arcjet, { detectBot, request } from "@/libs/Arcjet";
import { Env } from "@/libs/Env";
import "@/styles/global.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  icons: [
    {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
};

// Improve security with Arcjet
const aj = arcjet.withRule(
  detectBot({
    mode: "LIVE",
    // Block all bots except the following
    allow: [
      // See https://docs.arcjet.com/bot-protection/identifying-bots
      "CATEGORY:SEARCH_ENGINE", // Allow search engines
      "CATEGORY:PREVIEW", // Allow preview links to show OG images
      "CATEGORY:MONITOR", // Allow uptime monitoring services
    ],
  })
);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Verify the request with Arcjet
  if (Env.ARCJET_KEY) {
    const req = await request();
    const decision = await aj.protect(req);

    // These errors are handled by the global error boundary, but you could also
    // redirect or show a custom error page
    if (decision.isDenied()) {
      if (decision.reason.isBot()) {
        throw new Error("No bots allowed");
      }

      throw new Error("Access denied");
    }
  }

  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
