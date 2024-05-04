import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const CryptoTable = () => {
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
          iconUrl: renderSymbolImage(key),
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

  const renderSymbolImage = (symbolName) =>
    symbolName
      ? `https://pi42.com/_next/image?url=https://storage.googleapis.com/pi42-dev-static/contract-icons/${symbolName
          .replace(/INR/g, "")
          .toLowerCase()}.png&w=16&q=75`
      : "/crypto.png";
  const handleShare = (crypto) => {
    const message = `Price Tracker welcomes you! Today's update: ${crypto.symbol}.\nSymbol name: ${crypto.symbol}\nLast price: ₹${crypto.lastPrice}\n24 hour change percentage: ${crypto.changePercent}%\n24 hour volume: ${crypto.volume}\n24 hour high: ₹${crypto.high}\n24 hour low: ₹${crypto.low}`;
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
    <div
      style={{
        height: '100%',
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          bgcolor: "#070F2B",
          margin: "20px",
          width: "auto",
          overflow: "auto",
          height: '80%',
          border: "2px solid #1679AB",
          "&::-webkit-scrollbar": { width: "4px" },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "darkgrey",
            outline: "1px solid slategrey",
          },
          fontFamily: '"Ubuntu", sans-serif',
          fontWeight: 400,
          fontStyle: "normal",
          "& th, & td": {
            fontFamily: '"Ubuntu", sans-serif',
            fontWeight: 400,
            fontStyle: "normal",
          },
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{ backgroundColor: "#102C57", "& th": { border: 0 }, border: '1px solid black' }}
            >
              <TableCell sx={{ color: "white" }}
              
              >Symbol Name</TableCell>
              <TableCell
                sx={{ color: "white", cursor: "pointer" }}
                onClick={() => requestSort("lastPrice")}
                style={{
                  display: 'flex',
                }}
              >
                Last Price{" "}
                {sortConfig.key === "lastPrice"
                  ? sortConfig.direction === "asc"
                  ? <ArrowDropUpIcon/>
                  :  <ArrowDropDownIcon/>
                  : ""}
              </TableCell>
              <TableCell sx={{ color: "white" }}>24h Volume</TableCell>
              <TableCell sx={{ color: "white" }}>24h High</TableCell>
              <TableCell
                sx={{ color: "white", cursor: "pointer" }}
                onClick={() => requestSort("changePercent")}
                style={{
                  display: 'flex',
                }}
              >
                24h Change %{" "}
                {sortConfig.key === "changePercent"
                  ? sortConfig.direction === "asc"
                    ? <ArrowDropUpIcon/>
                    :  <ArrowDropDownIcon/>
                  : ""}
              </TableCell>
              <TableCell sx={{ color: "white" }}>24h Low</TableCell>
              <TableCell sx={{ color: "white" }}>Share</TableCell>
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
                  "& td, & th": { borderBottom: "1px solid #132c37" }, // Add this line
                }}
              >
                <TableCell sx={{ color: "white", fontWeight:'800', fontSize: '18px' }}>{crypto.symbol}</TableCell>
                <TableCell sx={{ color: "white" }}>
                  {formatCurrency(crypto.lastPrice)}
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  {formatVolume(crypto.volume)}
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  {formatCurrency(crypto.high)}
                </TableCell>
                <TableCell
                  sx={{
                    color: crypto.changePercent >= 0 ? "#32CD32" : "#fc3434",
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
                <TableCell sx={{ color: "white" }}>
                  {formatCurrency(crypto.low)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleShare(crypto)}
                    style={{
                      backgroundColor: "",
                      color: "white",
                      border: "2px solid blue",
                      borderRadius: "8px",
                      padding: "8px 16px",
                      
                    }}
                  >
                  <ShareIcon color="white"/>
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
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(8px) saturate(180%)",
              WebkitBackdropFilter: "blur(8px) saturate(180%)",
              color: "#fff",
              width: "80%",
              maxWidth: "600px",
            },
          }}
        >
          <DialogContent
            sx={{
              backgroundColor: "#a1a4a8",
              color: "#161616",
              padding: "24px",
            }}
          >
            <Typography variant="h6" gutterBottom align="center">
              Welcome to Pi42!
            </Typography>
            <Typography variant="h6" gutterBottom align="center">
              Today's update on {selectedCrypto?.symbol}.
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="subtitle1">
                  <strong>Symbol name:</strong> {selectedCrypto?.symbol}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Last price:</strong> ₹{selectedCrypto?.lastPrice}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color:
                      selectedCrypto?.changePercent >= 0
                        ? "#32CD32"
                        : "#fc3434",
                  }}
                >
                  <strong>24h Change %:</strong>{" "}
                  {selectedCrypto?.changePercent.toFixed(2)}%
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "right" }}>
                <Typography variant="subtitle1">
                  <strong>24h Volume:</strong> {selectedCrypto?.volume}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>24h High:</strong> ₹{selectedCrypto?.high}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>24h Low:</strong> ₹{selectedCrypto?.low}
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="primary" variant="outlined">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default CryptoTable;
