import { range } from "lodash"
import React from "react"
import ReactDOM from "react-dom"

const viewSize = 400

const chord = [
	// 2,
	// 3,
	5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67,
]

const padding = 0
const numberOfNotes = 6 * 12 + 1
const maxBallRadius = 18
const minBallRadius = 3

// Compute the radius of the ith ball.
function radius(i) {
	return Math.max(maxBallRadius - i / 2.5, minBallRadius)
}

// Distance to the first note.
const d0 = ((maxBallRadius * 24) / 2 / Math.PI) * 0.8

// Distance between d0 and d12
const g0 = radius(0) + radius(12) + padding

// Tell Sean: error in my previous code is that g0 is the only g that matters.

function distance(i) {
	const offset = i % 12
	const octave = Math.floor(i / 12)

	// Distance to the inner most circle for this offset.
	const inner = d0 + (offset * g0) / 12

	let dist = inner
	for (let j = 0; j < octave; j++) {
		dist += radius(j * 12 + offset) + radius((j + 1) * 12 + offset) + padding
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
