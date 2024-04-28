import { closePi42WebSocket, connectToPi42WebSocket, socket } from "./websocket";

const mockData = {
    'BTCINR': {
        baseAssetVolume: "220948.138",
        lastPrice:"5711461",
        marketPrice:"5711705",
        priceChangePercent:"-2.245"
    },
};

describe('WebSocketUtils', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('connects to WebSocket server and receives data', () => {

        const mockOn = vi.spyOn(socket, 'on');
        const onMessageCallback = vi.fn();
        mockOn.mockImplementation((event: string, callback: (...args: any[]) => void) => {
            if (event === 'connect') callback();
            if (event === 'allContractDetails') callback(mockData);
        });
        connectToPi42WebSocket(onMessageCallback);

        // Verify that the callback function is called with the correct data
        expect(onMessageCallback).toHaveBeenCalledWith(mockData);
    });

    it('closes the WebSocket connection', () => {
        const mockClose = vi.spyOn(socket, 'close');
        closePi42WebSocket();
        expect(mockClose).toHaveBeenCalled();
    });

    it('reconnects to WebSocket server when disconnected', () => {
        const mockOn = vi.spyOn(socket, 'on');
        const mockConnect = vi.spyOn(socket, 'connect');
        mockOn.mockImplementation((event: string, callback: (...args: any[]) => void) => {
            if (event === 'disconnect') callback();
        });
        connectToPi42WebSocket(vi.fn());
        expect(mockConnect).toHaveBeenCalled();
    });

    it('logs a message when connected', () => {
        const mockLog = vi.spyOn(console, 'log');
        const mockOn = vi.spyOn(socket, 'on');
        mockOn.mockImplementation((event: string, callback: (...args: any[]) => void) => {
            if (event === 'connect') callback();
        });
        connectToPi42WebSocket(vi.fn());
        expect(mockLog).toHaveBeenCalledWith('Connected to Pi42 WebSocket');
    });

    it('logs a message when disconnected', () => {
        const mockLog = vi.spyOn(console, 'log');
        const mockOn = vi.spyOn(socket, 'on');
        mockOn.mockImplementation((event: string, callback: (...args: any[]) => void) => {
            if (event === 'disconnect') callback();
        });
        connectToPi42WebSocket(vi.fn());
        expect(mockLog).toHaveBeenCalledWith('Disconnected from Pi42 WebSocket');
    });

    it('logs a message when reconnecting', () => {
        const mockLog = vi.spyOn(console, 'log');
        const mockOn = vi.spyOn(socket, 'on');
        mockOn.mockImplementation((event: string, callback: (...args: any[]) => void) => {
            if (event === 'disconnect') callback();
        });
        connectToPi42WebSocket(vi.fn());
        expect(mockLog).toHaveBeenCalledWith('Reconnecting to Pi42 WebSocket');
    });
});