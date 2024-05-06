"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const LivePage = () => {
	const [contracts, setContracts] = useState([]);

	useEffect(() => {
		const socket = io("wss://fawss.pi42.com", {
			path: "/socket.io",
			transports: ["websocket"],
		});

		socket.on("connect", () => {
			console.log("Connected to Pi42 WebSocket");
		});

		socket.on("tickerData", (data) => {
			console.log("Received ticker data:", data);
			setContracts(data); // Update contracts state with live pricing data
		});

		return () => {
			socket.disconnect();
			console.log("Disconnected from Pi42 WebSocket");
		};
	}, []);

	return (
		<div>
			<h1>Crypto Contracts Live Pricing</h1>
			<table>
				<thead>
					<tr>
						<th>Symbol</th>
						<th>Name</th>
						<th>Last Price</th>
						<th>24h Change (%)</th>
						<th>24h Volume</th>
						<th>24h High</th>
						<th>24h Low</th>
						{/* Add more table headers for additional information */}
					</tr>
				</thead>
				<tbody>
					{contracts.map((contract) => (
						<tr key={contract.symbol}>
							<td>{contract.symbol}</td>
							<td>{contract.name}</td>
							<td>{contract.lastPrice}</td>
							<td>{contract.changePercentage}</td>
							<td>{contract.volume24h}</td>
							<td>{contract.high24h}</td>
							<td>{contract.low24h}</td>
							{/* Add more table cells for additional information */}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default LivePage;
