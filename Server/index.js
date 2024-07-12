const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const socketIo = require("socket.io");

const userRoutes = require("./Routes/userRoutes");
const adminRoutes = require("./Routes/adminRoutes");
const sellerRoutes = require("./Routes/sellerRoutes");
const bidderRoutes = require("./Routes/bidderRoutes");
const productRoutes = require("./Routes/productRoutes");
const auctionRoutes = require("./Routes/auctionRoutes");
const bidRoutes = require("./Routes/bidRoutes");

dotenv.config();

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.use(userRoutes);
app.use(adminRoutes);
app.use(sellerRoutes);
app.use(bidderRoutes);
app.use(productRoutes);
app.use(auctionRoutes);
app.use(bidRoutes);

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 5000;
const URL = process.env.MONGOURL;

mongoose.connect(URL).then(() => {
    console.log(`Database Connected Successfully.`);

    const server = http.createServer(app); // Create an HTTP server and pass the Express app to it
    // const io = socketIo(server, {
    //     cors: {
    //         origin: "*",
    //         methods: ["GET", "POST"],
    //     },
    // }); // Pass the server to socket.io and configure CORS

    // io.on("connection", (socket) => {
    //     console.log("Connected...");

    //     const {
    //         handleNewBid,
    //         handleAuctionStart,
    //         handleAuctionEnd,
    //         joinAuctionRoom,
    //         startChat,
    //         handleUserMessage,
    //     } = require("./Controllers/auctionController");

    //     socket.on("joinAuctionRoom", ({ product }) => joinAuctionRoom(io, product));
    //     socket.on("placeBid", (data) => handleNewBid(io, data));
    //     socket.on("startAuction", () => handleAuctionStart(io));
    //     socket.on("endAuction", () => handleAuctionEnd(io));
    //     socket.on("message", (msg) => handleUserMessage(socket, msg));
    //     socket.on("startChat", (data) => startChat(io, data));

    //     socket.on("disconnect", () => {
    //         console.log("Client disconnected");
    //     });
    // });

    server.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`);
    });
}).catch((error) => console.log(error));
