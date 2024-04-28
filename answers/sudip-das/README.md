## Pi42 Crypto Contracts Web Application

This web application allows users to authenticate using Firebase authentication. Upon successful authentication, users can view a page displaying live pricing information for various crypto contracts sourced from Pi42's websocket API. The data is presented in a tabular format, with the ability to sort based on 24-hour change percentage.

### Technologies Used
- TypeScript
- React.js
- Firebase Authentication
- WebSocket API for live data updates (socket.io-client)
- SCSS module for styling
  
### Getting Started
1. Clone this repository.
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up Firebase authentication:
    - Create a Firebase project.
    - Enable Firebase Authentication with the desired authentication providers.
    - Obtain Firebase configuration settings.
    - Configure Firebase in your Next.js app.
4. Set up Pi42 WebSocket API:
    - Obtain access to Pi42's WebSocket API.
    - Use the WebSocket connection in your backend to fetch live pricing data.
5. Run the application:
    ```bash
    npm run dev
    ```
6. Navigate to `localhost:3000` in your browser to access the application.

### Functionality
- Authentication:
  - Users can sign up, log in, and log out using Firebase authentication.
- Crypto Contracts Page:
  - Upon successful authentication, users are redirected to a page displaying live pricing information for various crypto contracts.
  - The data includes symbol name, last price, 24-hour change percentage, 24-hour volume, 24-hour high, and 24-hour low.
  - The data is updated in real-time via WebSocket communication with the Pi42 server.
  - Users can sort the data based on 24-hour change percentage.
  - Each row includes a share button for sharing contract details over WhatsApp.
  - If WhatsApp sharing is not supported by the browser, users can download the contract details as a file.

### Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

### License
This project is licensed under the [MIT License](LICENSE).
