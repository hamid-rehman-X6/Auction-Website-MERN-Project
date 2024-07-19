const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
// const http = require("http");
// const socketIo = require("socket.io");

const userRoutes = require("./Routes/userRoutes");
const adminRoutes = require("./Routes/adminRoutes");
const sellerRoutes = require("./Routes/sellerRoutes");
const bidderRoutes = require("./Routes/bidderRoutes");
const productRoutes = require("./Routes/productRoutes");
const auctionRoutes = require("./Routes/auctionRoutes");
const bidRoutes = require("./Routes/bidRoutes");
// const chatRoutes = require("./Routes/chatRoutes")
// const chatControllers = require("./Controllers/chatController")
const paymentRoutes = require("./Routes/paymentRoutes");

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
// app.use(chatRoutes);
app.use(paymentRoutes);

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 5000;
const URL = process.env.MONGOURL;

mongoose.connect(URL).then(() => {
    console.log(`Database Connected Successfully.`);

    app.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`);
    });
}).catch((error) => console.log(error));
