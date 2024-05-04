import React, { useEffect, useState } from 'react';
import './homepage.css';

function HomePage() {
    const [contracts, setContracts] = useState([]);

    useEffect(() => {
        const socketURL = "wss://fawss.pi42.com/socket.io/?EIO=4&transport=websocket";
        const socket = new WebSocket(socketURL);

        socket.onopen = () => {
            console.log('WebSocket connection established.');
            socket.send("40"); // Example message if needed for your server
        };

        socket.onmessage = (event) => {
            console.log('Message from server:', event.data);
        
            try {
                // Extract JSON from the received message
                const jsonStartIndex = event.data.indexOf('['); // Find the start of JSON
                const jsonString = event.data.substring(jsonStartIndex); // Extract JSON substring
                const messageArray = JSON.parse(jsonString); // Parse the JSON string
                const data = messageArray[1]; // Assuming the actual data is the second element
        
                if (data) {
                    // Convert object into array of objects for each symbol
                    const formattedData = Object.keys(data).map(key => ({
                        symbolName: key,
                        ...data[key]
                    }));
        
                    setContracts(formattedData); // Update state with formatted data
                }
            } catch (error) {
                console.error('Error parsing WebSocket data:', error);
            }
        };
        

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed.');
        };

        return () => socket.close(); // Cleanup on component unmount
    }, []);

    return (
        <div className="homepage">
            <h1>Crypto Contracts</h1>
            <table className="resultTable">
                <thead>
                    <tr>
                        <th>Symbol Name</th>
                        <th>Last Price</th>
                        <th>Market Price</th>
                        <th>Price Change Percent</th>
                        <th>Base Asset Volume</th>
                    </tr>
                </thead>
                <tbody>
                    {contracts.map((contract, index) => (
                        <tr key={index}>
                            <td>{contract.symbolName}</td>
                            <td>{contract.lastPrice}</td>
                            <td>{contract.marketPrice}</td>
                            <td>{contract.priceChangePercent}</td>
                            <td>{contract.baseAssetVolume}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default HomePage;
