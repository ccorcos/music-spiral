import { range } from "lodash"

export const diatonic = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
export const major = [0, 2, 4, 5, 7, 9, 11]

export type Scale = number[]

export function mode(scale: Scale, n: number) {
	return range(n).reduce((s) => rotate(s), scale)
}

export function rotate(scale: Scale) {
	const [first, ...rest] = scale
	const offset = [...rest, first + 12]
	const basis = rest[0]
	return offset.map((note) => note - basis)
}

export function triad(scale: Scale) {
	return range(3).map((i) => scale[i * 2])
}

export function seventh(scale: Scale) {
	return range(4).map((i) => scale[i * 2])
}

export const maj7 = seventh(major)

// Just for fun.
export const primes = [
	2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67,
]
