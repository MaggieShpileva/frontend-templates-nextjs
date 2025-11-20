import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import './globals.scss';

import { Footer, Header } from '@/components/Feature';
import clsx from 'clsx';

export const metadata: Metadata = {
  title: 'Next.js Template',
  description: 'Шаблон проекта на Next.js',
};

const poppinsFont = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={clsx(poppinsFont.variable)}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
