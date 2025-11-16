import type { Metadata } from 'next'
import './global.css'
import { LanguageProvider } from './contexts/LanguageContext'
import Header from './components/Header'
import ScrollIndicator from './components/ScrollIndicator'

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
            <Header />
            <ScrollIndicator />
            {children}
        </LanguageProvider>
        </body>
        </html>
    )
}