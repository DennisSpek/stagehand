import type { Metadata } from "next";
import { Header } from '@/components/header';
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from 'clsx';
import { auth } from "@/auth"
import { SessionProvider } from 'next-auth/react';

import Script from 'next/script'

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

  const render = session ? dashboard : authentication;

  return (
    <html lang="en" className='h-full max-h-full w-full max-w-[1920px] bg-offWhite'>
      <body className={clsx(inter.className, 'h-full flex flex-col')}>
        <Script
          src="https://app.lemonsqueezy.com/js/lemon.js"
          strategy="lazyOnload"
        ></Script>
        <SessionProvider session={session}>
          {render}
        </SessionProvider>
      </body>
    </html>
  );
}
