import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

// Primary typeface per the official Brand Guidelines v1.01 — BDO Grotesk
// (open source, SIL OFL license, files bundled in public/fonts/bdo-grotesk).
// Guide specifies Bold / Demibold / Medium / Regular weights.
const displayFont = localFont({
  variable: "--font-display",
  src: [
    { path: "../public/fonts/bdo-grotesk/BDOGrotesk-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/bdo-grotesk/BDOGrotesk-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/bdo-grotesk/BDOGrotesk-DemiBold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/bdo-grotesk/BDOGrotesk-Bold.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
});

// Secondary typeface per the brand guide — Inter, for information-dense UI.
const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Deligh Campus — Built for Smarter Education",
  description:
    "Deligh Campus is ITS Deligh's soft-skills learning platform — courses, assessments, and career readiness in one place.",
  icons: {
    icon: "/logo/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
