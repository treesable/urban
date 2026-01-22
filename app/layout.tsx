import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientLayout from './components/ClientLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tree Impact',
  description: 'Transform how you track, measure, and communicate trees impact. Stay tuned for our full web platform.',
  openGraph: {
    title: 'Tree Impact',
    description: 'Transform how you track, measure, and communicate trees impact. Stay tuned for our full web platform.',
    url: 'https://treeimpact.treesable.com',
    siteName: 'Tree Impact',
    images: [
      {
        url: 'https://treeimpact.treesable.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tree Impact - Transform how you track, measure, and communicate trees impact',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tree Impact',
    description: 'Transform how you track, measure, and communicate trees impact. Stay tuned for our full web platform.',
    images: ['https://treeimpact.treesable.com/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
} 