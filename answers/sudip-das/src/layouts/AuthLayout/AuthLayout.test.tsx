import { MemoryRouter } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { render } from "@testing-library/react";

describe("AuthLayout tests", () => {
    it('renders without crashing', () => {
        render(
            <MemoryRouter>
                <AuthLayout />
            </MemoryRouter>
        );
    });
    it('renders Navigate to / when token is present', () => {
        localStorage.setItem('token', 'test-token');
        const { queryByTestId } = render(
            <MemoryRouter>
                <AuthLayout />
            </MemoryRouter>
        );
        const navigate = queryByTestId('navigate');
        expect(navigate).not.toBeNull();
    })
    it('renders Outlet when token is not present', () => {
        localStorage.removeItem('token');
        const { queryByTestId } = render(
            <MemoryRouter>
                <AuthLayout />
            </MemoryRouter>
        );
        const outlet = queryByTestId('outlet');
        expect(outlet).not.toBeNull();
    })
});