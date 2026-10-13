import type { Metadata } from 'next'
import './global.css'
import { LanguageProvider } from './contexts/LanguageContext'

export const metadata: Metadata = {
    title: 'Jhonathan Barrios',
    description: 'Full-stack Developer & Co-founder of ClutchDevs',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>
        <LanguageProvider>
            {children}
        </LanguageProvider>
        </body>
        </html>
    )
}
