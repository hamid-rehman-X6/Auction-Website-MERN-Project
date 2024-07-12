import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import { useNavigate } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import UpdateProductModal from "../../Components/UpdateProduct/UpdateProductModal";

function Profile() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const userId = sessionStorage.getItem("userId");
      console.log("Fetched User ID: ", userId);
      const userRole = sessionStorage.getItem("userRole");
      console.log(userRole);
      const bidderId = sessionStorage.getItem("bidderId");
      console.log(bidderId);

      if (!userId) {
        alert("Seller ID not found in session storage");
        return;
      }

      try {
        let response;
        if (userRole === "Seller") {
          response = await axios.get(
            `http://localhost:5000/products/seller/${userId}`
          );
        } else if (userRole === "Bidder") {
          response = await axios.get(
            `http://localhost:5000/bids/bidder/${bidderId}`
          );
        }

        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn");
      if (loggedIn !== "true") {
        navigate("/login");
      }
    };

    const retrieveEmail = () => {
      const storedEmail = localStorage.getItem("email");
      if (storedEmail) {
        setEmail(storedEmail);
      }
    };

    fetchProducts();
    checkLoginStatus();
    retrieveEmail();
  }, [navigate]);

  const showDeleteNotification = () => {
    alert("Product Deleted");
  };

  //  Product Delete function
  const handleDeleteBtn = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/products/delete/${productId}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
      showDeleteNotification();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdateBtn = async (product) => {
    setSelectedProduct(product);
    setShowUpdateModal(true);
    // navigate("/update-product");
  };

  const handleUpdate = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
    setShowUpdateModal(false);
  };

  const handlePlaceForAuction = async (productId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/products/placeAuction/${productId}`
      );

      console.log(response);

      const updatedProduct = response.data.product;
      console.log(updatedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        )
      );
      alert("Product placed for auction successfully");
      navigate("/auction-Room");
    } catch (error) {
      console.error("Error placing product for auction:", error);
    }
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
            <h2>
              {sessionStorage.getItem("userRole") === "Seller"
                ? "Your Products Ads"
                : "Products You've Bid On"}
            </h2>

            <div className="product-grid-for-profile-page">
              {Array.isArray(products) ? (
                products.map((product) => (
                  <div
                    key={product._id}
                    className="product-card-for-profile-page"
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
                    </div>

                    {sessionStorage.getItem("userRole") === "Seller" && (
                      <div className="product-actions-for-profile-page">
                        <button
                          className="delete-btn-profile"
                          onClick={() => handleDeleteBtn(product._id)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                        <button
                          className="update-btn-profile"
                          onClick={() => handleUpdateBtn(product)}
                        >
                          <i className="fas fa-edit"></i>
                        </button>

                        {!product.isAuctioned && (
                          <button
                            className="auction-btn-profile"
                            onClick={() => handlePlaceForAuction(product._id)}
                          >
                            <i className="fas fa-gavel"></i>
                            <span className="tooltiptext">Place Bid</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>Products data is not an array</p>
              )}
            </div>
          </div>
        </div>
      )}
      {showUpdateModal && (
        <UpdateProductModal
          product={selectedProduct}
          onClose={() => setShowUpdateModal(false)}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
}

export default Profile;
