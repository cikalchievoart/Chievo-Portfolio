import React from "react";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "../components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cikal Chievo Arment — IT & Multimedia Enthusiast",
  description:
    "Portfolio of Cikal Chievo Arment — Software Developer, 3D Environment Designer, and Systems Engineer crafting interactive worlds, hardware integrations, and modern web applications.",
  keywords: [
    "Cikal Chievo Arment",
    "Software Developer",
    "3D Environment Designer",
    "Unity",
    "Next.js",
    "React",
    "TypeScript",
    "VR Experience",
    "Batam",
    "Indonesia",
  ],
  authors: [{ name: "Cikal Chievo Arment" }],
  icons: {
    icon: "/images/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#07090e" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="min-h-[100dvh] font-sans antialiased selection:bg-cyan-500/25 selection:text-cyan-700 dark:selection:text-cyan-200 overflow-x-clip">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
