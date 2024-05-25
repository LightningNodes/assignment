import { describe, expect, it } from "vitest";
import Auth from "./Auth";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();

describe("Auth page tests", () => {
    it('renders with Login component by default', () => {
        const { queryByTestId } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <QueryClientProvider client={queryClient}>
                        <Auth />
                    </QueryClientProvider>
                </MemoryRouter>
            </Provider>
        );
        const loginComponent = queryByTestId('login-component');
        expect(loginComponent).not.toBeNull();
    });

    it('renders with Register component when clicked on Register', async () => {
        const { getByTestId } = await render(
            <Provider store={store}>
                <MemoryRouter>
                    <QueryClientProvider client={queryClient}>
                        <Auth />
                    </QueryClientProvider>
                </MemoryRouter>
            </Provider>
        );
        const registerElement = getByTestId('render-register');
        // Simulate a click on the "render-register" element
        fireEvent.click(registerElement);
        // Assert that the Register component is rendered
        const registerComponent = getByTestId('register-component');
        expect(registerComponent).not.toBeNull();
    });

    it('renders with Login component when clicked on Register and then clicked on Login', async () => {
        const { getByTestId } = await render(
            <Provider store={store}>
                <MemoryRouter>
                    <QueryClientProvider client={queryClient}>
                        <Auth />
                    </QueryClientProvider>
                </MemoryRouter>
            </Provider>
        );
        const registerElement = getByTestId('render-register');
        // Simulate a click on the "render-register" element
        fireEvent.click(registerElement);
        // Assert that the Register component is rendered
        const registerComponent = getByTestId('register-component');
        expect(registerComponent).not.toBeNull();
        const loginElement = getByTestId('render-login');
        // Simulate a click on the "render-login" element
        fireEvent.click(loginElement);
        // Assert that the Login component is rendered
        const loginComponent = getByTestId('login-component');
        expect(loginComponent).not.toBeNull();
    });
});