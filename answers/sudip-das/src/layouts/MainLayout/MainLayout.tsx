import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { setUser } from "../../store/slices/userSlice";
import { useGetUserDetails } from "../../api/auth.hooks";

/**
 * MainLayout component is a layout component that renders the Outlet component if the user is authenticated, otherwise it redirects to the /auth route.
 * @constant {string} token - to store the token from the local storage
 * @function user - to get the user details from the useGetUserDetails hook
 * @function dispatch - to dispatch an action to the Redux store
 * @returns 
 */

export default function MainLayout() {
    const token = localStorage.getItem('token')
    const user = useGetUserDetails()
    const dispatch = useDispatch()

    useEffect(() => {
        if (user.data) {
            auth.onAuthStateChanged((user) => {
                if (!user) {
                    localStorage.removeItem('token')
                    localStorage.removeItem('refreshToken')
                }
            })
            dispatch(setUser({
                email: user.data.email,
                name: user.data.displayName,
                _id: user.data.uid,
            }))
        }
    }, [user.data,dispatch])
    if (!token) {
        return (
            <div data-testid="navigate">
                <Navigate to="/auth" />
            </div>
        )
    }
    return (
        <div data-testid="outlet">
            <Outlet />
        </div>
    )
}
