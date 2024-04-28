import { fireEvent, render } from '@testing-library/react'
import Register from './Register'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from '../../../../store'
import { AuthType } from '../../../../enums/auth'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../../../../utils/firebase'


const queryClient = new QueryClient()

describe('Register page tests', () => {
    it('renders register form', () => {
        const { queryByTestId } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <QueryClientProvider client={queryClient}>
                        <Register setType={vi.fn()} />
                    </QueryClientProvider>
                </MemoryRouter>
            </Provider>
        )
        const registerForm = queryByTestId('register-form')
        expect(registerForm).not.toBeNull()
    })

    it('renders name input', () => {
        const { queryByTestId } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <QueryClientProvider client={queryClient}>
                        <Register setType={vi.fn()} />
                    </QueryClientProvider>
                </MemoryRouter>
            </Provider>
        )
        const nameInput = queryByTestId('name-input')
        expect(nameInput).not.toBeNull()
    })

    it('renders email input', () => {
        const { queryByTestId } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <QueryClientProvider client={queryClient}>
                        <Register setType={vi.fn()} />
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
                        <Register setType={vi.fn()} />
                    </QueryClientProvider>
                </MemoryRouter>
            </Provider>
        )
        const passwordInput = queryByTestId('password-input')
        expect(passwordInput).not.toBeNull()
    })

    it('renders register button', () => {
        const { queryByTestId } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <QueryClientProvider client={queryClient}>
                        <Register setType={vi.fn()} />
                    </QueryClientProvider>
                </MemoryRouter>
            </Provider>
        )
        const registerButton = queryByTestId('register-button')
        expect(registerButton).not.toBeNull()
    })

    it('renders login link', () => {
        const { queryByTestId } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <QueryClientProvider client={queryClient}>
                        <Register setType={vi.fn()} />
                    </QueryClientProvider>
                </MemoryRouter>
            </Provider>
        )
        const loginLink = queryByTestId('render-login')
        expect(loginLink).not.toBeNull()
    })

    it('calls setType with Login when clicked on login link', () => {
        const setType = vi.fn()
        const { getByTestId } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <QueryClientProvider client={queryClient}>
                        <Register setType={setType} />
                    </QueryClientProvider>
                </MemoryRouter>
            </Provider>
        )
        const loginLink = getByTestId('render-login')
        fireEvent.click(loginLink)
        expect(setType).toHaveBeenCalledWith(AuthType.Login)
    })

    it('user can register with name, email and password', async () => {
        const name = 'John Doe';
        const email = 'test@gmail.com';
        const password = '123456';
        try{

            await createUserWithEmailAndPassword(auth, email, password);
    
            const user = auth?.currentUser;
            if (user) {
                await updateProfile(user, { displayName: name });
                expect(user.displayName).toBe(name);
            }
    
        }catch(e:any){
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            expect(userCredential.user?.email).toBe(email);
            const token = await userCredential.user?.getIdToken();
            expect(token).not.toBeNull();
            await userCredential.user?.delete();
        }
        // delete the user
    })

    it('user cannot register with an existing email', async () => {
        const name = 'John Doe';
        const email = 'exist.test@gmail.com'
        const password = '123456' ;
        try{
            await createUserWithEmailAndPassword(auth, email, password);
        }catch(e:any){
            const user = auth?.currentUser;
            if (user) {
                await updateProfile(user, { displayName: name });
                expect(user.displayName).toBe(name);
            }
            expect(e.code).toBe('auth/email-already-in-use');
        }
    })
})