# BIDBUY: Online Auction System
## Project Overview
BIDBUY is a comprehensive online auction platform designed as my final year project. It aims to revolutionize the auction experience by connecting sellers and bidders through a modern, efficient, and user-friendly interface. The platform leverages MERN stack technologies and provides real-time auction updates using Socket.io. Additionally, BIDBUY features a chatbot for seamless communication between sellers and bidders, ensuring a smooth and interactive auction process.

## Features

- **User Registration and Authentication**: Secure user registration and login system for both sellers and bidders.
- **Product Listing and Auction Creation**: Sellers can list products and create auctions with detailed descriptions and images.
- **Bidding System**: Bidders can place bids on auction items, with real-time updates on the highest bid.
- **Real-Time Auction Updates**: Leveraging Socket.io, users receive real-time updates on bids and auction status.
- **Chatbot Integration**: Using WebSocket and Socket.io, the platform includes a chatbot for seamless communication between sellers and bidders.
- **Payment Processing**: Secure and efficient payment processing for successful transactions.
  
## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Real-Time Communication**: Socket.io, WebSocket
- **Chatbot**: WebSocket, Socket.io
- **Version Control**: Git/GitHub
  
## Installation

To run this project locally, follow these steps:

1. **Clone the Repository**:

bash
git clone https://github.com/yourusername/BIDBUY.git
cd BIDBUY

2. **Install Dependencies**:

bash
npm install
cd client
npm install
cd ..

3. **Setup Environment Variables**:
   
Create a .env file in the root directory and add the following:

env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

4. **Run the Application**:

bash
npm run dev
The application will be available at http://localhost:3000.

## Usage

- **Register/Login**: Create an account or log in to your existing account.
- **Create Auction**: As a seller, list your products.
- **Place Bids**: As a bidder, explore the listed products and place your bids.
- **Real-Time Updates**: Receive real-time updates on bids and auction status.
- **Chat**: Use the integrated chatbot for seamless communication with sellers and bidders.
  
## Contributing
#### Contributions are welcome! To contribute:

- **Fork the repository**.
- **Create a new branch (git checkout -b feature-branch)**.
- **Make your changes**.
- **Commit your changes (git commit -m 'Add some feature')**.
- **Push to the branch (git push origin feature-branch)**.
- **Open a Pull Request**.

### License
This project is licensed under the MIT License. See the LICENSE file for more details.

### Contact
For any questions or feedback, please contact:

Muhammad Hamid Rehman
Email: your-email@example.com
LinkedIn: Your LinkedIn Profile
