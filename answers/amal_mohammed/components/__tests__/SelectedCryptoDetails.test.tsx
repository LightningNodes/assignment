// components/__tests__/SelectedCryptoDetails.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import SelectedCryptoDetails from '../SelectedCryptoDetails';

describe('SelectedCryptoDetails', () => {
  const mockCryptoDetail = {
    s: 'BTC',
    c: '50000',
    P: '5',
    v: '1000000',
    h: '51000',
    l: '49000'
  };

  const mockFormatNumber = jest.fn(num => `formatted_${num}`);  // Mock the formatting function to see if it's used

  it('renders crypto details correctly', () => {
    render(<SelectedCryptoDetails crypto={mockCryptoDetail} formatNumber={mockFormatNumber} />);
    screen.debug();
    
    // Check for the symbol
    expect(screen.getByText(`Symbol:`)).toBeInTheDocument();
    expect(screen.getByText(`${mockCryptoDetail.s}`)).toBeInTheDocument();
    
    // Check for last price and formatting application
    expect(screen.getByText(`Last Price:`)).toBeInTheDocument();
    expect(screen.getByText(`₹formatted_${mockCryptoDetail.c}`)).toBeInTheDocument();
    expect(mockFormatNumber).toHaveBeenCalledWith(mockCryptoDetail.c);
    
    // Check for 24h change
    expect(screen.getByText(`24h Change:`)).toBeInTheDocument();
    expect(screen.getByText(`${mockCryptoDetail.P}%`)).toBeInTheDocument();
    
    // // Check for 24h high and formatting application
    expect(screen.getByText(`24h High:`)).toBeInTheDocument();
    expect(screen.getByText(`₹formatted_${mockCryptoDetail.h}`)).toBeInTheDocument();
    expect(mockFormatNumber).toHaveBeenCalledWith(mockCryptoDetail.h);

    // // Check for 24h low and formatting application
    expect(screen.getByText(`24h Low:`)).toBeInTheDocument();
    expect(screen.getByText(`₹formatted_${mockCryptoDetail.l}`)).toBeInTheDocument();
    expect(mockFormatNumber).toHaveBeenCalledWith(mockCryptoDetail.l);

    // // Check for 24h volume and formatting application
    expect(screen.getByText(`24h Volume:`)).toBeInTheDocument();
    expect(screen.getByText(`formatted_${mockCryptoDetail.v}`)).toBeInTheDocument();
    expect(mockFormatNumber).toHaveBeenCalledWith(mockCryptoDetail.v);
  });
});
