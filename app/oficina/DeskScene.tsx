'use client'

import { useState } from 'react'
import { motion, MotionValue, useMotionValueEvent, useTransform } from 'framer-motion'
import { Box, iso, planeX, planeY, planeZ, pts, Shade } from './iso'

// Room size in world units
const W = 14
const D = 9
const H = 8

const wood: Shade = { top: '#a8744f', left: '#87573a', right: '#6b432c' }
const darkWood: Shade = { top: '#8f6142', left: '#734c33', right: '#5c3c28' }
const monitor: Shade = { top: '#2d313c', left: '#1b1e26', right: '#14161c' }
const keys: Shade = { top: '#3b404d', left: '#2a2e38', right: '#22252e' }
const folder: Shade = { top: '#e0b26a', left: '#c4924d', right: '#a9793b' }
const paper: Shade = { top: '#f3efe6', left: '#d9d4c9', right: '#c7c2b6' }
const chairDark: Shade = { top: '#3d4354', left: '#2f3442', right: '#262a36' }
const metal: Shade = { top: '#4a505e', left: '#363b47', right: '#2b2f39' }
const pot: Shade = { top: '#5a4a3f', left: '#c9b29b', right: '#a8937e' }

const CODE = [
    { n: '1', parts: [['kw', 'function '], ['fn', 'TuProyecto'], ['tx', '() {']] },
    { n: '2', parts: [['kw', '  const '], ['tx', 'idea = '], ['fn', 'escuchar'], ['tx', '(cliente)']] },
    { n: '3', parts: [['kw', '  const '], ['tx', 'plan = '], ['fn', 'entender'], ['tx', '(idea)']] },
    { n: '4', parts: [['kw', '  return '], ['tg', '<Solucion '], ['tx', 'para={plan} '], ['tg', '/>']] },
    { n: '5', parts: [['tx', '}']] },
] as const

const CODE_COLORS = { kw: '#ff8a7d', fn: '#7fd1c7', tx: '#c9d1e0', tg: '#f2c46d' } as const
const TOTAL_CHARS = CODE.reduce((sum, line) => sum + line.parts.reduce((s, [, t]) => s + t.length, 0), 0)

const BOARD_LINES = [
    'Tu página web o landing, lista para vender.',
    'Tu app o plataforma, desde la idea hasta que funciona.',
    'Tu sitio actual, más rápido y más claro.',
]

interface DeskSceneProps {
    progress: MotionValue<number>
    onFolderOpen: () => void
}

export default function DeskScene({ progress, onFolderOpen }: DeskSceneProps) {
    // Code types itself while scrolling
    const typed = useTransform(progress, [0.08, 0.45], [0, TOTAL_CHARS], { clamp: true })
    const [chars, setChars] = useState(0)
    useMotionValueEvent(typed, 'change', (v) => setChars(Math.round(v)))

    // Whiteboard lines are "written" one after another
    const line1 = useTransform(progress, [0.35, 0.52], [0, 250])
    const line2 = useTransform(progress, [0.5, 0.67], [0, 250])
    const line3 = useTransform(progress, [0.65, 0.8], [0, 250])
    const lineWidths = [line1, line2, line3]

    const postIt = useTransform(progress, [0.82, 0.9], [0, 1])
    const lamp = useTransform(progress, [0, 0.08], [0, 1])
    const plantY = useTransform(progress, [0, 1], [70, -50])
    const lampLight = useTransform(lamp, (v) => v * 0.09)

    let remaining = chars

    const [mugX, mugY] = iso(10.75, 2.75, 3.0)

    return (
        <svg
            viewBox="-300 -300 750 720"
            className="h-full w-full"
            role="img"
            aria-label="Ilustración isométrica de la oficina de Jhonathan: un escritorio con dos pantallas, una pizarra con sus servicios, su foto en la pared y una carpeta con su CV."
        >
            <defs>
                {BOARD_LINES.map((_, i) => (
                    <clipPath key={i} id={`board-line-${i}`}>
                        <motion.rect x="0" y={8 + i * 15} height="15" width={lineWidths[i]} />
                    </clipPath>
                ))}
            </defs>

            {/* ── Room shell ───────────────────────────── */}
            <polygon points={pts([0, 0, 0], [W, 0, 0], [W, 0, H], [0, 0, H])} fill="#262c3d" />
            <polygon points={pts([0, 0, 0], [0, D, 0], [0, D, H], [0, 0, H])} fill="#1f2433" />
            <polygon points={pts([0, 0, 0], [W, 0, 0], [W, D, 0], [0, D, 0])} fill="#161a24" />
            {/* floor planks */}
            {Array.from({ length: 8 }, (_, i) => (
                <line
                    key={i}
                    x1={iso(0, i + 1)[0]}
                    y1={iso(0, i + 1)[1]}
                    x2={iso(W, i + 1)[0]}
                    y2={iso(W, i + 1)[1]}
                    stroke="#1c2130"
                    strokeWidth="1"
                />
            ))}
            {/* baseboards */}
            <polygon points={pts([0, 0, 0], [W, 0, 0], [W, 0, 0.25], [0, 0, 0.25])} fill="#1b2030" />
            <polygon points={pts([0, 0, 0], [0, D, 0], [0, D, 0.25], [0, 0, 0.25])} fill="#171b28" />
            {/* wall edges */}
            <polyline points={pts([0, D, H], [0, 0, H], [W, 0, H])} fill="none" stroke="#323a50" strokeWidth="2" />
            <line x1={iso(0, 0, 0)[0]} y1={iso(0, 0, 0)[1]} x2={iso(0, 0, H)[0]} y2={iso(0, 0, H)[1]} stroke="#1a1f2c" strokeWidth="1.5" />

            {/* rug */}
            <polygon points={pts([3.2, 3.9, 0], [9.4, 3.9, 0], [9.4, 8.2, 0], [3.2, 8.2, 0])} fill="#232838" />
            <polygon
                points={pts([3.5, 4.2, 0], [9.1, 4.2, 0], [9.1, 7.9, 0], [3.5, 7.9, 0])}
                fill="none"
                stroke="#3a3346"
                strokeWidth="2"
            />

            {/* ── Door to the next room (gym) ──────────── */}
            <polygon points={pts([12, 0, 0], [13.6, 0, 0], [13.6, 0, 5.4], [12, 0, 5.4])} fill="#0b0d12" />
            <polygon points={pts([12, 0, 0], [13.6, 0, 0], [13.9, 1.6, 0], [12.3, 1.6, 0])} fill="#ffcf8a" opacity="0.06" />
            <polyline
                points={pts([12, 0, 0], [12, 0, 5.4], [13.6, 0, 5.4], [13.6, 0, 0])}
                fill="none"
                stroke="#3a4258"
                strokeWidth="3"
            />
            <g transform={planeY(12.05, 0, 6.3, 24)}>
                <rect x="0" y="0" width="36" height="13" rx="2" fill="#1a1f2c" />
                <text x="18" y="9.4" textAnchor="middle" fontSize="7" fill="#9aa3b5" fontFamily="var(--font-body)">
                    Gym →
                </text>
            </g>

            {/* ── Left wall: photo + post-it ───────────── */}
            <g transform={planeX(0, 7.7, 6.7, 24)}>
                <rect x="-3" y="-3" width="68" height="88" fill="#d8d2c6" />
                <rect x="0" y="0" width="62" height="82" fill="#0e1118" />
                <image href="/jbarrios.jpg" x="0" y="0" width="62" height="82" preserveAspectRatio="xMidYMid slice" />
            </g>
            <motion.g transform={planeX(0, 3.9, 6.1, 24)} style={{ opacity: postIt }}>
                <g transform="rotate(-4 23 23)">
                    <rect x="0" y="0" width="46" height="46" fill="#f5d76e" />
                    <rect x="0" y="0" width="46" height="5" fill="#e8c95a" />
                    <g fontFamily="var(--font-hand)" fontSize="8.5" fill="#3b3320">
                        <text x="5" y="16">Primero</text>
                        <text x="5" y="25">entender,</text>
                        <text x="5" y="34">después</text>
                        <text x="5" y="43">construir.</text>
                    </g>
                </g>
            </motion.g>

            {/* ── Right wall: whiteboard ───────────────── */}
            <g transform={planeY(0.8, 0, 7.9, 24)}>
                <rect x="-3" y="-3" width="256" height="61" rx="2" fill="#b9bec9" />
                <rect x="0" y="0" width="250" height="55" fill="#eceae4" />
                <rect x="190" y="55" width="40" height="3" fill="#9da3af" />
                <rect x="198" y="52.5" width="12" height="2.5" rx="1" fill="#1f3b64" />
                <rect x="213" y="52.5" width="12" height="2.5" rx="1" fill="#FF6B5B" />
                <g fontFamily="var(--font-hand)" fontSize="10.5" aria-hidden="true">
                    {BOARD_LINES.map((line, i) => (
                        <g key={line} clipPath={`url(#board-line-${i})`}>
                            <text x="8" y={19 + i * 15} fill="#1f3b64">
                                <tspan fill="#FF6B5B">→ </tspan>
                                {line}
                            </text>
                        </g>
                    ))}
                </g>
            </g>

            {/* ── Desk ─────────────────────────────────── */}
            <Box x={2.7} y={0.45} z={0} w={0.22} d={0.22} h={2.8} shade={darkWood} />
            <Box x={9.9} y={0.5} z={0} w={1.6} d={2.8} h={2.8} shade={darkWood} />
            {[0.55, 1.45, 2.3].map((z) => (
                <g key={z}>
                    <polygon points={pts([9.95, 3.3, z], [11.45, 3.3, z], [11.45, 3.3, z + 0.02], [9.95, 3.3, z + 0.02])} fill="#4b3121" />
                    <polygon points={pts([10.5, 3.3, z + 0.4], [10.9, 3.3, z + 0.4], [10.9, 3.3, z + 0.48], [10.5, 3.3, z + 0.48])} fill="#d4b48c" />
                </g>
            ))}
            <Box x={2.7} y={3.1} z={0} w={0.22} d={0.22} h={2.8} shade={darkWood} />
            <Box x={2.6} y={0.4} z={2.8} w={9.0} d={3.0} h={0.2} shade={wood} />

            {/* Monitor stands */}
            <Box x={4.55} y={0.6} z={3} w={0.9} d={0.7} h={0.06} shade={metal} />
            <Box x={4.9} y={0.82} z={3.06} w={0.2} d={0.16} h={0.8} shade={metal} />
            <Box x={8.85} y={0.6} z={3} w={0.9} d={0.7} h={0.06} shade={metal} />
            <Box x={9.2} y={0.82} z={3.06} w={0.2} d={0.16} h={0.8} shade={metal} />

            {/* Monitor A: code */}
            <Box x={3.0} y={1.0} z={3.75} w={4.0} d={0.18} h={2.35} shade={monitor} />
            <g transform={planeY(3.14, 1.18, 6.0, 30)}>
                <rect x="0" y="0" width="111.6" height="66" fill="#0d1220" />
                <rect x="0" y="0" width="111.6" height="7" fill="#151b2c" />
                <circle cx="4" cy="3.5" r="1.3" fill="#ff8a7d" />
                <circle cx="8" cy="3.5" r="1.3" fill="#f2c46d" />
                <circle cx="12" cy="3.5" r="1.3" fill="#7fd1c7" />
                <g fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="5.4">
                    {CODE.map((line, i) => {
                        const y = 17 + i * 9
                        return (
                            <text key={line.n} x="4" y={y} xmlSpace="preserve">
                                <tspan fill="#4b5468">{line.n}  </tspan>
                                {line.parts.map(([kind, text], j) => {
                                    const shown = text.slice(0, Math.max(0, remaining))
                                    remaining -= text.length
                                    return (
                                        <tspan key={j} fill={CODE_COLORS[kind]}>
                                            {shown}
                                        </tspan>
                                    )
                                })}
                            </text>
                        )
                    })}
                </g>
            </g>

            {/* Monitor B: a site in progress */}
            <Box x={7.3} y={1.0} z={3.75} w={4.0} d={0.18} h={2.35} shade={monitor} />
            <g transform={planeY(7.44, 1.18, 6.0, 30)}>
                <rect x="0" y="0" width="111.6" height="66" fill="#f4f1ea" />
                <rect x="6" y="5" width="14" height="4" rx="1" fill="#1f2433" />
                <rect x="70" y="6" width="9" height="2" rx="1" fill="#9aa0ad" />
                <rect x="82" y="6" width="9" height="2" rx="1" fill="#9aa0ad" />
                <rect x="94" y="5" width="12" height="4" rx="2" fill="#FF6B5B" />
                <rect x="6" y="17" width="58" height="6" rx="1" fill="#1f2433" />
                <rect x="6" y="26" width="44" height="6" rx="1" fill="#1f2433" />
                <rect x="6" y="36" width="50" height="2" rx="1" fill="#9aa0ad" />
                <rect x="6" y="40" width="40" height="2" rx="1" fill="#9aa0ad" />
                <rect x="6" y="46" width="22" height="6" rx="3" fill="#FF6B5B" />
                <rect x="70" y="17" width="36" height="35" rx="2" fill="#d9d3c6" />
                <rect x="76" y="34" width="24" height="12" rx="1" fill="#c3bba9" />
                <rect x="0" y="58" width="111.6" height="8" fill="#e6e1d6" />
            </g>

            {/* Desk lamp */}
            <Box x={2.8} y={2.45} z={3.0} w={0.6} d={0.6} h={0.1} shade={metal} />
            <line x1={iso(3.1, 2.75, 3.1)[0]} y1={iso(3.1, 2.75, 3.1)[1]} x2={iso(3.1, 2.75, 5.35)[0]} y2={iso(3.1, 2.75, 5.35)[1]} stroke="#4a505e" strokeWidth="2.5" />
            <line x1={iso(3.1, 2.75, 5.35)[0]} y1={iso(3.1, 2.75, 5.35)[1]} x2={iso(3.9, 2.45, 5.55)[0]} y2={iso(3.9, 2.45, 5.55)[1]} stroke="#4a505e" strokeWidth="2.5" />
            <motion.polygon
                points={pts([3.75, 2.25, 5.3], [4.45, 2.75, 5.3], [6.4, 3.35, 3.0], [3.3, 3.35, 3.0], [3.3, 1.7, 3.0], [5.6, 1.7, 3.0])}
                fill="#ffd9a0"
                style={{ opacity: lampLight }}
            />
            <Box x={3.7} y={2.2} z={5.3} w={0.75} d={0.55} h={0.35} shade={{ top: '#FF6B5B', left: '#d9564a', right: '#b8473d' }} />

            {/* Keyboard + mouse */}
            <Box x={4.1} y={2.05} z={3.0} w={2.9} d={0.8} h={0.1} shade={keys} />
            <g transform={planeZ(4.2, 2.13, 3.1, 20)}>
                {Array.from({ length: 4 }, (_, r) =>
                    Array.from({ length: 13 }, (_, c) => (
                        <rect key={`${r}-${c}`} x={1 + c * 4.2} y={1 + r * 3.4} width="3.4" height="2.6" rx="0.5" fill="#4a5060" />
                    ))
                )}
            </g>
            <Box x={7.4} y={2.25} z={3.0} w={0.35} d={0.55} h={0.1} shade={keys} />

            {/* CV folder (interactive) */}
            <motion.g
                role="button"
                tabIndex={0}
                aria-label="Abrir la carpeta con mi CV"
                className="cursor-pointer outline-none [&:focus-visible>g]:opacity-100"
                whileHover={{ y: -6 }}
                whileFocus={{ y: -6 }}
                onClick={onFolderOpen}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        onFolderOpen()
                    }
                }}
            >
                <Box x={8.3} y={2.0} z={3.0} w={1.55} d={1.15} h={0.04} shade={paper} />
                <Box x={8.2} y={1.95} z={3.04} w={1.6} d={1.2} h={0.06} shade={folder} />
                <g transform={planeZ(8.35, 2.1, 3.1, 30)}>
                    <rect x="0" y="0" width="16" height="8" rx="1" fill="#f3efe6" />
                    <text x="8" y="6" textAnchor="middle" fontSize="5.5" fontWeight="700" fill="#5a3826" fontFamily="var(--font-body)">
                        CV
                    </text>
                </g>
                <g opacity="0">
                    <polygon points={pts([8.1, 1.85, 3.0], [9.9, 1.85, 3.0], [9.9, 3.25, 3.0], [8.1, 3.25, 3.0])} fill="none" stroke="#FF6B5B" strokeWidth="2" />
                </g>
            </motion.g>

            {/* Coffee mug + steam */}
            <g>
                <ellipse cx={mugX} cy={mugY} rx="9" ry="4.5" fill="#000" opacity="0.25" />
                <rect x={mugX - 8} y={mugY - 18} width="16" height="18" fill="#FF6B5B" />
                <ellipse cx={mugX} cy={mugY} rx="8" ry="4" fill="#d9564a" />
                <rect x={mugX - 8} y={mugY - 18} width="8" height="18" fill="#e3604f" />
                <ellipse cx={mugX} cy={mugY - 18} rx="8" ry="4" fill="#3a2418" />
                <path d={`M${mugX + 8} ${mugY - 14} q7 1 6 7 q-1 5 -6 4`} fill="none" stroke="#d9564a" strokeWidth="2.5" />
                <g className="steam" fill="none" stroke="#c9d1e0" strokeWidth="1.5" strokeLinecap="round" opacity="0.5">
                    <path d={`M${mugX - 3} ${mugY - 24} q-4 -6 0 -12 q4 -6 0 -12`} />
                    <path d={`M${mugX + 3} ${mugY - 26} q-4 -6 0 -12 q4 -6 0 -12`} />
                </g>
            </g>

            {/* ── Chair ────────────────────────────────── */}
            <Box x={5.0} y={4.7} z={0} w={1.0} d={1.0} h={0.15} shade={metal} />
            <Box x={5.4} y={5.1} z={0.15} w={0.2} d={0.2} h={1.65} shade={metal} />
            <Box x={4.6} y={4.3} z={1.8} w={1.8} d={1.8} h={0.3} shade={chairDark} />
            <Box x={5.4} y={5.95} z={2.1} w={0.2} d={0.15} h={0.5} shade={metal} />
            <Box x={4.6} y={5.9} z={2.5} w={1.8} d={0.25} h={1.7} shade={chairDark} />

            {/* ── Foreground plant (moves faster: parallax) ── */}
            <motion.g style={{ y: plantY }}>
                <Box x={12.5} y={6.6} z={0} w={1.2} d={1.2} h={1.4} shade={pot} />
                {(
                    [
                        [-28, -95, -12],
                        [-8, -120, 4],
                        [14, -100, 18],
                        [-20, -70, -30],
                        [22, -70, 34],
                        [0, -85, 0],
                    ] as const
                ).map(([dx, dy, rot], i) => {
                    const [px, py] = iso(13.1, 7.2, 1.4)
                    return (
                        <ellipse
                            key={i}
                            cx={px + dx}
                            cy={py + dy / 2}
                            rx="9"
                            ry="34"
                            transform={`rotate(${rot} ${px + dx} ${py + dy / 2 + 30})`}
                            fill={i % 2 ? '#2f6b4f' : '#3d8562'}
                        />
                    )
                })}
            </motion.g>
        </svg>
    )
}
