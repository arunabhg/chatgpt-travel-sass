import React, { useState } from "react";
import { SiRobotframework } from "react-icons/si";
import "./normal.css";
import "./App.css";

function App() {
	const [startFrom, setStartFrom] = useState("");
	const [endTo, setEndTo] = useState("");
	const [enRoute, setEnRoute] = useState("");
	const [startDate, setStartDate] = useState("");
	const [response, setResponse] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch("http://localhost:3001/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ startFrom, endTo, enRoute, startDate })
		})
			.then((res) => res.json())
			.then((data) => setResponse(data.message));
	};

	return (
		<div className="container">
			<aside className="side-menu">
				<h5>Enter Journey Details:</h5>
				<form onSubmit={handleSubmit}>
					<div>
						From:{" "}
						<input
							placeholder="Enter Journey From"
							value={startFrom}
							onChange={(e) => setStartFrom(e.target.value)}
						/>
					</div>
					<br />
					<div>
						To:{" "}
						<input
							placeholder="Enter Journey To"
							value={endTo}
							onChange={(e) => setEndTo(e.target.value)}
						/>
					</div>
					<br />
					<div>
						Via:{" "}
						<input
							placeholder="En-route"
							value={enRoute}
							onChange={(e) => setEnRoute(e.target.value)}
						/>
					</div>
					<br />
					<div>
						Date:{" "}
						<input
							type="date"
							placeholder="Enter Journey Date"
							value={startDate}
							onChange={(e) => setStartDate(e.target.value)}
						/>
					</div>
					<br />
					<button type="submit">Submit</button>
				</form>
			</aside>
			<section className="chat-box">
				<div className="chat-message chatgpt">
					<div className="chat-message-center">
						<div className="avatar chatgpt" style={{ color: "#0da37f" }}>
							<SiRobotframework size={24} />
						</div>
						<div className="message">{response}</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default App;

