"use client";

import { Header } from "@/src/components";
import { cn, queryClient } from "@/src/lib";
import "@/styles/globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Share Eat",
  description: "Share Eat is a platform for sharing food with your community.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen bg-slate-900")}>
        <QueryClientProvider client={queryClient}>
          <main className="container mx-auto px-6">
            <Header />

            <div className="flex w-full flex-col py-5">{children}</div>
          </main>
        </QueryClientProvider>
      </body>
    </html>
  );
}
