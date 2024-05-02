import { socket } from '../utils/socket';

// Function to fetch initial data via WebSocket
const fetchInitialData = () => {
  return new Promise((resolve, reject) => {
    // Setting a timeout to reject the promise if no response is received in time
    const timeout = setTimeout(() => {
      reject(new Error("Timeout waiting for initial data"));
    }, 5000);  // 5 seconds timeout for example

    // Setting up a one-time listener for the initial data event
    socket.once("initialData", (data) => {
      clearTimeout(timeout);
      resolve(data);
    });

    // Request the server to send initial data
    socket.emit("fetchInitialData");
  });
};

export default fetchInitialData;
