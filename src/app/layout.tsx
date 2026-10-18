import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const garamond = localFont({
  src: "../../public/fonts/eb-garamond-400.ttf",
  variable: "--font-display",
  weight: "400",
  display: "swap",
});

const alegreya = localFont({
  src: [
    { path: "../../public/fonts/alegreya-sans-400.ttf", weight: "400" },
    { path: "../../public/fonts/alegreya-sans-500.ttf", weight: "500" },
  ],
  variable: "--font-body",
  display: "swap",
});

const cormorant = localFont({
  src: "../../public/fonts/cormorant-600.ttf",
  variable: "--font-brand",
  weight: "600",
  display: "swap",
});

export const metadata: Metadata = {
  title: "K.T. Writz — Official Author Website",
  description:
    "Enter the worlds of K.T. Writz. Discover Skradzione Szepty, Królowa Wiedźm, and notes from behind the pages.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${garamond.variable} ${alegreya.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
