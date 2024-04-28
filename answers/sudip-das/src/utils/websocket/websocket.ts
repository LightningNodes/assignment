import io from 'socket.io-client'
import { T_AllContracts } from '../../types/contracts';

const PI42_WS_URL = import.meta.env.VITE_APP_WS_URL;

const socket = io(PI42_WS_URL, { transports: ["websocket"] })

const connectToPi42WebSocket = (onMessageCallback: (data: T_AllContracts) => void) => {
    socket.on('connect', () => {
        console.log('Connected to Pi42 WebSocket');
    });

    socket.on('allContractDetails', (data: T_AllContracts) => {
        onMessageCallback(data);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from Pi42 WebSocket');
        if (!socket.connected) {
            console.log('Reconnecting to Pi42 WebSocket');
            socket.connect();
        }
    });
};

const closePi42WebSocket = () => {
    socket.close();
};

export { connectToPi42WebSocket, closePi42WebSocket, socket };
