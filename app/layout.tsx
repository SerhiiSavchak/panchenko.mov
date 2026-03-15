import type { Metadata, Viewport } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import { GraffitiLoader } from "@/components/graffiti-loader";
import { Providers } from "@/components/providers";
import { LoaderDismissedProvider } from "@/lib/loader-dismissed-context";
import "lenis/dist/lenis.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  adjustFontFallback: true,
  display: "swap",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  adjustFontFallback: true,
  preload: true,
  display: "swap",
});

export const metadata: Metadata = {
  title: "PANchenko | Cinematic Short-Form | Worldwide",
  description:
    "Cinematic short-form, music videos, brand storytelling. Based worldwide. Brand & product storytelling. Let's create something that hits different.",
  keywords: [
    "videographer",
    "cinematic",
    "short-form",
    "editor",
    "rap",
    "trap",
    "cars",
    "brand storytelling",
  ],
  openGraph: {
    title: "PANchenko | Cinematic Short-Form | Worldwide",
    description: "Brand & product storytelling. Cinematic short-form.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${bebas.variable} relative`}>
      <head>
        <link rel="preconnect" href="https://assets.mixkit.co" />
        <link rel="preconnect" href="https://videos.pexels.com" />
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="preload" as="video" href="https://assets.mixkit.co/videos/46422/46422-720.mp4" />
        <link rel="preload" as="image" href="https://assets.mixkit.co/videos/46422/46422-thumb-720-0.jpg" />
        <style
          dangerouslySetInnerHTML={{
            __html: `html{background:#050505}body{background:#050505;color:#f0f0f0}`,
          }}
        />
      </head>
      <body className="relative font-sans bg-background text-foreground overflow-x-hidden">
        <LoaderDismissedProvider>
          <Providers>
            <GraffitiLoader />
            {children}
          </Providers>
        </LoaderDismissedProvider>
      </body>
    </html>
  );
}
