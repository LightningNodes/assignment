import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    const socketUrl =
      "wss://fawss.pi42.com/socket.io/?EIO=4&transport=websocket";
    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      console.log("WebSocket connection established");
      socket.send("40");
    };

    socket.onmessage = (event) => {
      console.log("Received message:", event.data);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="App">
      <h1>WebSocket Connection Test</h1>
      <p>View the console for WebSocket server messages.</p>
    </div>
  );
}

export default App;
