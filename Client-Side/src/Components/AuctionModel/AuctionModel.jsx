import React, { useState } from "react";
import "./AuctionModel.css";
import axios from "axios";

const AuctionModal = ({ product, onClose, updateProduct }) => {
  const [bidValue, setBidValue] = useState(
    product.currentPrice > 0 ? product.currentPrice : product.startingPrice
  );
  const [bidPlaced, setBidPlaced] = useState(false); // State to track if bid was successfully placed

  const handlePlaceBid = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await axios.post(
        `http://localhost:5000/placeBid`,
        {
          productId: product._id,
          bidValue: bidValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      updateProduct(response.data.product);
      console.log(response.data.product);
      alert("Bid Placed Successfully");
      // setBidPlaced(true); // Set bidPlaced to true after successful bid
      onClose(); // Close the modal after successful bid
    } catch (error) {
      console.error("Error placing bid:", error);
    }
  };

  // Render nothing if bidPlaced is true
  if (bidPlaced) {
    return null;
  }

  return (
    <div className="auction-modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>{product.title}</h2>
        <p>
          <strong>Product ID:</strong> {product._id}
        </p>
        <p>
          <strong>Starting Price:</strong> {product.startingPrice}
        </p>
        <p>
          <strong>Highest Bidder Name:</strong>{" "}
          {product.highestBidder ? product.highestBidder : "None"}
        </p>
        <p>
          <strong>Highest Bidder Id: {product.highestBidderId}</strong>
        </p>
        <p>
          <strong>Current Highest Bid Value:</strong> {product.currentPrice}
        </p>

        {product.daysLeft <= 0 && (
          <p className="auction-closed-msg">Auction Closed</p>
        )}
        {product.daysLeft > 0 && (
          <div className="bid-section">
            <input
              type="number"
              value={bidValue}
              onChange={(e) => setBidValue(e.target.value)}
              min={
                product.currentPrice > 0
                  ? product.currentPrice
                  : product.startingPrice
              }
            />
            <button
              className="auctionModal-increment-btn"
              onClick={() => setBidValue(bidValue + 1)}
            >
              Increment
            </button>
          </div>
        )}
        <button className="place-bid-button" onClick={handlePlaceBid}>
          Place Bid
        </button>
      </div>
    </div>
  );
};

export default AuctionModal;
