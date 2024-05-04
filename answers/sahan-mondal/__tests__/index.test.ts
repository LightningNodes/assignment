import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Login from '@/app/login/page';

jest.mock('firebase/auth', () => ({
    signInWithEmailAndPassword: jest.fn(),
}));

describe('Login Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders login form correctly', () => {
        render(<Login />);
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });

    it('calls signInWithEmailAndPassword with correct data on form submission', async () => {
        const email = 'test@example.com';
        const password = 'password';

        render(<Login />);

        fireEvent.change(screen.getByLabelText('Email'), { target: { value: email } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: password } });
        fireEvent.click(screen.getByRole('button', { name: 'Login' }));

        await waitFor(() => {
            expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
                expect.any(Object),
                email.trim(),
                password.trim()
            );
        });
    });

    it('displays error message when login fails', async () => {
        const errorMessage = 'Invalid email or password';
        signInWithEmailAndPassword.mockRejectedValueOnce(new Error(errorMessage));

        render(<Login />);

        fireEvent.click(screen.getByRole('button', { name: 'Login' }));

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    });

    it('displays loading text while logging in', async () => {
        render(<Login />);

        fireEvent.click(screen.getByRole('button', { name: 'Login' }));

        expect(screen.getByText('Logging In...')).toBeInTheDocument();
    });
});
