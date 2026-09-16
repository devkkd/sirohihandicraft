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
  title: "Wooden & Marble Products Manufacturer | Sirohi Handicraft",
  description: "Sirohi Handicraft is a trusted wooden & marble products manufacturer and exporter from India, offering handcrafted home décor, kitchenware & bulk orders.",
  icons: {
    icon: "/favicon.png",
  },
  verification: {
    google: "rWpvwpEvF8LxFqFBKeAId4eWh25GId99olLWTkXTzkI",
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
          src="https://www.googletagmanager.com/gtag/js?id=G-YJ120DRE5L"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YJ120DRE5L');
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
