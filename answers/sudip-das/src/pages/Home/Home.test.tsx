import { render, fireEvent } from '@testing-library/react';
import Home from './Home';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from '../../store';
import {  socket } from '../../utils/websocket/websocket';
import { Socket } from 'socket.io-client';

const queryClient = new QueryClient();

vi.mock('../../utils/websocket/websocket', () => {
    return {
        __esModule: true,
        socket: {
            connected: true,
            on: vi.fn(),
            close: vi.fn(),
        },
        connectToPi42WebSocket: vi.fn(),
        closePi42WebSocket: vi.fn(),
    };
});


describe('Home Component', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });
    it('displays loading spinner when not connected to WebSocket', () => {
        //change connected to false
        (socket as Socket).connected = false;
        const {getByTestId} = render(
            <Provider store={store}>
                <MemoryRouter>
                    <QueryClientProvider client={queryClient}>
                        <Home />
                    </QueryClientProvider>
                </MemoryRouter>
            </Provider>
        )
        const loadingSpinner = getByTestId('spinner');
        expect(loadingSpinner).not.toBeNull();
    });

    it('show table when connected to WebSocket', async () => {
        (socket as Socket).connected = true;
        
        const {getByTestId} = await render(
            <Provider store={store}>
                <MemoryRouter>
                    <QueryClientProvider client={queryClient}>
                        <Home />
                    </QueryClientProvider>
                </MemoryRouter>
            </Provider>
        )
        const table = getByTestId('table');
        console.log(getByTestId)
        expect(table).not.toBeNull();
    })

    it('executes logout function correctly', async () => {
        const {
            getAllByTestId
        } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <QueryClientProvider client={queryClient}>
                        <Home />
                    </QueryClientProvider>
                </MemoryRouter>
            </Provider>
        );
        const logoutButton = getAllByTestId('logout')[0];
        fireEvent.click(logoutButton);

        expect(localStorage.getItem('token')).toBeNull();
        expect(localStorage.getItem('refreshToken')).toBeNull();
    });

    it('check table column names', async () => {
        (socket as Socket).connected = true;
        const {getByTestId} = await render(
            <Provider store={store}>
                <MemoryRouter>
                    <QueryClientProvider client={queryClient}>
                        <Home />
                    </QueryClientProvider>
                </MemoryRouter>
            </Provider>
        )
        const table = getByTestId('table');
        const tableHead = table.querySelector('thead');
        const tableHeadRow = tableHead?.querySelector('tr');
        const tableHeadColumns = tableHeadRow?.querySelectorAll('th');
        expect(tableHeadColumns?.length).toBe(7);
        const allColumns = ['Symbol Name', 'Last Price', '24H %', '24H Volume', '24H Low', '24H High', 'Share'];
        tableHeadColumns?.forEach((column) => {
            const columnText = column.textContent?.trim();
            expect(allColumns).toContain(columnText);
        });
    })
});