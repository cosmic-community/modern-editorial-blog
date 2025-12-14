import './globals.css';
import type { Metadata } from 'next';
import { Inter, Merriweather } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CosmicBadge from '@/components/CosmicBadge';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const merriweather = Merriweather({ 
  weight: ['300', '400', '700', '900'], 
  subsets: ['latin'], 
  variable: '--font-serif' 
});

export const metadata: Metadata = {
  title: 'Modern Editorial Blog',
  description: 'A responsive blog application built with Cosmic CMS and Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="/dashboard-console-capture.js" async />
      </head>
      <body className={`${inter.variable} ${merriweather.variable} min-h-screen flex flex-col font-sans`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CosmicBadge bucketSlug={process.env.COSMIC_BUCKET_SLUG || 'swimstretch-production'} />
      </body>
    </html>
  );
}