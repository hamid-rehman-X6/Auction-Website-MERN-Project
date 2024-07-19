import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AuctionRoom.css";
import AuctionModal from "../../Components/AuctionModel/AuctionModel";
import AuctionEnded from "../../Components/AuctionEnded/AuctionEnded";
import PaymentModel from "../../Components/PaymentModel/PaymentModel";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";

const AuctionRoom = () => {
  const [auctionedProducts, setAuctionedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEndedModal, setShowEndedModal] = useState(false);
  const [showPaymentInfoModal, setShowPaymentInfoModal] = useState(false);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuctionedProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/auctionedProducts`
        );
        if (response.data && Array.isArray(response.data.products)) {
          const updatedProducts = response.data.products.map((product) => {
            const startDate = new Date(product.auctionStartDate);
            const endDate = new Date(product.auctionEndDate);
            const currentDate = new Date();

            const timeDiff = endDate.getTime() - currentDate.getTime();
            const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

            return {
              ...product,
              daysLeft: daysLeft >= 0 ? daysLeft : 0, // Ensure daysLeft is non-negative
            };
          });
          setAuctionedProducts(updatedProducts);
        } else {
          setAuctionedProducts([]);
        }
      } catch (error) {
        console.error("Error fetching auctioned products:", error);
        setAuctionedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctionedProducts();

    // Refresh every minute to update daysLeft dynamically
    const interval = setInterval(fetchAuctionedProducts, 60000); // 60 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  const handleProductClick = async (product) => {
    if (product.daysLeft <= 0) {
      setSelectedProduct(product);
      setShowEndedModal(true);
      return; // or handle differently as per your UI/UX design
    }
    // Get token from session storage
    const token = sessionStorage.getItem("token");
    const userRole = sessionStorage.getItem("userRole");
    console.log(userRole);
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      if (userRole !== "Seller") {
        const response = await axios.get(
          "http://localhost:5000/checkPaymentInfo",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.paymentInfoProvided) {
          setSelectedProduct(product);
        } else {
          setShowPaymentInfoModal(true);
        }
      } else {
        toast.error("Only bidders can Place Bid on this Product");
      }
    } catch (error) {
      console.error("Error checking payment info:", error);
    }
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setShowEndedModal(false);
    setShowPaymentInfoModal(false);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setAuctionedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
    setSelectedProduct(updatedProduct); // Update the selected product details
  };

  const handlePaymentInfoSaved = () => {
    setShowPaymentInfoModal(false);
    setSelectedProduct((prevProduct) => prevProduct); // Reopen the auction modal
  };

  // Filter the products based on the selected filter
  const filteredProducts = auctionedProducts.filter((product) => {
    if (filter === "running") {
      return product.daysLeft > 0;
    } else if (filter === "ended") {
      return product.daysLeft <= 0;
    }
    return true;
  });

  const handleProceed = (productId) => {
    navigate(`/payment/${productId}`);
  };
  return (
    <div className="auction-room-container">
      {loading ? (
        <div id="spinner-element"></div>
      ) : (
        <div className="auction-grid">
          <h2 className="focus-in-expand">
            Get Ready to Bid on These Hot Items!
          </h2>

          <div className="filter-container">
            <label>
              <input
                type="radio"
                value="running"
                checked={filter === "running"}
                onChange={() => setFilter("running")}
              />
              Currently Running Auctions
            </label>
            <label>
              <input
                type="radio"
                value="ended"
                checked={filter === "ended"}
                onChange={() => setFilter("ended")}
              />
              Ended Auctions
            </label>
          </div>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="auction-product-card"
                onClick={() => handleProductClick(product)}
              >
                <div className="auction-product-image">
                  <img src={product.images[0]} alt={product.title} />
                </div>
                <div className="auction-product-details">
                  <div className="first-three-p-tag">
                    <h3>{product.title}</h3>
                    <p>Starting Price: {product.startingPrice}</p>
                    <p>Category: {product.category}</p>
                  </div>

                  <div className="two-ptags-right-side">
                    {product.daysLeft <= 0 ? (
                      <>
                        <p className="days-left">Auction Ended</p>
                        <p className="winner-name">
                          Winner:{" "}
                          {product.highestBidder
                            ? product.highestBidder
                            : "No bids placed"}
                        </p>

                        {product.highestBidder && (
                          <button
                            className="proceed-button"
                            onClick={() => handleProceed(product._id)}
                          >
                            Proceed to Payment
                          </button>
                        )}
                      </>
                    ) : (
                      <p className="days-left">Days left: {product.daysLeft}</p>
                    )}
                    <p className="C-H-B">
                      Current Highest Bid: {product.currentPrice}
                    </p>
                    <p className="h-b-n">
                      Highest Bidder Name:{" "}
                      <span className="h-b-n-1">
                        {product.highestBidder || "None"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No products currently up for auction</div>
          )}
        </div>
      )}
      {selectedProduct && !showEndedModal && !showPaymentInfoModal && (
        <AuctionModal
          product={selectedProduct}
          onClose={closeModal}
          updateProduct={handleUpdateProduct}
        />
      )}

      {selectedProduct && showEndedModal && (
        <AuctionEnded product={selectedProduct} onClose={closeModal} />
      )}

      {showPaymentInfoModal && (
        <PaymentModel
          onClose={closeModal}
          onPaymentInfoSaved={handlePaymentInfoSaved}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default AuctionRoom;
