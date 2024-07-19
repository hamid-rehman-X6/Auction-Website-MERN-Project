import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BidderProfile.css";
import BidHistoryModel from "../BidHistory/BidHistoryModel";

function BidderProfile({ email }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showBidHistoryModal, setShowBidHistoryModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const bidderId = sessionStorage.getItem("bidderId");

      if (!bidderId) {
        alert("Bidder ID not found in session storage");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/bids/bidder/${bidderId}`
        );
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productData) => {
    setSelectedProduct(productData);
    setShowBidHistoryModal(true);
  };

  return (
    <>
      {loading ? (
        <div id="spinner-element-for-profile-page"></div>
      ) : (
        <div className="user-profile-container">
          <div className="user-profile-card">
            <div className="user-avatar">
              <div className="avatar-letter">{email.charAt(0)}</div>
              <div className="avatar-letter">{email.charAt(1)}</div>
            </div>
            <div className="user-details">
              <p>{email}</p>
            </div>
          </div>

          <div className="user-products">
            <h2>Products You've Bid On</h2>

            <div className="product-grid-for-profile-page">
              {Array.isArray(products) ? (
                products.map((productData) => {
                  const { product, bids } = productData;
                  const currentBidderId = sessionStorage.getItem("bidderId");

                  // console.log("Product ID:", product._id);
                  // console.log("Current Bidder ID:", currentBidderId);
                  // console.log("Highest Bidder ID:", product.highestBidder);

                  const isWinner =
                    product.daysLeft <= 0 &&
                    product.highestBidder === currentBidderId;

                  return (
                    <div
                      key={product._id}
                      className="product-card-for-profile-page"
                      onClick={() => handleProductClick(productData)}
                    >
                      <div className="product-image-for-profile">
                        <img
                          src={product.images[0]}
                          style={{ width: "100%", height: "100%" }}
                          alt={product.title}
                        />
                      </div>
                      <div className="product-details-for-profile">
                        <h3>{product.title}</h3>
                        <p>Starting Price: {product.startingPrice}</p>
                        <p>Category: {product.category}</p>
                        {isWinner && (
                          <p className="winner-status">Status: You Won!</p>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>Products data is not an array</p>
              )}
            </div>
          </div>
        </div>
      )}
      {showBidHistoryModal && (
        <BidHistoryModel
          product={selectedProduct.product}
          bids={selectedProduct.bids}
          onClose={() => setShowBidHistoryModal(false)}
        />
      )}
    </>
  );
}

export default BidderProfile;
