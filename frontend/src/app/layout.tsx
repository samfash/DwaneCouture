import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dwane Couture",
  keywords: [
    "Tailoring",
    "Fashion",
    "Clothing",
    "Custom Clothing",
    "Bespoke Tailoring",
    "Alterations",
    "Dwane Couture",
    "Tailor",
    "Fashion Design",
    "Custom Tailoring",
    "Bespoke Fashion",
    "Alteration Services",
    "Personalized Clothing",
    "Luxury Tailoring",
    "Fashion Alterations",
    "Tailor Services",
    "Custom Fit",
    "Fashion Tailoring",
    "Bespoke Clothing",
    "Tailoring Services",
    "Dwane Couture Tailoring",
    "Dwane Couture Fashion",
    "Dwane Couture Alterations",
    "Dwane Couture Custom Clothing",
    "Dwane Couture Bespoke Tailoring",
    "Dwane Couture Alterations Services",
    "Dwane Couture Personalized Clothing",
    "Dwane Couture Luxury Tailoring",
    "Dwane Couture Fashion Alterations",
    "Dwane Couture Tailor Services",
    "Dwane Couture Custom Fit",
    "Dwane Couture Fashion Tailoring",
    "Dwane Couture Bespoke Clothing",
  ],
  authors: [
    {
      name: "Dwane Couture",
      url: "https://dwanecouture.com",
    },
  ],
  creator: "SamFash",
  description: "Dwane Couture - Tailoring and Fashion Design",
  openGraph: {
    title: "Dwane Couture",
    description: "Dwane Couture - Tailoring and Fashion Design",
    url: "https://dwanecouture.com",
    siteName: "Dwane Couture",
    images: [
      {
        url: "https://dwanecouture.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dwane Couture - Tailoring and Fashion Design",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dwane Couture",
    description: "Dwane Couture - Tailoring and Fashion Design",
    creator: "@dwanecouture",
    images: ["https://dwanecouture.com/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#000000"
      },
    ],
  }, // <-- Close the icons object here
  appleWebApp: {
    capable: true,
    title: "Dwane Couture",
    statusBarStyle: "default",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    noimageindex: false,
    noarchive: false,
    nosnippet: false,
  },
  verification: {
    google: "google-site-verification=your-google-verification-code",
    yandex: "yandex-verification: your-yandex-verification-code",
    me: "me-verification: your-me-verification-code"
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
    url: false,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
        <Navbar />
         <main className="flex-1 gap-[32px] sm:items-start">{children}</main>
        <Footer />
        </div>
      </body>
    </html>
  );
}   
