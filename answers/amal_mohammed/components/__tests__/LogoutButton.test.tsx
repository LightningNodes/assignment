// components/__tests__/LogoutButton.test.tsx
import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import LogoutButton from '../dashboard/LogoutButton';
import { getAuth, signOut, Auth } from 'firebase/auth';
import { useRouter, NextRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  signOut: jest.fn()
}));

const mockRouter: Partial<NextRouter> = {
  push: jest.fn(),
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
};

(useRouter as jest.MockedFunction<typeof useRouter>).mockImplementation(() => mockRouter as NextRouter);

describe('LogoutButton', () => {
  const mockSignOut = signOut as jest.MockedFunction<typeof signOut>;
  const mockGetAuth = getAuth as jest.MockedFunction<typeof getAuth>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetAuth.mockImplementation(() => ({} as Auth));
    mockSignOut.mockImplementation(() => Promise.resolve());
  });

  it('renders the logout button', () => {
    render(<LogoutButton />);
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('calls signOut and navigates to login on successful logout', async () => {
    render(<LogoutButton />);
    fireEvent.click(screen.getByRole('button', { name: /logout/i }));
    await waitFor(() => expect(mockSignOut).toHaveBeenCalled());
    expect(mockRouter.push).toHaveBeenCalledWith('/login');
  });

  it('handles logout errors and does not navigate', async () => {
    const error = new Error('Logout failed');
    mockSignOut.mockImplementationOnce(() => Promise.reject(error));
    console.error = jest.fn();

    render(<LogoutButton />);
    fireEvent.click(screen.getByRole('button', { name: /logout/i }));
    await waitFor(() => expect(console.error).toHaveBeenCalledWith('Logout Error:', error));
    expect(mockRouter.push).not.toHaveBeenCalled();
  });
});
