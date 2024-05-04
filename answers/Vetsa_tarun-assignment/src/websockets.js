import React, { useEffect } from "react";

function WebSocketTest() {
  useEffect(() => {
    const wsUrl =
      "wss://example.com/socket.io/?EIO=4&transport=websocket";
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      console.log("Connection established");
      socket.send("40");
    };

    socket.onmessage = (event) => {
      console.log("Message Received:", event.data);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("Connection closed");
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="WebSocketTest">
      <h1>WebSocket Test</h1>
      <p>Socket messages will be logged in the console.</p>
    </div>
  );
}

export default WebSocketTest;
