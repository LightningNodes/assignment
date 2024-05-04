import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";

const CoinView = () => {
  const [coinInfo, setCoinInfo] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCoin, setActiveCoin] = useState(null);
  const [sorting, setSorting] = useState({
    criteria: "priceChange",
    order: "descending",
  });

  useEffect(() => {
    const socket = new WebSocket(
      "wss://fawss.pi42.com/socket.io/?EIO=4&transport=websocket"
    );
    socket.onopen = () => socket.send("40");
    socket.onmessage = (event) => {
      const info = JSON.parse(event.data.slice(2))[1];
      setCoinInfo(
        Object.keys(info).map((coinSymbol) => ({
          symbol: coinSymbol,
          currentPrice: info[coinSymbol].lastPrice,
          priceChange: parseFloat(info[coinSymbol].priceChangePercent),
          tradeVolume: info[coinSymbol].baseAssetVolume,
          peakPrice: info[coinSymbol].marketPrice,
          lowPrice: info[coinSymbol].lastPrice,
        }))
      );
    };
    socket.onerror = (error) => console.error("WebSocket Error:", error);
    socket.onclose = () => console.log("WebSocket Connection Closed");
    return () => socket.close();
  }, []);

  const shareDetails = (coin) => {
    const shareMessage = `Welcome to Pi42! Today's update for ${coin.symbol}.\nSymbol: ${coin.symbol}\nCurrent Price: ₹${coin.currentPrice}\n24h Change: ${coin.priceChange}%\n24h Volume: ${coin.tradeVolume}\n24h High: ₹${coin.peakPrice}\n24h Low: ₹${coin.lowPrice}`;
    if (navigator.share) {
      navigator
        .share({ title: "Coin Information", text: shareMessage })
        .then(() => console.log("Sharing Successful"))
        .catch((error) => console.error("Sharing Error:", error));
    } else {
      console.log(shareMessage);
    }
  };

  const requestSorting = (criteria) => {
    setSorting((prevSorting) => ({
      criteria,
      order:
        prevSorting.criteria === criteria && prevSorting.order === "ascending"
          ? "descending"
          : "ascending",
    }));
  };

  const sortingComparator = (criteria, order) =>
    order === "descending"
      ? (a, b) => (a[criteria] < b[criteria] ? 1 : -1)
      : (a, b) => (a[criteria] > b[criteria] ? 1 : -1);

  const sortedCoins = useMemo(() => {
    if (!sorting.criteria) return coinInfo;
    return [...coinInfo].sort(sortingComparator(sorting.criteria, sorting.order));
  }, [coinInfo, sorting]);

  const formatCurrency = (value) =>
    `₹${value !== undefined && value !== null ? value.toLocaleString("en-IN") : "0"}`;

  const formatVolume = (value) =>
    value >= 1e7
      ? `${(value / 1e7).toFixed(2)} Cr`
      : value >= 1e5
      ? `${(value / 1e5).toFixed(2)} L`
      : value.toString();

  const handleRowSelection = (coin) => {
    setActiveCoin(coin);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ marginTop: 2, marginBottom: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell
                onClick={() => requestSorting("currentPrice")}
                sx={{ cursor: "pointer" }}
              >
                Current Price{" "}
                {sorting.criteria === "currentPrice"
                  ? sorting.order === "ascending"
                    ? "▲"
                    : "▼"
                  : ""}
              </TableCell>
              <TableCell
                onClick={() => requestSorting("priceChange")}
                sx={{ cursor: "pointer" }}
              >
                24h Change %{" "}
                {sorting.criteria === "priceChange"
                  ? sorting.order === "ascending"
                    ? "▲"
                    : "▼"
                  : ""}
              </TableCell>
              <TableCell>24h Volume</TableCell>
              <TableCell>24h High</TableCell>
              <TableCell>24h Low</TableCell>
              <TableCell>Share</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedCoins.map((coin, index) => (
              <TableRow
                onClick={() => handleRowSelection(coin)}
                key={index}
                sx={{ cursor: "pointer", "&:hover": { opacity: 0.8 } }}
              >
                <TableCell>{coin.symbol}</TableCell>
                <TableCell>{formatCurrency(coin.currentPrice)}</TableCell>
                <TableCell
                  sx={{
                    color: coin.priceChange >= 0 ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {coin.priceChange.toFixed(2)}%
                </TableCell>
                <TableCell>{formatVolume(coin.tradeVolume)}</TableCell>
                <TableCell>{formatCurrency(coin.peakPrice)}</TableCell>
                <TableCell>{formatCurrency(coin.lowPrice)}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => shareDetails(coin)}
                  >
                    Share
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {activeCoin && (
        <Dialog open={modalOpen} onClose={handleModalClose}>
          <DialogContent>
            <Typography variant="h5" align="center" gutterBottom>
              Welcome to Pi42!
            </Typography>
            <Typography variant="h6" align="center" gutterBottom>
              Today's update for {activeCoin?.symbol}.
            </Typography>
            <Typography>
              <strong>Symbol:</strong> {activeCoin?.symbol}
            </Typography>
            <Typography>
              <strong>Current Price:</strong> ₹{activeCoin?.currentPrice}
            </Typography>
            <Typography
              sx={{
                color: activeCoin?.priceChange >= 0 ? "green" : "red",
              }}
            >
              <strong>24h Change %:</strong>{" "}
              {activeCoin?.priceChange.toFixed(2)}%
            </Typography>
            <Typography>
              <strong>24h Volume:</strong> {activeCoin?.tradeVolume}
            </Typography>
            <Typography>
              <strong>24h High:</strong> ₹{activeCoin?.peakPrice}
            </Typography>
            <Typography>
              <strong>24h Low:</strong> ₹{activeCoin?.lowPrice}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleModalClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default CoinView;