import './globals.css';
import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import ReactQueryProvider from '@/components/providers/ReactQueryProvider';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-black text-white">
        <ReactQueryProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
