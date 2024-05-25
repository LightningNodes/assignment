## Pi42 Crypto Contracts Web Application

This web application allows users to authenticate using Firebase authentication. Upon successful authentication, users can view a page displaying live pricing information for various crypto contracts sourced from Pi42's websocket API. The data is presented in a tabular format, with the ability to sort based on 24-hour change percentage.

Deployed url - https://pi42.netlify.app

### Technologies Used
- TypeScript
- React.js
- Firebase Authentication
- WebSocket API for live data updates (socket.io-client)
- SCSS module for styling
  
### Getting Started
1. Clone this repository.
2. Create a `.env` file and use below variables
    ```
    # Pi42's WebSocket API
    VITE_APP_WS_URL=

    # Firebase Config
    VITE_APP_FIREBASE_KEY=
    VITE_APP_FIREBASE_AUTH_DOMAIN=
    VITE_APP_FIREBASE_PROJECT_ID=
    VITE_APP_FIREBASE_STORAGE_BUCKET=
    VITE_APP_FIREBASE_MESSAGING_SENDER_ID=
    VITE_APP_FIREBASE_APP_ID=
    VITE_APP_FIREBASE_MEASUREMENT_ID=
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Run the application:
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
  - If WhatsApp sharing is not supported by the browser, users can download the contract details as a .txt file.

### Test Cases Files
- websocket.test.ts
- Home.test.tsx
- Register.test.tsx
- Login.test.tsx
- Auth.test.tsx
- MainLayout.test.tsx
- GlimpseStat.test.tsx
- AuthLayout.test.tsx
- functions.test.ts

### Contact details
- Name - Sudip Das
- Phone number - 9073383828
- Email - das366966@gmail.com
- Linkedin - https://linkedin.com/in/sudipdas80

