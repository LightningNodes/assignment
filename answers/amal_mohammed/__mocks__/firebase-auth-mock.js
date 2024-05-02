// mocks/firebase-auth-mock.js
import { jest } from '@jest/globals';

const mockAuth = jest.fn(() => ({
  signInWithRedirect: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

export const getAuth = jest.fn(() => mockAuth());
export const GoogleAuthProvider = jest.fn();
export const GithubAuthProvider = jest.fn();
export const FacebookAuthProvider = jest.fn();
export const MicrosoftAuthProvider = jest.fn();
