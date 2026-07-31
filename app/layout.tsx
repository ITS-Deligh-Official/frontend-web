import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "ITS Deligh — Verified Employability Platform",
  description:
    "Learn. Assess. Get Verified. Get Hired. ITS Deligh connects learning, assessment, certification and talent discovery in one trusted ecosystem.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
