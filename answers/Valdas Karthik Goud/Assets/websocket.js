import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    const webSocketUrl =
      "wss://fawss.pi42.com/socket.io/?EIO=4&transport=websocket";
    const socket = new WebSocket(webSocketUrl);

    socket.onopen = () => {
      console.log("Connection Success");
      socket.send("40");
    };

    socket.onmessage = (event) => {
      console.log("Receive Successful:", event.data);
    };

    socket.onerror = (error) => {
      console.error("Socket error:", error);
    };

    socket.onclose = () => {
      console.log("Connection closed");
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="App">
      <h1>WebSocket Test</h1>
      <p>Socket messages in cosole.</p>
    </div>
  );
}

export default App;