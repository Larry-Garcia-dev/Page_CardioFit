import React from "react"
import type { Metadata, Viewport } from 'next'
import { Montserrat, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: '--font-montserrat'
});
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'CardioFit Lab | Ingeniería de Precisión para el Rendimiento Humano',
  description: 'Fusionamos cardiología y biomecánica en Ibagué. Análisis biomecánico, Bike Fit de lujo, cardiología especializada y protocolos de recuperación.',
  keywords: ['cardiología', 'biomecánica', 'bike fit', 'fitness', 'Ibagué', 'rendimiento deportivo', 'entrenamiento personalizado'],
  generator: 'v0.app',
  openGraph: {
    title: 'CardioFit Lab | Ingeniería de Precisión para el Rendimiento Humano',
    description: 'Donde la ciencia se encuentra con la fuerza. Fusionamos cardiología y biomecánica en Ibagué.',
    type: 'website',
    locale: 'es_CO',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#00041c',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
