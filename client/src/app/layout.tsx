"use client";

import { Header } from "@/components";
import { cn } from "@/lib";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen bg-slate-900")}>
        <main className="container mx-auto px-6">
          <Providers>
            <Header />
            <div className="flex w-full flex-col py-5">{children}</div>
          </Providers>
        </main>
      </body>
    </html>
  );
}
