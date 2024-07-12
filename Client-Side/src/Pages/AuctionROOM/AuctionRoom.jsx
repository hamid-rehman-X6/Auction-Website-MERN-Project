import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AuctionRoom.css";
import AuctionModal from "../../Components/AuctionModel/AuctionModel";

const AuctionRoom = () => {
  const [auctionedProducts, setAuctionedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchAuctionedProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/auctionedProducts`
        );
        console.log("API response:", response.data);
        if (response.data && Array.isArray(response.data.products)) {
          const updatedProducts = response.data.products.map((product) => {
            const startDate = new Date(product.auctionStartDate);
            const endDate = new Date(product.auctionEndDate);
            const timeDiff = endDate.getTime() - startDate.getTime();
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
  }, []);

  const handleProductClick = (product) => {
    if (product.daysLeft <= 0) {
      alert("Auction for this product has ended. Bidding is closed.");
      return; // or handle differently as per your UI/UX design
    }
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setAuctionedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
    setSelectedProduct(updatedProduct); // Update the selected product details
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
          {auctionedProducts.length > 0 ? (
            auctionedProducts.map((product) => (
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
                      <p className="days-left">Auction Ended</p>
                    ) : (
                      <p className="days-left">Days left: {product.daysLeft}</p>
                    )}
                    <p className="C-H-B">
                      Current Highest Bid: {product.currentPrice}
                    </p>
                    <p className="h-b-n">
                      Highest Bidder Name: {product.highestBidder || "None"}
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
      {selectedProduct && (
        <AuctionModal
          product={selectedProduct}
          onClose={closeModal}
          updateProduct={handleUpdateProduct}
        />
      )}
    </div>
  );
};

export default AuctionRoom;
