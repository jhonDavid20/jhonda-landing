'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform, MotionValue, motionValue } from 'framer-motion'
import { Download, FileText, MessageCircle, X } from 'lucide-react'
import DeskScene from './DeskScene'

const WHATSAPP = `https://wa.me/13463669476?text=${encodeURIComponent('Hola Jhonathan, vi tu oficina y tengo una idea...')}`
const RESUME = '/jhonResume.pdf'

const SERVICES = [
    'Tu página web o landing, lista para vender.',
    'Tu app o plataforma, desde la idea hasta que funciona.',
    'Tu sitio actual, más rápido y más claro.',
]

// Shown when the visitor prefers reduced motion: everything in its final state
const finished = motionValue(1)

export default function DeskRoom() {
    const sectionRef = useRef<HTMLElement>(null)
    const reduce = useReducedMotion()
    const [folderOpen, setFolderOpen] = useState(false)

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
    const progress: MotionValue<number> = reduce ? finished : scrollYProgress

    // Camera: a slow push-in while the visitor walks up to the desk
    const scale = useTransform(progress, [0, 0.6], [0.9, 1.04])
    const cameraY = useTransform(progress, [0, 1], [30, -10])
    const textOpacity = useTransform(progress, [0.1, 0.22], [0, 1])
    const ctaOpacity = useTransform(progress, [0.55, 0.68], [0, 1])
    const barWidth = useTransform(progress, [0, 1], ['0%', '100%'])

    useEffect(() => {
        if (!folderOpen) return
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setFolderOpen(false)
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [folderOpen])

    return (
        <div className="min-h-screen bg-[#0e1118] font-[family-name:var(--font-body)] text-[#ece8e1]">
            {/* Intro */}
            <header className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-4 sm:px-6">
                <p className="text-sm text-[#9aa0ad]">Prototipo · espacio 2 de 6</p>
                <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight sm:text-6xl">
                    Pasa, te muestro mi escritorio.
                </h1>
                <p className="mt-4 max-w-md text-[#9aa0ad]">Baja despacio. La oficina se va armando mientras avanzas.</p>
            </header>

            {/* Pinned room */}
            <section ref={sectionRef} aria-labelledby="desk-title" className="relative h-[260vh] md:h-[320vh]">
                <div className="sticky top-0 flex h-[100dvh] flex-col overflow-hidden md:flex-row md:items-center">
                    <div className="relative z-10 shrink-0 px-4 pt-6 sm:px-6 md:w-[38%] md:pl-[6vw] md:pt-0">
                        <p className="text-xs uppercase tracking-[0.2em] text-[#9aa0ad]">Tu escritorio</p>
                        <h2 id="desk-title" className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold sm:text-5xl">
                            Aquí es donde pasa.
                        </h2>
                        <motion.p style={{ opacity: textOpacity }} className="mt-3 max-w-sm text-sm leading-relaxed text-[#b9bcc4] sm:mt-4 sm:text-base">
                            Más de 6 años construyendo para la web. Trabajo con React, Next.js y TypeScript, y me importa que lo que hago sea rápido y fácil de usar.
                        </motion.p>
                        <ul className="sr-only">
                            {SERVICES.map((s) => (
                                <li key={s}>{s}</li>
                            ))}
                        </ul>
                        <motion.div style={{ opacity: ctaOpacity }} className="mt-4 hidden items-center gap-3 sm:mt-6 md:flex">
                            <a
                                href={RESUME}
                                download
                                className="inline-flex items-center gap-2 rounded-full border border-[#3a4258] px-4 py-2 text-sm transition hover:border-[#FF6B5B] hover:text-white"
                            >
                                <Download size={16} aria-hidden />
                                Descargar CV
                            </a>
                            <span className="text-xs text-[#7d8494]">o toca la carpeta del escritorio</span>
                        </motion.div>
                    </div>

                    <motion.div style={{ scale, y: cameraY }} className="relative min-h-0 flex-1 md:h-full">
                        <DeskScene progress={progress} onFolderOpen={() => setFolderOpen(true)} />
                    </motion.div>

                    {/* Tour progress */}
                    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#1c2130]" aria-hidden>
                        <motion.div style={{ width: barWidth }} className="h-full bg-[#FF6B5B]" />
                    </div>
                </div>
            </section>

            {/* Outro */}
            <footer className="mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center px-4 sm:px-6">
                <p className="text-sm text-[#9aa0ad]">Siguiente parada</p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold sm:text-4xl">El gym →</p>
                <p className="mt-3 max-w-md text-[#9aa0ad]">Todavía en construcción. Este prototipo solo incluye el escritorio.</p>
            </footer>

            {/* Always-available contact */}
            <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#FF6B5B] px-5 py-3 font-semibold text-[#14110f] shadow-lg transition hover:bg-[#ff8a7d]"
            >
                <MessageCircle size={18} aria-hidden />
                Hablemos
            </a>

            {/* Folder dialog */}
            <AnimatePresence>
                {folderOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={(e) => e.target === e.currentTarget && setFolderOpen(false)}
                    >
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="folder-title"
                            initial={{ y: 24, rotate: -2 }}
                            animate={{ y: 0, rotate: 0 }}
                            exit={{ y: 24 }}
                            className="relative w-full max-w-sm rounded-lg bg-[#e0b26a] p-2 shadow-2xl"
                        >
                            <div className="rounded bg-[#f3efe6] p-6 text-[#2a2420]">
                                <button
                                    type="button"
                                    onClick={() => setFolderOpen(false)}
                                    className="absolute right-4 top-4 rounded-full p-1.5 text-[#5a3826] hover:bg-black/5"
                                    aria-label="Cerrar"
                                    autoFocus
                                >
                                    <X size={18} />
                                </button>
                                <p className="font-[family-name:var(--font-hand)] text-2xl text-[#5a3826]">CV</p>
                                <h3 id="folder-title" className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold">
                                    Jhonathan Barrios
                                </h3>
                                <p className="mt-1 text-sm text-[#6b5f55]">Desarrollador de software · Katy, Texas</p>
                                <div className="mt-6 flex flex-col gap-2">
                                    <a href={RESUME} download className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2a2420] px-4 py-2.5 text-sm font-semibold text-[#f3efe6] hover:bg-black">
                                        <Download size={16} aria-hidden />
                                        Descargar PDF
                                    </a>
                                    <a href={RESUME} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#2a2420]/20 px-4 py-2.5 text-sm font-semibold hover:bg-black/5">
                                        <FileText size={16} aria-hidden />
                                        Verlo en el navegador
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
