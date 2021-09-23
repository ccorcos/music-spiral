import { range } from "lodash"

export type Scale = number[]

export const diatonic = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
export const major = [0, 2, 4, 5, 7, 9, 11]

export function mode(scale: Scale, n: number) {
	return range(1, n).reduce((s) => rotate(s), scale)
}

export function rotate(scale: Scale) {
	const [first, ...rest] = scale
	const offset = [...rest, first + 12]
	const basis = rest[0]
	return offset.map((note) => note - basis)
}

export const aeolian = mode(major, 6)

export function triad(scale: Scale) {
	return range(3).map((i) => scale[i * 2])
}

export const maj = triad(major)
export const min = triad(aeolian)

export function seventh(scale: Scale) {
	return range(4).map((i) => scale[i * 2])
}

export const maj7 = seventh(major)
export const min7 = seventh(aeolian)

export function octave(scale: Scale, o: number) {
	return scale.map((n) => n + 12 * (o - 1))
}
