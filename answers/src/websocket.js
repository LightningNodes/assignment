import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Create a raw WebSocket connection
    const socket = new WebSocket('wss://fawss.pi42.com/socket.io/?EIO=4&transport=websocket');

    // Handle open connection
    socket.onopen = () => {
      console.log('WebSocket connection established');
      // Send exactly "40" to the server
      socket.send('40');
    };

    // Handle messages received from the server
    socket.onmessage = (event) => {
      console.log('Received:', event.data);
    };

    // Handle any errors
    socket.onerror = (error) => {
      console.log('WebSocket error:', error);
    };

    // Handle WebSocket closure
    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Cleanup function
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="App">
      <h1>Raw WebSocket Test</h1>
      <p>Check the console for messages from the WebSocket server.</p>
    </div>
  );
}

export default App;
