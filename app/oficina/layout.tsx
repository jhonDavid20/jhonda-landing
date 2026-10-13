import type { Metadata } from 'next'
import { Bricolage_Grotesque, Caveat, Inter } from 'next/font/google'

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display', display: 'swap' })
const body = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' })
const hand = Caveat({ subsets: ['latin'], variable: '--font-hand', display: 'swap' })

export const metadata: Metadata = {
    title: 'La oficina de Jhonathan — prototipo',
    description: 'Prototipo del recorrido por la oficina de Jhonathan Barrios: el escritorio.',
    robots: { index: false },
}

export default function OficinaLayout({ children }: { children: React.ReactNode }) {
    return <div className={`office-tour ${display.variable} ${body.variable} ${hand.variable}`}>{children}</div>
}
