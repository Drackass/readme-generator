import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThumbnailContextProvider from "@/context/thumbnail-context";
import { Toaster } from "@/components/ui/toaster";
import ThemeContextProvider from "@/context/theme-context";
import ThemeSwitch from "@/components/theme-switch";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} relative min-h-screen`}>
        <div className="fixed z-50 top-0 w-full h-16 bg-gradient-to-b from-background to-transparent pointer-events-none "></div>
        <ThemeContextProvider>
          <ThumbnailContextProvider>
            {children}
            <ThemeSwitch />
          </ThumbnailContextProvider>
        </ThemeContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
