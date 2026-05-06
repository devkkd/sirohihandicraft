 import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ConditionalHeader from "@/components/ConditionalHeader";
import ConditionalFooter from "@/components/ConditionalFooter";
import { ShopProvider } from "@/context/ShopContext";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sirohi Handicraft",
  description: "Manufacturer and exporter of high-quality wooden and marble home décor and kitchenware, crafted in Rajasthan for global markets.",
  icons: {
    icon: "/favicon.png",
  },
  verification: {
    google: "4Gk4jJ0QcJVd8H1hbp4wqVQMB8v97-rTtaOEo3LObFs",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-F5SWCBB6YB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F5SWCBB6YB');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">
        <ShopProvider>
          <CartProvider>
            <ConditionalHeader />
            {children}
            <ConditionalFooter />
          </CartProvider>
        </ShopProvider>
      </body>
    </html>
  );
}
