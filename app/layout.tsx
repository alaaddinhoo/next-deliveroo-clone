import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";
import { Heart } from "lucide-react";
import Link from "next/link";
// import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Deliveroo Clone",
  description:
    "A multi-vendor food delivery app clone using Nextjs and Firebase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-[100vh] flex flex-col ">
        <div className="grow">{children}</div>
        <div className="bg-gradient-to-r from-[#00ccbb] h-[10vh] w-full flex items-center justify-center text-white font-normal">
          <span>Made with&nbsp;</span>
          <span className="inline-block">
            <Heart className="fill-rose-400" color="rose-400" size={24} />
          </span>
          <span>&nbsp;by&nbsp;</span>
          <span className="inline-block">
            <Link
              className="underline font-semibold"
              href="https://codewithalaa.netlify.app/"
            >
              Alaaeldin
            </Link>
          </span>
        </div>
      </body>
    </html>
  );
}
