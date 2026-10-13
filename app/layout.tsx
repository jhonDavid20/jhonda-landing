import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './global.css'
import { LanguageProvider } from './contexts/LanguageContext'
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', display: 'swap' })

const description =
    'Frontend developer & co-founder of ClutchDevs. I design and build fast, user-focused websites and web apps with React, Next.js and TypeScript.'

export const metadata: Metadata = {
    metadataBase: new URL('https://jhonda.dev'),
    title: 'Jhonathan Barrios — Frontend Developer',
    description,
    keywords: ['Frontend Developer', 'React', 'Next.js', 'Web Developer', 'Freelance', 'Katy Texas', 'ClutchDevs'],
    authors: [{ name: 'Jhonathan Barrios', url: 'https://jhonda.dev' }],
    alternates: { canonical: '/' },
    openGraph: {
        title: 'Jhonathan Barrios — Frontend Developer',
        description,
        url: 'https://jhonda.dev',
        siteName: 'Jhonathan Barrios',
        images: [{ url: '/jbarrios.jpg', width: 300, height: 400, alt: 'Jhonathan Barrios' }],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Jhonathan Barrios — Frontend Developer',
        description,
        images: ['/jbarrios.jpg'],
    },
}

export const viewport: Viewport = {
    themeColor: '#09090b',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <body className="font-sans">
        <LanguageProvider>
            <Navbar />
            {children}
        </LanguageProvider>
        </body>
        </html>
    )
}
