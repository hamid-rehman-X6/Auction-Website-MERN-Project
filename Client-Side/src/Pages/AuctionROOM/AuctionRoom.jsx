import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./AuctionRoom.css";

const socket = io("http://localhost:5000"); // Adjust to your backend URL

const AuctionRoom = ({ user, product }) => {
  const [currentBid, setCurrentBid] = useState("");
  const [highestBidder, setHighestBidder] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [isAuctionStarted, setIsAuctionStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isAuctionEnded, setIsAuctionEnded] = useState(false);

  useEffect(() => {
    socket.on("newBid", (data) => {
      setCurrentBid(data.amount);
      setHighestBidder(data.user);
    });

    socket.on("auctionStarted", () => {
      setIsAuctionStarted(true);
      setTimer(60); // Example timer of 60 seconds
    });

    socket.on("auctionEnded", (winner) => {
      setIsAuctionEnded(true);
      setHighestBidder(winner.user);
      alert(`${winner.user} won the auction with ${winner.amount}$`);
    });

    return () => {
      socket.off("newBid");
      socket.off("auctionStarted");
      socket.off("auctionEnded");
    };
  }, []);

  useEffect(() => {
    let interval;
    if (isAuctionStarted && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      socket.emit("endAuction", { user: highestBidder, amount: currentBid });
    }
    return () => clearInterval(interval);
  }, [isAuctionStarted, timer]);

  const handleBid = () => {
    if (bidAmount > currentBid) {
      socket.emit("placeBid", { user: user.name, amount: bidAmount });
      setBidAmount("");
    } else {
      alert("Your bid must be higher than the current bid.");
    }
  };

  const handleStartAuction = () => {
    if (user.role === "seller") {
      socket.emit("startAuction");
    } else {
      alert("Only the seller can start the auction.");
    }
  };

  return (
    <div className="auction-room">
      <h1>Auction Room</h1>
      <div className="product-details">
        <h2>{product}</h2>
        <p>{product}</p>
        <p>Current Highest Bid: {currentBid}$</p>
        <p>Highest Bidder: {highestBidder}</p>
        <div className="timer">
          {isAuctionStarted && !isAuctionEnded && <p>Time Left: {timer}s</p>}
        </div>
      </div>
      <div className="bid-section">
        {!isAuctionStarted && (
          <button onClick={handleStartAuction}>Start Auction</button>
        )}
        {isAuctionStarted && !isAuctionEnded && (
          <>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder="Enter your bid"
            />
            <button onClick={handleBid}>Place Bid</button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuctionRoom;
