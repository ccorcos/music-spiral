import { range } from "lodash"
import React from "react"
import ReactDOM from "react-dom"
import { maj7 } from "./music"

const viewSize = 400

const chord = [...maj7, 14, 16]

const padding = 2
const numberOfNotes = 6 * 12 + 1
const maxBallRadius = 18
const minBallRadius = 3

// Compute the radius of the ith ball.
function radius(i) {
	return Math.max(maxBallRadius - i / 2.5, minBallRadius)
}

// Distance to the first note.
const d0 = (maxBallRadius * 24) / 2 / Math.PI + padding

// Distance between d0 and d12
const g0 = radius(0) + radius(12) + padding

function distance(i) {
	const offset = i % 12
	const octave = Math.floor(i / 12)

	// Distance to the inner most circle for this offset.
	const inner = d0 + (offset * g0) / 12

	// For each octave, add the radius and the padding.
	let dist = inner
	for (let o = 0; o < octave; o++) {
		dist += radius(o * 12 + offset) + radius((o + 1) * 12 + offset) + padding
	}

	return dist
}

function App() {
	const circles = range(0, numberOfNotes).map((i) => {
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
					transform: `translate(${center + x}px, ${center + y}px)`,
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
