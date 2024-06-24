import type { Metadata } from "next";
import "./globals.css";

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
      <body>
        <div className="md:hidden bg-primary w-screen h-screen text-white text-center grid place-content-center text-3xl ">
          <div className="max-w-[60vw]">
            Only desktop version available right now.
          </div>
        </div>

        <div className="hidden md:flex min-h-[100vh] flex-col">
          <div className="grow">{children}</div>
          <div className="bg-gradient-to-r text-xl from-[#00ccbb] h-[10vh] w-full flex items-center justify-center text-white font-semibold">
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
        </div>
      </body>
    </html>
  );
}
