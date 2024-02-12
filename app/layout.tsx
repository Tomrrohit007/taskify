import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `% | ${siteConfig.name}`
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/logo.svg",
      href: '/logo.svg'
    }
  ]
}

const LayoutRoot = ({ children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='en' >
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
export default LayoutRoot
