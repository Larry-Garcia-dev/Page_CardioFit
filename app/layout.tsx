import React from "react"
import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'CardioFit Lab | Ingeniería de Precisión para el Rendimiento Humano',
  description: 'Fusionamos cardiología y biomecánica en Ibagué. Análisis biomecánico, Bike Fit de lujo, cardiología especializada y protocolos de recuperación.',
  keywords: ['cardiología', 'biomecánica', 'bike fit', 'fitness', 'Ibagué', 'rendimiento deportivo', 'entrenamiento personalizado'],
  generator: 'Larry Garcia',
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "CardioFit Lab",
  "image": [
    "https://cardiofit-lab.vercel.app/images/cardiofit-logo.png",
    "https://cardiofit-lab.vercel.app/icon.svg"
  ],
  "@id": "https://cardiofit-lab.vercel.app",
  "url": "https://cardiofit-lab.vercel.app",
  "telephone": "+573155774777",
  "description": "Ingeniería de Precisión para el Rendimiento Humano. Fusionamos cardiología, biomecánica y protocolos de recuperación en Ibagué.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. Ambalá Carrera 14 #44-63 Local 2",
    "addressLocality": "Ibagué",
    "addressRegion": "Tolima",
    "postalCode": "730001",
    "addressCountry": "CO"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 4.4446,
    "longitude": -75.2429
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "06:00",
    "closes": "20:00"
  },
  "priceRange": "$$",
  "department": [
    {
      "@type": "Physician",
      "name": "Dra. Lorena González",
      "jobTitle": "Directora Médica",
      "description": "Especialista en Cardiología Deportiva y evaluación cardiovascular para atletas.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Av. Ambalá Carrera 14 #44-63 Local 2",
        "addressLocality": "Ibagué",
        "addressRegion": "Tolima",
        "postalCode": "730001",
        "addressCountry": "CO"
      }
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios de Rendimiento y Salud",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Bike Fit de Lujo",
          "description": "Bike fit estático y dinámico 3D con electromiografía."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Consulta de Cardiología",
          "description": "Consulta especializada, Ecocardiograma y Holter."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Análisis Biomecánico de Carrera",
          "description": "Análisis de running y marcha."
        }
      }
    ]
  },
  "sameAs": [
    "https://www.instagram.com/cardiofitlab",
    "https://www.facebook.com/cardiofitlab"
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased" style={{ '--font-montserrat': '"Montserrat", sans-serif', '--font-geist-mono': '"Geist Mono", monospace' } as React.CSSProperties}>
        <Script
          id="schema-org-local-business"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}