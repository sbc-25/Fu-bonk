import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BONK VS Platform - The Ultimate Football Fan Experience",
  description:
    "Join the BONK VS Platform for epic football moments, NFT trading, social features, and amateur football leagues. Earn BONK tokens while enjoying the beautiful game!",
  keywords: "football, soccer, NFT, BONK, cryptocurrency, social, amateur football, Bundesliga, BVB, Bayern Munich",
  authors: [{ name: "BONK VS Platform Team" }],
  creator: "BONK VS Platform",
  publisher: "BONK VS Platform",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://bonkvs.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BONK VS Platform - The Ultimate Football Fan Experience",
    description:
      "Join the BONK VS Platform for epic football moments, NFT trading, social features, and amateur football leagues.",
    url: "https://bonkvs.com",
    siteName: "BONK VS Platform",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BONK VS Platform",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BONK VS Platform - The Ultimate Football Fan Experience",
    description:
      "Join the BONK VS Platform for epic football moments, NFT trading, social features, and amateur football leagues.",
    images: ["/og-image.jpg"],
    creator: "@bonkvsplatform",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#f97316" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="BONK VS" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#f97316" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
