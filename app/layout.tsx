import type { Metadata, Viewport } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  title: "PANchenko | Cinematic Short-Form | Toronto",
  description:
    "Cinematic short-form, music videos, brand storytelling. In-house @hutsyfinancial. Toronto-based videographer & editor. Let's make something timeless.",
  keywords: [
    "videographer",
    "Toronto",
    "music video",
    "cinematic",
    "short-form",
    "editor",
    "rap",
    "trap",
    "cars",
    "brand storytelling",
  ],
  openGraph: {
    title: "PANchenko | Cinematic Short-Form | Toronto",
    description: "Let's make something timeless.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${bebas.variable}`}>
      <body className="font-sans bg-background text-foreground overflow-x-hidden">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
