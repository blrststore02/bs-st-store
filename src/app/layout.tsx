"use client";
import { ToastContainer } from '@/components/bsToast'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter!.className} min-h-screen bg-white w-full`}>
        <ToastContainer />
        {children}</body>
    </html>
  )
}
