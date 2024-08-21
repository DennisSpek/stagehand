import type { Metadata } from "next";
import { Header } from '@/components/header';
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from 'clsx';
import { auth } from "@/auth"
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  dashboard,
  authentication
}: Readonly<{
  children: React.ReactNode;
  dashboard: React.ReactNode;
  authentication: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className='h-full max-h-full w-full max-w-[1920px] bg-offWhite'>
      <body className={clsx(inter.className, 'h-full flex flex-col')}>
        <SessionProvider>
          {
            session ? (
              dashboard
            ) : (
              authentication
            )
          }
        </SessionProvider>
      </body>
    </html>
  );
}