// utils/auth-mock.ts
import { Auth } from 'firebase/auth';

export const authMock: Auth = {
    signInWithRedirect: jest.fn(() => Promise.resolve()),
    signInWithEmailAndPassword: jest.fn(() => Promise.resolve()),
    createUserWithEmailAndPassword: jest.fn(() => Promise.resolve()),
    signOut: jest.fn(() => Promise.resolve()),
    onAuthStateChanged: jest.fn(),
    // add other necessary methods and properties as jest.fn() or proper mocks
    currentUser: null,
    // Other necessary Auth properties
} as Partial<Auth> as Auth;
