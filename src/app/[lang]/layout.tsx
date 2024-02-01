// "use client";
import { Inter } from 'next/font/google'
import {NextIntlClientProvider, useMessages, useLocale } from 'next-intl';
import CustomHeader from '@/components/header'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })
import { Metadata } from 'next/types'
export const metadata: Metadata = {
  title: "广州东松科技有限公司",
  keywords: "激光位移传感器, 激光轮廓传感器, 青波光电,3D扫描,3D线激光,3D",
  description: "青波光电专注激光轮廓传感器、激光位移传感器，拥有多年的工业现场实践经验。激光轮廓传感器型号齐全，分辨率高，测量精度高，可用于产品尺寸检测，3D轮廓扫描，焊缝跟踪等应用。激光位移传感器可以非接触、精确测量距离，最高微米级精度、接口丰富可以替代国外同类产品。"
}
 
function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const message = useMessages()
    const lang = useLocale()
  return (
    <html lang={lang}>
      <body className={inter.className + " min-w-[1280px]"}>
      <NextIntlClientProvider messages={message}>
        <CustomHeader lang={lang}></CustomHeader>
        {children}
      </NextIntlClientProvider>
      </body>
    </html>
  )
}
export default RootLayout