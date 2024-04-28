import { render } from "@testing-library/react";
import MainLayout from "./MainLayout";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "../../store";

const queryClient = new QueryClient();

const localStorageMock = (() => {
    const store: {
        [key:string]:string
    } = {
        'token': 'test-token',
        'refreshToken': 'test-refresh-token'
    };
    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value.toString();
        },
        removeItem: (key: string) => {
            delete store[key];
        },
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

describe("MainLayout tests", () => {
    it('renders without crashing', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <QueryClientProvider client={queryClient}>
                        <MainLayout />
                    </QueryClientProvider>
                </MemoryRouter>
            </Provider>
        );
    });
    it('renders Outlet when token is present', () => {
        localStorage.getItem('token');
        const { queryByTestId } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <QueryClientProvider client={queryClient}>
                        <MainLayout />
                    </QueryClientProvider>
                </MemoryRouter>
            </Provider>
        );
        const outlet = queryByTestId('outlet');
        expect(outlet).not.toBeNull();
    })
    it('renders Navigate to /auth when token is not present', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        const { queryByTestId } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <QueryClientProvider client={queryClient}>
                        <MainLayout />
                    </QueryClientProvider>
                </MemoryRouter>
            </Provider>
        );
        const navigate = queryByTestId('navigate');
        expect(navigate).not.toBeNull();

    });
})