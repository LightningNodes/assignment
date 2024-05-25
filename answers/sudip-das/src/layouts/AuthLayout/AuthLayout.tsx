import { Navigate, Outlet } from 'react-router-dom'

/**
 * AuthLayout component is a layout component that renders the Outlet component if the user is not authenticated, otherwise it redirects to the / route.
 * @constant {string} token - to store the token from the local storage
 * @returns 
 */

export default function AuthLayout() {
    const token = localStorage.getItem('token')

    if (token) {
        return (
            <div data-testid="navigate">
                <Navigate to="/" />
            </div>
        )
    }
    return (
        <div data-testid="outlet">
            <Outlet />
        </div>
    )
}
