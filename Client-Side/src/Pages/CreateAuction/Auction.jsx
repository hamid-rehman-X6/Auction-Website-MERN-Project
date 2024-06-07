import React from "react";
import "./auction.css";
import { useNavigate } from "react-router";

const Auction = () => {
  window.scroll(0, 0);
  const navigate = useNavigate();

  return (
    <>
      <div className="main-auction-page-container">
        <div className="auction-image-div">
          <img src="./Auction-Page.jpg" alt="" />
        </div>
      </div>

      <h2 className="h2-heading">Start your e-Auction jounery now!</h2>
      {/* <p className="p-text">Select your Role: Seller or Bidder</p> */}
      <div className="card-container">
        <div className="card seller-card">
          <h3 className="h3-heading-card">Seller</h3>
          <img src="./seller-img.jpg" alt="Seller" className="card-image" />
          <div className="card-overlay">
            <button onClick={() => navigate("/sellerform")}>Seller</button>
          </div>
        </div>
        <div className="card bidder-card">
          <h3 className="h3-heading-card">Bidder</h3>
          <img src="./bidder-img.png" alt="Bidder" className="card-image" />
          <div className="card-overlay">
            <button onClick={() => navigate("/bidderform")}>Bidder</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auction;
