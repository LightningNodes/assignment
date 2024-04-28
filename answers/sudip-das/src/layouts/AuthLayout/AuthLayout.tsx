import { Navigate, Outlet } from 'react-router-dom'

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
