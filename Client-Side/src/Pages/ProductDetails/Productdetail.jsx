import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./productDetail.css";
import LoginContext from "../../Context API/CreateContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { isBidderRegistered } = useContext(LoginContext);

  useEffect(() => {
    window.scroll(0, 0);
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${id}`
        );
        setProduct(response.data);
        setMainImage(response.data.images[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleImageClick = (index) => {
    setMainImage(product.images[index]);
  };

  const handleStartBiddingClick = () => {
    if (!isBidderRegistered) {
      alert("Please fill the bidder form first.");
      navigate("/bidderform", { state: { from: location } });
    } else {
      navigate(`/auction-Room`, { state: { product } });
    }
  };
  if (!product) {
    return (
      <ul className="ul-for-product-detail">
        <li className="dot"></li>
        <li className="dot"></li>
        <li className="dot"></li>
      </ul>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="product-image-container " id="productimgs">
        <div>
          <img src={mainImage} alt="" />
        </div>
        <div>
          {product.images.map((image, index) => (
            <div key={index} onClick={() => handleImageClick(index)}>
              <img src={image} alt="" />
            </div>
          ))}
        </div>
      </div>

      <div className="product-info-container">
        <div className="seller-info-container">
          <div className="SellerName-product-detail">
            Seller Name: #{product.sellerName}
          </div>
          <button
            className="start-bidding-btn"
            onClick={handleStartBiddingClick}
          >
            Start Bidding Now
          </button>
        </div>

        <div className="category-product-detail">
          <h5>{product.category}</h5>
        </div>

        <div className="title-product-detail">
          <h2>{product.title}</h2>
        </div>

        <div className="startingPrice-product-detail">
          <p className="statingPrice-text">Starting Price</p>
          <h1>{product.startingPrice}</h1>
        </div>

        <div className="description-product-detail">
          <p className="description-text">{product.description}</p>
        </div>

        <div className="auction-start-date">
          <p className="auction-S-D-text">Auction Starts On:</p>
          <p className="auction-S-D-date">{product.auctionStartDate} </p>
        </div>

        <div className="auction-end-date">
          <p className="auction-E-D-text">Auction Ends On:</p>
          <p className="auction-E-D-date">{product.auctionEndDate} </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
