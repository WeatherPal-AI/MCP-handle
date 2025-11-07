import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ScrollReveal } from "@/components/ScrollReveal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MCP Handle - Open Source MCP Orchestration",
  description:
    "Strata router, 60+ first-party MCP servers, multi-channel clients, and MCP Handle Status - one open-source stack for AI agents.",
  metadataBase: new URL("https://github.com/WeatherPal-AI/MCP-handle"),
  openGraph: {
    title: "MCP Handle - Open Source MCP Orchestration",
    description:
      "Progressive MCP routing, server catalog, clients, and observability in one repository.",
    url: "https://github.com/WeatherPal-AI/MCP-handle",
    siteName: "MCP Handle",
    images: [
      {
        url: "/assets/cover.png",
        width: 1200,
        height: 630,
        alt: "MCP Handle platform overview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MCP Handle - Open Source MCP Orchestration",
    description:
      "Progressive MCP routing, server catalog, clients, and observability in one repository.",
    images: ["/assets/cover.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
