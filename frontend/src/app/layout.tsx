import './globals.css';
import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import SessionProviderWrapper from '@/components/providers/SessionProviderWrapper';
import ReactQueryProvider from '@/components/providers/ReactQueryProvider';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <SessionProviderWrapper>
          <ReactQueryProvider>
            <Navbar />
            <main className="flex-1 container py-6">{children}</main>
          </ReactQueryProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
