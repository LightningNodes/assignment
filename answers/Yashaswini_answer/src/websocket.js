import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    const socket = new WebSocket('wss://fawss.pi42.com/socket.io/?EIO=4&transport=websocket');

    socket.onopen = () => {
      console.log('WebSocket connection established');
      socket.send('40');
    };

    socket.onmessage = (event) => {
      console.log('Received:', event.data);
    };

    // Handle any errors
    socket.onerror = (error) => {
      console.log('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket is closed');
    };

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
