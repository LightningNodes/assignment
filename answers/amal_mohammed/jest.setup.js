// jest.setup.js
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';

// Mock the useRouter hook
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

const mockedUseRouter = useRouter;
mockedUseRouter.mockImplementation(() => ({
  push: jest.fn(),
  prefetch: jest.fn(),
  route: '/',
  pathname: '/',
  query: '',
  asPath: '/',
}));
