import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import "./globals.css";
import { APP_CONFIG } from "@/lib/config/shared";

// Primary typeface per the official Brand Guidelines v1.01 — BDO Grotesk
// (open source, SIL OFL license, files bundled in public/fonts/bdo-grotesk).
// Guide specifies Bold / Demibold / Medium / Regular weights.
const displayFont = localFont({
  variable: "--font-display",
  src: [
    {
      path: "../public/fonts/bdo-grotesk/BDOGrotesk-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/bdo-grotesk/BDOGrotesk-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/bdo-grotesk/BDOGrotesk-DemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/bdo-grotesk/BDOGrotesk-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${APP_CONFIG.name} — ${APP_CONFIG.tagline}`,
  description: APP_CONFIG.tagline,
  icons: {
    icon: "/logo/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={displayFont.variable} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
