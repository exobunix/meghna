import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://meghna.love"),
  title: "Meghna ❤️ | A Little World Made For You",
  description:
    "A little digital love story made especially for Meghna — filled with memories, little moments, beautiful words and surprises.",
  openGraph: {
    title: "Meghna ❤️ | A Little World Made For You",
    description:
      "A little digital love story made especially for Meghna — filled with memories, little moments, beautiful words and surprises.",
    images: [
      {
        url: "/images/hero/hero_bg.jpg",
        width: 1200,
        height: 630,
        alt: "Meghna - A Little World Made For You",
      },
    ],
    type: "website",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>❤️</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="antialiased min-h-screen bg-[#FFFDFB] text-[#2A121A] selection:bg-[#FFB3C1] selection:text-[#3D0C1A]">
        {children}
      </body>
    </html>
  );
}
