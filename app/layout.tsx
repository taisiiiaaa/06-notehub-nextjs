import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'A simple and efficient application for managing personal notes',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='en' className={inter.variable}>
      <body>
        <TanStackProvider>
          <Header />

          <main>{children}</main>

          <Footer />

          <div id='modal-root' />
        </TanStackProvider>
      </body>
    </html>
  )
}
