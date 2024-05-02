// pages/__tests__/login.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../pages/login';

// Correctly mock the entire module that contains the useAuthHandler hook
jest.mock('@utils/useAuthHandler', () => ({
  useAuthHandler: jest.fn()  // This sets up useAuthHandler as a jest mock function
}));

const mockHandleAuth = jest.fn();
const googleProvider = {
    providerId: 'google.com',  // Note the more precise providerId
    customParameters: {},
    defaultLanguageCode: null,
    scopes: ['profile'],
  };
  const githubProvider = {
    providerId: 'github.com',  // Note the more precise providerId
    customParameters: {},
    defaultLanguageCode: null,
    scopes: [],
  };
const facebookProvider = { providerId: 'facebook' };
const microsoftProvider = { providerId: 'microsoft' };

describe('Login Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Properly use mockImplementation on the mock function
    require('@utils/useAuthHandler').useAuthHandler.mockImplementation(() => mockHandleAuth);
  });

  it('renders without crashing', () => {
    render(<Login />);
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
  });

  it('should render login form correctly', () => {
    render(<Login />);
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email ID')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Remember me')).toBeInTheDocument();
    expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
  });

  it('should allow entering email and password', () => {
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText('Email ID'), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
    expect(screen.getByPlaceholderText('Email ID')).toHaveValue('user@example.com');
    expect(screen.getByPlaceholderText('Password')).toHaveValue('password');
  });

  it('should navigate to signup when register link is clicked', () => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    const mockPush = jest.fn();
    useRouter.mockImplementation(() => ({ push: mockPush }));

    render(<Login />);
    fireEvent.click(screen.getByText(/register/i));
    expect(mockPush).toHaveBeenCalledWith('/signup');
  });

  // Test each auth provider button click
  it('triggers auth function with Google provider on button click', () => {
    render(<Login />);
    fireEvent.click(screen.getByTestId('google-auth-button'));
    expect(mockHandleAuth).toHaveBeenCalledWith(googleProvider);
  });

  it('triggers auth function with GitHub provider on button click', () => {
    render(<Login />);
    fireEvent.click(screen.getByTestId('github-auth-button'));
    expect(mockHandleAuth).toHaveBeenCalledWith(githubProvider);
  });

  // Add tests for Facebook and Microsoft similarly
});

