// Function to create WebSocket connection
function connectToWebSocket() {
  const socketURL = "wss://fawss.pi42.com/socket.io/?EIO=4&transport=websocket";
  const socket = new WebSocket(socketURL);

  socket.onopen = () => {
      socket.send("40");
  };

  socket.onmessage = (event) => {
      const startIndex = event.data.indexOf('["allContractDetails"');
      const dataString = event.data.substring(startIndex);
      const contractData = JSON.parse(dataString);
      const contractTable = document.getElementById("contractTable");
      contractTable.innerHTML = "";
      contractData.forEach((symbolData) => {
          let shouldInsertRow = false;
          for (const symbolName in symbolData) {
              if (symbolData.hasOwnProperty(symbolName)) {
                  const symbolDetails = symbolData[symbolName];
                  if (symbolDetails.lastPrice !== undefined ||
                      symbolDetails.marketPrice !== undefined ||
                      symbolDetails.priceChangePercent !== undefined ||
                      symbolDetails.baseAssetVolume !== undefined) {
                      shouldInsertRow = true;
                      break;
                  }
              }
          }
          if (shouldInsertRow) {
              for (const symbolName in symbolData) {
                  if (symbolData.hasOwnProperty(symbolName)) {
                      const symbolDetails = symbolData[symbolName];
                      const row = contractTable.insertRow();
                      row.insertCell(0).innerHTML = symbolName;
                      row.insertCell(1).innerHTML = symbolDetails.lastPrice !== undefined ? symbolDetails.lastPrice : '';
                      row.insertCell(2).innerHTML = symbolDetails.marketPrice !== undefined ? symbolDetails.marketPrice : '';
                      row.insertCell(3).innerHTML = symbolDetails.priceChangePercent !== undefined ? symbolDetails.priceChangePercent : '';
                      row.insertCell(4).innerHTML = symbolDetails.baseAssetVolume !== undefined ? symbolDetails.baseAssetVolume : '';
                  }
              }
          }
      });
  };

  socket.onerror = (error) => {
      console.error('WebSocket error:', error);
  };

  socket.onclose = () => {
      console.log('WebSocket connection closed.');
  };

  // Function to sort the table by symbol name
  function sortTable() {
      const table = document.getElementById("contractTable");
      const rows = table.rows;
      const switching = true;
      let shouldSwitch = false;
      let i;

      while (switching) {
          switching = false;
          for (i = 1; i < (rows.length - 1); i++) {
              shouldSwitch = false;
              const x = rows[i].getElementsByTagName("TD")[0];
              const y = rows[i + 1].getElementsByTagName("TD")[0];
              if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                  shouldSwitch = true;
                  break;
              }
          }
          if (shouldSwitch) {
              rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
              switching = true;
          }
      }
  }

  // Add event listener to sort button
  const sortButton = document.getElementById("sortButton");
  sortButton.addEventListener("click", sortTable);
}

