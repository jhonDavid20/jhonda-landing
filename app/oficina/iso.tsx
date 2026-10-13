// Minimal isometric projection helpers.
// World units: x runs down-right, y runs down-left, z runs up.

export const UNIT = 34
const C = UNIT * Math.cos(Math.PI / 6)
const S = UNIT / 2

type Vec3 = [number, number, number]

export function iso(x: number, y: number, z = 0): [number, number] {
    return [(x - y) * C, (x + y) * S - z * UNIT]
}

export function pts(...points: Vec3[]) {
    return points
        .map(([x, y, z]) => iso(x, y, z).map((n) => n.toFixed(2)).join(','))
        .join(' ')
}

// Transforms that map a flat 2D drawing (k local units per world unit) onto a surface.
const m = (a: number, b: number, c: number, d: number, [e, f]: [number, number]) =>
    `matrix(${a} ${b} ${c} ${d} ${e.toFixed(2)} ${f.toFixed(2)})`

/** Surface facing +y (right-hand wall, monitor screens). Local X → +x, local Y → down. */
export const planeY = (x: number, y: number, z: number, k: number) => m(C / k, S / k, 0, UNIT / k, iso(x, y, z))

/** Surface facing +x (left-hand wall). Local X → −y, local Y → down. */
export const planeX = (x: number, y: number, z: number, k: number) => m(C / k, -S / k, 0, UNIT / k, iso(x, y, z))

/** Horizontal surface (desk top, floor). Local X → +x, local Y → +y. */
export const planeZ = (x: number, y: number, z: number, k: number) => m(C / k, S / k, -C / k, S / k, iso(x, y, z))

export interface Shade {
    top: string
    left: string // face toward +y
    right: string // face toward +x
}

interface BoxProps {
    x: number
    y: number
    z: number
    w: number
    d: number
    h: number
    shade: Shade
}

export function Box({ x, y, z, w, d, h, shade }: BoxProps) {
    const X = x + w
    const Y = y + d
    const Z = z + h
    return (
        <g>
            <polygon points={pts([x, Y, z], [X, Y, z], [X, Y, Z], [x, Y, Z])} fill={shade.left} />
            <polygon points={pts([X, y, z], [X, Y, z], [X, Y, Z], [X, y, Z])} fill={shade.right} />
            <polygon points={pts([x, y, Z], [X, y, Z], [X, Y, Z], [x, Y, Z])} fill={shade.top} />
        </g>
    )
}
