export interface Color {
	r: number,
	g: number,
	b: number,
	a: number
}

export function rgb (r: number, g: number, b: number): Color {
	return { r, g, b, a: 1 }
}

export function rgba (r: number, g: number, b: number, a: number): Color {
	return { r, g, b, a }
}

export function css (c: Color): string {
	return `#${c.r.toString(16)}${c.g.toString(16)}${c.b.toString(16)}${Math.round(c.a * 255).toString(16)}`
}

export function hexColor (hex: string): Color {
	if (hex.charAt(0) === '#') hex = hex.slice(1)

	switch (hex.length) {
		// #012 === #001122
		case 3: return {
			r: parseInt(hex.charAt(0) + hex.charAt(0), 16),
			g: parseInt(hex.charAt(1) + hex.charAt(1), 16),
			b: parseInt(hex.charAt(2) + hex.charAt(2), 16),
			a: 1
		}

		// #0123 === #00112233
		case 4: return {
			r: parseInt(hex.charAt(0) + hex.charAt(0), 16),
			g: parseInt(hex.charAt(1) + hex.charAt(1), 16),
			b: parseInt(hex.charAt(2) + hex.charAt(2), 16),
			a: parseInt(hex.charAt(3) + hex.charAt(3), 16) / 255,
		}

		// #001122
		case 6: return {
			r: parseInt(hex.charAt(0) + hex.charAt(1), 16),
			g: parseInt(hex.charAt(2) + hex.charAt(3), 16),
			b: parseInt(hex.charAt(4) + hex.charAt(5), 16),
			a: 1,
		}

		// #00112233
		case 8: return {
			r: parseInt(hex.charAt(0) + hex.charAt(1), 16),
			g: parseInt(hex.charAt(2) + hex.charAt(3), 16),
			b: parseInt(hex.charAt(4) + hex.charAt(5), 16),
			a: parseInt(hex.charAt(6) + hex.charAt(7), 16) / 255,
		}

		default: throw "Invalid color"
	}
}

export function alpha (c: Color, a: number): Color {
	return { ...c, a }
}

export const defaultColors: Color[] = [
	rgb(255, 206, 86),  // Yellow
	rgb(53, 162, 234),  // Blue
	rgb(75, 192, 192),  // Turquoise
	rgb(254, 113, 144), // Pink
	rgb(155, 206, 86),  // Green
]
