const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");

const userRoutes = require("./Routes/userRoutes");
const adminRoutes = require("./Routes/adminRoutes");
const sellerRoutes = require("./Routes/sellerRoutes");
const bidderRoutes = require("./Routes/bidderRoutes");
const productRoutes = require("./Routes/productRoutes");

dotenv.config();

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.use(userRoutes);
app.use(adminRoutes);
app.use(sellerRoutes);
app.use(bidderRoutes);
app.use(productRoutes);

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 5000;
const URL = process.env.MONGOURL;

mongoose.connect(URL).then(() => {
    console.log(`Database Connected Successfully.`);

    const server = http.createServer(app); // Create an HTTP server and pass the Express app to it
    const io = require('socket.io')(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    }); // Pass the server to socket.io and configure CORS

    let highestBid = 0;
    let highestBidder = "";
    let auctionInProgress = false;

    io.on('connection', (socket) => {
        console.log('Connected...');

        // Handle new bid
        socket.on('placeBid', (data) => {
            if (auctionInProgress && data.amount > highestBid) {
                highestBid = data.amount;
                highestBidder = data.user;
                io.emit('newBid', { amount: highestBid, user: highestBidder });
            }
        });

        // Handle auction start
        socket.on('startAuction', () => {
            auctionInProgress = true;
            highestBid = 0;
            highestBidder = "";
            io.emit('auctionStarted');
        });

        // Handle auction end
        socket.on('endAuction', () => {
            auctionInProgress = false;
            io.emit('auctionEnded', { user: highestBidder, amount: highestBid });
        });

        // Handle user messages
        socket.on('message', (msg) => {
            socket.broadcast.emit('message', msg);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    server.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`);
    });
}).catch(error => console.log(error));
