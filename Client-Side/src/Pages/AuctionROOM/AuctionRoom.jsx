import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AuctionRoom.css";

const AuctionRoom = () => {
  const [auctionedProducts, setAuctionedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuctionedProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/auctionedProducts`
        );
        console.log("API response:", response.data);
        if (response.data && Array.isArray(response.data.products)) {
          setAuctionedProducts(response.data.products);
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
              <div key={product._id} className="auction-product-card">
                <div className="auction-product-image">
                  <img src={product.images[0]} alt={product.title} />
                </div>
                <div className="auction-product-details">
                  <h3>{product.title}</h3>
                  <p>Starting Price: {product.startingPrice}</p>
                  <p>Category: {product.category}</p>
                </div>
              </div>
            ))
          ) : (
            <div>No products currently up for auction</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AuctionRoom;
