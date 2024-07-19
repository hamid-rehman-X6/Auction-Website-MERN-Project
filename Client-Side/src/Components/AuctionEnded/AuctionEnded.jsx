// AuctionEndedModal.js
import React from "react";
import "./AuctionEnded.css"; // Add your CSS for styling the modal

const AuctionEnded = ({ product, onClose }) => {
  return (
    <div className="auction-ended-modal-overlay">
      <div className="auction-ended-modal">
        <h2>Auction Ended</h2>
        <p>The auction for {product.title} has ended. Bidding is closed.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AuctionEnded;
