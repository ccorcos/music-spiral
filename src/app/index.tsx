import { range } from "lodash"
import React from "react"
import ReactDOM from "react-dom"

const viewSize = 400

const chord = [
	// 2,
	// 3,
	5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67,
]

function App() {
	const pad = 2
	const notes = 6 * 12 + 1
	const maxBall = 18
	const minBall = 3
	const minDist = ((maxBall * 24) / 2 / Math.PI) * 0.8

	function radius(i) {
		// return Math.max(maxBall - i/3, minBall)
		return Math.max(maxBall - i / 2.5, minBall)
	}

	function innerDist(i) {
		// 0 < i < 12
		return minDist + (radius(0) + radius(12) + pad) / 12
	}

	function distance(i) {
		if (i === 0) return minDist + radius(0)

		if (i < 12) {
			const doctave = radius(i - 1) + radius(i + 11)
			return distance(i - 1) + doctave / 12
		}

		return distance(i - 12) + radius(i - 12) + radius(i) + pad
	}

	const circles = range(0, notes).map((i) => {
		const ballRadius = radius(i)
		const dist = distance(i)

		const angle = (-1 * i * Math.PI) / 6 - Math.PI
		const x = dist * Math.sin(angle)
		const y = dist * Math.cos(angle)

		const center = viewSize / 2 - ballRadius

		return (
			<div
				key={i}
				style={{
					position: "absolute",
					height: 2 * ballRadius,
					width: 2 * ballRadius,
					background: chord.includes(i) ? "#FFBCBC" : "#BCBCBC",
					left: center + x,
					top: center + y,
					borderRadius: "100%",
				}}
			></div>
		)
	})

	return (
		<div
			style={{
				position: "relative",
				margin: "2em",
				height: viewSize,
				width: viewSize,
				border: "1px solid black",
			}}
		>
			{circles}
		</div>
	)
}

// Render the app.
const root = document.createElement("div")
document.body.appendChild(root)

ReactDOM.render(<App />, root)
