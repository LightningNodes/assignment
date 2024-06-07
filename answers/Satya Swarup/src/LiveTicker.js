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

const Liveticker = () => {
  const [cryptos, setCryptos] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "changePercent",
    direction: "desc",
  });

  useEffect(() => {
    const socket = new WebSocket(
      "wss://fawss.pi42.com/socket.io/?EIO=4&transport=websocket"
    );
    socket.onopen = () => socket.send("40");
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data.slice(2))[1];
      setCryptos(
        Object.entries(data).map(([key, value]) => ({
          symbol: key,
          lastPrice: value.lastPrice,
          changePercent: parseFloat(value.priceChangePercent),
          volume: value.baseAssetVolume,
          high: value.marketPrice,
          low: value.lastPrice,
        }))
      );
    };
    socket.onerror = (error) => console.error("WebSocket error:", error);
    socket.onclose = () => console.log("WebSocket connection closed");
    return () => socket.close();
  }, []);

  const handleShare = (crypto) => {
    const message = `Welcome to Pi42! Today's update on ${crypto.symbol}.\nSymbol name: ${crypto.symbol}\nLast price: ₹${crypto.lastPrice}\n24 hour change percentage: ${crypto.changePercent}%\n24 hour volume: ${crypto.volume}\n24 hour high: ₹${crypto.high}\n24 hour low: ₹${crypto.low}`;
    if (navigator.share) {
      navigator
        .share({ title: "Crypto Contract Details", text: message })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      console.log(message);
    }
  };

  const requestSort = (key) => {
    setSortConfig((prevSortConfig) => ({
      key,
      direction:
        prevSortConfig.key === key && prevSortConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };
  const getComparator = (key, direction) =>
    direction === "desc"
      ? (a, b) => (a[key] < b[key] ? 1 : -1)
      : (a, b) => (a[key] > b[key] ? 1 : -1);

  const sortedCryptos = useMemo(() => {
    if (!sortConfig.key) return cryptos;
    return [...cryptos].sort(
      getComparator(sortConfig.key, sortConfig.direction)
    );
  }, [cryptos, sortConfig]);

  const formatCurrency = (value) =>
    `₹${
      value !== undefined && value !== null
        ? value.toLocaleString("en-IN")
        : "0"
    }`;
  const formatVolume = (value) =>
    value >= 1e7
      ? `${(value / 1e7).toFixed(2)} Cr`
      : value >= 1e5
      ? `${(value / 1e5).toFixed(2)} L`
      : value.toString();
  const handleRowClick = (crypto) => {
    setSelectedCrypto(crypto);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          bgcolor: "#1A1A1A",
          margin: "20px",
          width: "auto",
          overflow: "auto",
          border: "1px solid #ffffff",
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{ backgroundColor: "#333333", "& th": { border: 0 } }}
            >
              <TableCell sx={{ color: "#FFFFFF" }}>Symbol Name</TableCell>
              <TableCell
                sx={{ color: "#FFFFFF", cursor: "pointer" }}
                onClick={() => requestSort("lastPrice")}
              >
                Last Price{" "}
                {sortConfig.key === "lastPrice"
                  ? sortConfig.direction === "asc"
                    ? " 🔼"
                    : " 🔽"
                  : ""}
              </TableCell>
              <TableCell
                sx={{ color: "#FFFFFF", cursor: "pointer" }}
                onClick={() => requestSort("changePercent")}
              >
                24h Change %{" "}
                {sortConfig.key === "changePercent"
                  ? sortConfig.direction === "asc"
                    ? " 🔼"
                    : " 🔽"
                  : ""}
              </TableCell>
              <TableCell sx={{ color: "#FFFFFF" }}>24h Volume</TableCell>
              <TableCell sx={{ color: "#FFFFFF" }}>24h High</TableCell>
              <TableCell sx={{ color: "#FFFFFF" }}>24h Low</TableCell>
              <TableCell sx={{ color: "#FFFFFF" }}>Share</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedCryptos.map((crypto, index) => (
              <TableRow
                onClick={() => handleRowClick(crypto)}
                key={index}
                sx={{
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                  "& td, & th": { borderBottom: "none" },
                }}
              >
                <TableCell sx={{ color: "#FFFFFF" }}>{crypto.symbol}</TableCell>
                <TableCell sx={{ color: "#FFFFFF" }}>
                  {formatCurrency(crypto.lastPrice)}
                </TableCell>
                <TableCell
                  sx={{
                    color: crypto.changePercent >= 0 ? "green" : "red",
                  }}
                >
                  <Typography
                    variant="body2"
                    component="span"
                    sx={{ fontWeight: "bold" }}
                  >
                    {crypto.changePercent.toFixed(2)}%
                  </Typography>
                </TableCell>
                <TableCell sx={{ color: "#FFFFFF" }}>
                  {formatVolume(crypto.volume)}
                </TableCell>
                <TableCell sx={{ color: "#FFFFFF" }}>
                  {formatCurrency(crypto.high)}
                </TableCell>
                <TableCell sx={{ color: "#FFFFFF" }}>
                  {formatCurrency(crypto.low)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleShare(crypto)}
                  >
                    Share
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedCrypto && (
        <Dialog
          open={open}
          onClose={handleClose}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: "black",
              border: "1px solid white",

              color: "#FFFFFF",
              width: "80%",
              maxWidth: "600px",
            },
          }}
        >
          <DialogContent>
            <Typography
              variant="h6"
              gutterBottom
              align="center"
              color="#FFFFFF"
            >
              Welcome to Pi42!
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              align="center"
              color="#FFFFFF"
            >
              Today's update on {selectedCrypto?.symbol}.
            </Typography>
            <Typography variant="subtitle1" color="#FFFFFF">
              <strong>Symbol name:</strong> {selectedCrypto?.symbol}
            </Typography>
            <Typography variant="subtitle1" color="#FFFFFF">
              <strong>Last price:</strong> ₹{selectedCrypto?.lastPrice}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: selectedCrypto?.changePercent >= 0 ? "green" : "red",
              }}
            >
              <strong>24h Change %:</strong>{" "}
              {selectedCrypto?.changePercent.toFixed(2)}%
            </Typography>
            <Typography variant="subtitle1" color="#FFFFFF">
              <strong>24h Volume:</strong> {selectedCrypto?.volume}
            </Typography>
            <Typography variant="subtitle1" color="#FFFFFF">
              <strong>24h High:</strong> ₹{selectedCrypto?.high}
            </Typography>
            <Typography variant="subtitle1" color="#FFFFFF">
              <strong>24h Low:</strong> ₹{selectedCrypto?.low}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" variant="outlined">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default Liveticker;