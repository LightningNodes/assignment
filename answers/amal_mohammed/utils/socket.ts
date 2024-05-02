// utils/socket.ts
import { io } from "socket.io-client";

const SOCKET_URL = "https://fawss.pi42.com";

export const socket = io(SOCKET_URL, {
  path: '/socket.io',
  transports: ['websocket'],
  withCredentials: true,
  extraHeaders: {
    "Origin": "https://pi42.com"
  }
});

export const subscribeToTickers = () => {
  socket.emit("subscribe", { params: ["btcinr@ticker", "nearinr@ticker", "filinr@ticker", "galainr@ticker", "1000flokiinr@ticker", "suiinr@ticker", "xrpinr@ticker", "ordiinr@ticker", 
  "ethinr@ticker", "maticinr@ticker", "ondoinr@ticker", "stxinr@ticker", "bomeinr@ticker", "thetainr@ticker", "ominr@ticker", "bnbinr@ticker", "zrxinr@ticker", "vetinr@ticker", "icpinr@ticker", 
  "trxinr@ticker", "1000shibinr@ticker", "1000pepeinr@ticker", "wldinr@ticker", "1000bonkinr@ticker", "dotinr@ticker", "wifinr@ticker", "seiinr@ticker", "mkrinr@ticker", "hbarinr@ticker", 
  "pythinr@ticker", "avaxinr@ticker", "ftminr@ticker", "grtinr@ticker", "opinr@ticker", "dogeinr@ticker", "linkinr@ticker", "xlminr@ticker", "adainr@ticker", "ltcinr@ticker", "runeinr@ticker", 
  "wavesinr@ticker", "uniinr@ticker", "atominr@ticker", "solinr@ticker", "cotiinr@ticker", "rndrinr@ticker", "imxinr@ticker", "arinr@ticker", "injinr@ticker", "aptinr@ticker", "ldoinr@ticker", 
  "hifiinr@ticker", "arbinr@ticker", "winr@ticker", "tiainr@ticker", "kasinr@ticker", "polyxinr@ticker"] });
};

export const unsubscribeFromTickers = () => {
  socket.emit("unsubscribe", { params: ["btcinr@ticker", "nearinr@ticker", "filinr@ticker", "galainr@ticker", "1000flokiinr@ticker", "suiinr@ticker", "xrpinr@ticker", "ordiinr@ticker", 
  "ethinr@ticker", "maticinr@ticker", "ondoinr@ticker", "stxinr@ticker", "bomeinr@ticker", "thetainr@ticker", "ominr@ticker", "bnbinr@ticker", "zrxinr@ticker", "vetinr@ticker", "icpinr@ticker", 
  "trxinr@ticker", "1000shibinr@ticker", "1000pepeinr@ticker", "wldinr@ticker", "1000bonkinr@ticker", "dotinr@ticker", "wifinr@ticker", "seiinr@ticker", "mkrinr@ticker", "hbarinr@ticker", 
  "pythinr@ticker", "avaxinr@ticker", "ftminr@ticker", "grtinr@ticker", "opinr@ticker", "dogeinr@ticker", "linkinr@ticker", "xlminr@ticker", "adainr@ticker", "ltcinr@ticker", "runeinr@ticker", 
  "wavesinr@ticker", "uniinr@ticker", "atominr@ticker", "solinr@ticker", "cotiinr@ticker", "rndrinr@ticker", "imxinr@ticker", "arinr@ticker", "injinr@ticker", "aptinr@ticker", "ldoinr@ticker", 
  "hifiinr@ticker", "arbinr@ticker", "winr@ticker", "tiainr@ticker", "kasinr@ticker", "polyxinr@ticker"] });
};