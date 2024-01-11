import './globals.css'
import type { Metadata } from 'next'
import { Comfortaa } from 'next/font/google'

const comfortaa = Comfortaa({subsets: ["latin"], weight: ['300', '400', '500', '600','700']});


export const metadata: Metadata = {
  title: 'Magic Puzzle',
  description: 'Generated by neporazen',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={comfortaa.className}>{children}</body>
    </html>
  )
}