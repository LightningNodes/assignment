import React, { useState, useEffect } from 'react';

function CryptoContracts() {
  const [contractDetails, setContractDetails] = useState([]);

  useEffect(() => {
    // Function to create WebSocket connection
    const connectWebSocket = () => {
      // WebSocket URL
      const socketURL = "wss://fawss.pi42.com/socket.io/?EIO=4&transport=websocket";

      // Create WebSocket connection
      const socket = new WebSocket(socketURL);

      // When the connection is opened
      socket.onopen = () => {
        console.log('WebSocket connection established.');

        // Send the number 40
        socket.send("40");
      };

      // When a message is received from the server
      socket.onmessage = (event) => {
        console.log('Message from server:', event.data);



        // Extract the JSON data tuple containing contract details
        const dataString = event.data.substring(2);
        // console.log("here",dataString)

        try {
            // Parse the data tuple as JSON
            const rawData = JSON.parse(dataString)[1];
            let result = Object.keys(rawData).map(e => {
                let ret = {};
                ret[e] = rawData[e];
                return ret;
            });
            console.log("lalar",result)
            // Update contract details state

            setContractDetails(result);
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
  
      };

      // When an error occurs
      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      // When the connection is closed
      socket.onclose = () => {
        console.log('WebSocket connection closed.');
      };
    };

    // Connect WebSocket when component mounts
    connectWebSocket();

    return () => {
      
    };
  }, []); 

  return (
    <div>
      <h1>Crytpo</h1>
      <table border="1">
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
        {console.log("haha",contractDetails)}
          {contractDetails.map((symbolData, index) => (
            <tr key={index}>
            {/* <td>contractDetails[symbolData]</td> */}
              <td>{Object.keys(symbolData)[0]}</td>
              <td>{symbolData[Object.keys(symbolData)[0]].lastPrice || ''}</td>
              <td>{symbolData[Object.keys(symbolData)[0]].marketPrice || ''}</td>
              <td>{symbolData[Object.keys(symbolData)[0]].priceChangePercent || ''}</td>
              <td>{symbolData[Object.keys(symbolData)[0]].baseAssetVolume || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CryptoContracts;
