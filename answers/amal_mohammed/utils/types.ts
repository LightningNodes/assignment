// utils/types.ts
export interface CryptoDetail {
    s: string;  // Symbol
    c: string;  // Last price
    P: string;  // 24-hour change percentage
    h: string;  // 24-hour high
    l: string;  // 24-hour low
    v: string;  // 24-hour volume
}

export interface User {
    id: string;      // Unique identifier for the user
    name: string;    // Full name or username of the user
    email: string; 
  }