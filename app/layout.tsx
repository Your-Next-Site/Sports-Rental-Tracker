import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Banner from "@/components/ui/banner/banner";
import Providers from "@/components/Providers";
import { ClerkProvider, OrganizationSwitcher, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sports Rental Tracker",
  description: "A for staff to track rental duration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Providers>
          
            <Banner />
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
