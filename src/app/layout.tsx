"use client";
import { Inter } from 'next/font/google'
import CustomHeader from '@/components/header'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })
import i18n from "@/i18n"
function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + " min-w-[1280px]"}>
        <CustomHeader></CustomHeader>
        {children}
      </body>
    </html>
  )
} 
export default RootLayout