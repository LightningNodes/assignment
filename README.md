# Pi42 Assignment
Pi42 assignment for junior and mid level developer roles

## Task
Create a web application that uses firebase for authentication. Once after the authentication is successful, add a page with all the crypto contracts (tokens listed in Pi42) with their live pricing coming from Pi42 web socket. Check out the browser network tab to filter out websocket data. Typescript/Golang is preferred. If you are comfortable in any strongly typed language, that is fine as well. We use typescript(nestjs/nextjs) on our stack and upcoming modules are being built in Golang. 

After creating the live ticker price page, add a functionality to sort the data based on 24 hour change percentage. The data should be updated through websocket in real time in the same way how do you see data on pi42.com trade screen. The page should have columns as below.

## Format
symbol name | last price | 24 hour change percentage | 24 hour volume | 24 hour high | 24 hour low | share 

Every row contains details on a particular crypto contract. Add a share button in the last column where the particular crypto contract details can be shared over whatsapp with details from all the columns of the contract, like the below example. If the share is not supported by the browser, add a provision to download the content.

## Content format

Welcome to Pi42! Today's update on Bitcoin. <br/>
symbol name: BTC/INR <br/>
last price: ₹60,58,593 <br/>
24 hour change percentage: 0.01% <br/>
24 hour volume: 1,75,000 <br/>
24 hour high: ₹61,60,580 <br/>
24 hour low: ₹60,00,001 <br/>

**Test cases are expected. Preference will be given to people who writes clean code with unit test cases.**

Host the app in a public url. You can consider using vercel/netlify or similar platforms. **Add the url in a ReadMe.md file. Add your contact details in the readme file.** 

Raise a pull request with the repo once your code is ready to be submitted. PR should go into answers folder, keeping your name as the folder name for your complete submission. Your submission should go inside this path,

github.com/lightningnodes/assignment/answers/<your_name>

Reach out to menaka@pi42.com if you need any help from the team. 



