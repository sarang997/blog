import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import { siteUrl } from "../lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteTitle = "Sarang Bhatnagar | Data Engineering, Statistics and ML";
const siteDescription =
  "Data engineer with experience in pipelines, backend services and distributed systems. MSc in Statistics and Data Science from the University of Bath, with research in audio classification.";
export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: {
    default: siteTitle,
    template: "%s — Sarang Bhatnagar",
  },
  description: siteDescription,
  authors: [{ name: "Sarang Bhatnagar" }],
  creator: "Sarang Bhatnagar",
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    siteName: "Sarang Bhatnagar",
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var theme=localStorage.getItem("theme")||"light";document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
