const socket = new WebSocket('wss://fawss.pi42.com/socket.io/?EIO=4&transport=websocket');

let sortDirection = "asc"; 

// Once the websocket connection is established, send a request to the web socket
socket.onopen = function(event) {
    console.log('Websocket connection established');
    socket.send('40');
};

// On receiving data from the websocket, create/update the table
socket.onmessage = function(event) {
    // Define all the header values in the table
    let headerValues = ['Symbol Name', 'Last Price', '24 hour change %', '24 hour volume', '24 hour high', '24 hour low', 'Download'];

    const data = JSON.parse(event.data.slice(2))[1];

    if (data) {
        // Create the table if the table is empty
        if (!document.querySelector("#crypto-data")) {
            createTable(data, headerValues);
        // Else, update the table
        } else {
            updateTable(data, headerValues);
        }
    }
};

// Function to create the table to display the live data from the Pi42 websocket
function createTable(data, headerValues) {
    let table = document.createElement('table');
    table.id = "crypto-data";
    table.classList.add('crypto-data');

    let thead = table.createTHead();
    let headerRow = thead.insertRow();

    headerValues.forEach((key, index) => {
        let th = document.createElement('th');
        th.textContent = key;

        // Add the sort button to the 24 hour change % column
        if (index === 2) { 
            let button = document.createElement('button');
            button.textContent = '(▲)';
            button.classList.add('sort-button');

            // Event listener to sort the table on clicking the button
            button.addEventListener('click', function() {
                sortTable(index); 
            });

            th.appendChild(button);
        }
        headerRow.appendChild(th);
    });

    let tbody = document.createElement('tbody');
    table.appendChild(tbody);

    document.body.appendChild(table);
    updateTable(data, headerValues);
}

// Function to update the values of the table dynamically from the data received from the Pi42 websocket
function updateTable(data, headerValues) {
    let tbody = document.querySelector("#crypto-data tbody");
    tbody.innerHTML = '';

    // Iterate over the data and the data to the row cells
    Object.entries(data).forEach(([symbol, values]) => {
        let row = tbody.insertRow();
        
        headerValues.forEach((val, i) => {
            
            let cell = row.insertCell();
            if ( i === 0) {
                cell.textContent = symbol;
            }
            else if (i === 1 || i ===5) {
                cell.textContent = '₹' + values.lastPrice;
            }
            else if(i === 2) {
                cell.textContent = values.priceChangePercent + '%';
            } 
            else if (i === 3) {
                cell.textContent = values.baseAssetVolume;
            }
            else if (i === 4) {
                cell.textContent = '₹' + values.marketPrice;
            }
            else if (i === 6) {

                // Add the download button in the last column
                let downloadButton = document.createElement('button');
                downloadButton.textContent = 'Download';

                // Event listener to download the details from all the columns of the contract
                downloadButton.addEventListener('click', function() {
                    const data = {"Symbol Name": symbol, "Last Price": '₹' + values.lastPrice, "24 hour change %": values.priceChangePercent + '%', "24 hour volume": values.baseAssetVolume, "24 hour high": '₹' + values.marketPrice, "24 hour low": '₹' + values.lastPrice}
                    downloadData(data, `${symbol}_data.txt`, 'text/plain'); 
                });

                cell.appendChild(downloadButton);
            }
                       
        });
    });

}

// Function to download the data 
function downloadData(data, filename, fileType) {

    const formattedData = formatDataToString(data);

    // Convert the data to Blob
    const blob = new Blob([formattedData], { type: fileType });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement('a');

    // Set the link attributes
    link.href = url;
    link.download = filename;

    // Append the link to the body
    document.body.appendChild(link);

    // Trigger click event on the link
    link.click();

    // Remove link from the body
    document.body.removeChild(link);

    // Revoke the URL to release the resources
    URL.revokeObjectURL(url);
    
}

// Function to format the object data to a string of key value pairs
function formatDataToString(data) {
    const keyValues = Object.entries(data);

    const formattedLines = keyValues.map(([key, value]) => `${key}: ${value}`);

    // Connect the formatted lines with a new line
    return formattedLines.join('\n');
}

// Function to sort the rows of the table with the index of the column
function sortTable(colIndex) {
    let table = document.getElementById("crypto-data");
    let tbody = table.querySelector("tbody");
    let rows = Array.from(tbody.getElementsByTagName("tr"));

    rows.sort((a, b) => {
        let x = a.cells[colIndex].textContent.toLowerCase();
        let y = b.cells[colIndex].textContent.toLowerCase();

        if (sortDirection === "asc") {
            return x.localeCompare(y);
        } else {
            return y.localeCompare(x);
        }
    });

    // Toggle the sort direction
    sortDirection = sortDirection === "asc" ? "desc" : "asc";

    // Update the sort button text
    let sortButton = table.querySelector('.sort-button');
    sortButton.textContent = `${sortDirection === "asc" ? "(▲)" : "(▼)"}`;

    // Rearrange all the rows after sorting the values
    rows.forEach(row => tbody.appendChild(row));
}

