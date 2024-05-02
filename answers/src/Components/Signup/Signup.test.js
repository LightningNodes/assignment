import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Signup from './Signup';  // Adjust the import path as necessary

describe('Signup Component', () => {
  test('renders Signup component', () => {
    render(<Signup />);
    expect(screen.getByText(/signup/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
  });

  test('allows the user to enter input', () => {
    render(<Signup />);
    const input = screen.getByLabelText(/name/i);
    userEvent.type(input, 'John Doe');
    expect(input.value).toBe('John Doe');
  });

  test('validates form inputs before submitting', () => {
    render(<Signup />);
    const submitButton = screen.getByRole('button', { name: /signup/i });
    userEvent.click(submitButton);
    // Assuming your component displays an error message for empty fields
    expect(screen.getByText(/please fill all fields and make sure passwords match/i)).toBeInTheDocument();
  });

  // More advanced test could simulate form submission, etc.
});
