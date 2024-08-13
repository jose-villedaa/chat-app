import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ConvexClientProvider from 'providers/ConvexClientProvider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/components';
import { Toaster } from 'sonner';

const inter = Inter(
  {
    subsets: ['latin'],
  },
);

type Props = Readonly<{
  children: React.ReactNode;
}>;

export const metadata: Metadata = {
  title: 'Chatly',
  description: 'Chatly is a chat application built with Next.js and Convex.',
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConvexClientProvider>
            <TooltipProvider>
              {children}
            </TooltipProvider>
            <Toaster richColors />
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
