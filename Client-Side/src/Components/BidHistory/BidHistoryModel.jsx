import React from "react";
import "./BidHistoryModel.css";

const BidHistoryModel = ({ product, bids, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Bid History for {product.title}</h2>
        <button onClick={onClose} className="close-btn">
          Close
        </button>
        <div className="bid-history">
          {bids.map((bid) => (
            <div key={bid._id} className="bid-record">
              <p>Bid Amount: {bid.bidValue}</p>
              {/* <p>Bidder ID: {bid.bidderId}</p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BidHistoryModel;
