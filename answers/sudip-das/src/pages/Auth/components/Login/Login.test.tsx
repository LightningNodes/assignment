import { fireEvent, render } from '@testing-library/react'
import Login from './Login'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../../../../store'
import { auth } from '../../../../utils/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { AuthType } from '../../../../enums/auth'

const queryClient = new QueryClient()

describe('Login component tests', () => {
    it('renders login form', () => {
        const { queryByTestId } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <QueryClientProvider client={queryClient}>
                        <Login setType={vi.fn()} />
                    </QueryClientProvider>
                </MemoryRouter>
            </Provider>
        )
        const loginForm = queryByTestId('login-form')
        expect(loginForm).not.toBeNull()
    })

    it('renders email input', () => {
        const { queryByTestId } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <QueryClientProvider client={queryClient}>
                        <Login setType={vi.fn()} />
                    </QueryClientProvider>
                </MemoryRouter>
            </Provider>
        )
        const emailInput = queryByTestId('email-input')
        expect(emailInput).not.toBeNull()
    })

    it('renders password input', () => {
        const { queryByTestId } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <QueryClientProvider client={queryClient}>
                        <Login setType={vi.fn()} />
                    </QueryClientProvider>
                </MemoryRouter>
            </Provider>
        )
        const passwordInput = queryByTestId('password-input')
        expect(passwordInput).not.toBeNull()
    })

    it('renders login button', () => {
        const { queryByTestId } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <QueryClientProvider client={queryClient}>
                        <Login setType={vi.fn()} />
                    </QueryClientProvider>
                </MemoryRouter>
            </Provider>
        )
        const loginButton = queryByTestId('login-button')
        expect(loginButton).not.toBeNull()
    })

    it('renders register link', () => {
        const { queryByTestId } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <QueryClientProvider client={queryClient}>
                        <Login setType={vi.fn()} />
                    </QueryClientProvider>
                </MemoryRouter>
            </Provider>
        )
        const registerLink = queryByTestId('render-register')
        expect(registerLink).not.toBeNull()
    })

    it('calls setType with Login when clicked on register link', () => {
        const setType = vi.fn()
        const { getByTestId } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <QueryClientProvider client={queryClient}>
                        <Login setType={setType} />
                    </QueryClientProvider>
                </MemoryRouter>
            </Provider>
        )
        const loginLink = getByTestId('render-register')
        fireEvent.click(loginLink)
        expect(setType).toHaveBeenCalledWith(AuthType.Register)
    })

    it('user can sign in with valid email and password', async () => {
        const email = 'exist.test@gmail.com';
        const password = '123456';
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Assert that userCredential is not null and contains expected properties
        expect(userCredential).toBeDefined();
        expect(userCredential.user).toBeDefined();
        expect(userCredential.user.email).toBe(email);
    });

    it('user cannot sign in with invalid email', async () => {
        const email = 'example@gmail.com'
        const password = '123456'
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error:any) {
            // Assert that an error is thrown
            expect(error.code).toBe("auth/invalid-credential")
        }
    })

    it('user cannot sign in with invalid password', async () => {
        const email = 'exist.test@gmail.com'
        const password = '123456789'
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error:any) {
            // Assert that an error is thrown
            expect(error.code).toBe("auth/invalid-credential")
        }
    })
})