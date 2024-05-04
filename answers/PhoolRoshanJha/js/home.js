let sort = "asc"
// Sample data for demonstration
let data = [
];
// Function to toggle the sort order and sort the data accordingly
function sortData() {
    let sortedData;
    if (data.length > 0) {
        if (sort == "asc") {
            // Sort the data based on changePercentage
            sortedData = data.sort((a, b) => {
                return parseFloat(a.changePercentage) - parseFloat(b.changePercentage);
            });
            sortButton.textContent = "Sort by Change Percentage (Descending)"

        }
        else {
            sortedData = data.sort((a, b) => {
                return parseFloat(b.changePercentage) - parseFloat(a.changePercentage);
            });
            sortButton.textContent = "Sort by Change Percentage (Ascending)"
        }

        // Clear existing content
        tableBody.innerHTML = '';
        // Populate the table with sorted data
        sortedData.forEach((item) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.symbolName}</td>
                <td>₹${item.lastPrice}</td>
                <td>${item.changePercentage}</td>
                <td>${item.volume}</td>
                <td>₹${item.high}</td>
                <td>₹${item.low}</td>
            `;
            tableBody.appendChild(row);
        });
    }
}

// Event listener for the sort button
const sortButton = document.getElementById('sortButton');
sortButton.addEventListener('click', () => { sort = (sort == "asc") ? "desc" : "asc"; sortData(); });


function initWebSocket() {
    const socket = new WebSocket('wss://fawss.pi42.com/socket.io/?EIO=4&transport=websocket');
    socket.onopen = () => socket.send('40');
    socket.onmessage = (event) => {
        const res = event.data.slice(2);
        const data = JSON.parse(res)[1];
        processData(data);
    };
    socket.onerror = error => console.error('WebSocket error:', error);
    socket.onclose = () => console.log('WebSocket connection closed');
    return socket;
}

const socket = initWebSocket();

// Function to process and display incoming data
function processData(incomingData) {
    if (incomingData) {
        // Extract the relevant data and populate the data array
        dataArray = Object.keys(incomingData).map(symbolName => ({
            symbolName,
            lastPrice: incomingData[symbolName].lastPrice,
            changePercentage: incomingData[symbolName].priceChangePercent,
            volume: incomingData[symbolName].baseAssetVolume,
            high: incomingData[symbolName].marketPrice,
            low: ''
        }));
        data = data.concat(dataArray);
    }
    sortData()
}

// Function to convert table data to Excel format and initiate download
function downloadExcel() {
    const table = document.getElementById('dataTable');
    const rows = table.querySelectorAll('tr');
    const csvData = [];

    // Add table headers to the CSV data
    const headers = Array.from(rows[0].querySelectorAll('th')).map(header => header.textContent);
    csvData.push(headers.join(','));

    // Add table rows to the CSV data
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i].querySelectorAll('td');
        const rowData = Array.from(row).map(cell => cell.textContent.replace("₹", ''));
        csvData.push(rowData.join(','));
    }

    // Convert CSV data to a blob
    const csvContent = csvData.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });

    // Create a download link and trigger the download
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'table_data.csv';
    link.click();
}

// Event listener for download button
const downloadButton = document.getElementById('downloadButton');
downloadButton.addEventListener('click', downloadExcel);

// Event listener for whatsapp share button
const whatsappShareButton = document.getElementById('shareOnWhatsAppButton');
whatsappShareButton.addEventListener('click', async () => {
    var phonenumber = "+917733884259";

    // Constructing the WhatsApp share message with table data
    var message = "Table Data:%0a";
    const table = document.getElementById('dataTable');
    const rows = table.querySelectorAll('tr');
    for (let i = 0; i < 10; i++) { //limiting it to 10 because number of rows are a lot
        const cells = rows[i].querySelectorAll('td');
        for (let j = 0; j < cells.length; j++) {
            message += cells[j].textContent + " ";
        }
        message += "%0a"; // newline character
    }

    var url = "https://wa.me/" + phonenumber + "?text=" +
        encodeURIComponent(message);

    window.open(url, '_blank').focus();
});



