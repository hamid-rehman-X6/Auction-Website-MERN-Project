import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const sellerId = sessionStorage.getItem("userId");
      // console.log("Fetched Seller ID: ", sellerId);

      if (!sellerId) {
        console.error("Seller ID not found in session storage");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/products/seller/${sellerId}`
        );
        // console.log("Response data:", response.data);
        setProducts(response.data.products);
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

  return (
    <>
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
          <h2>Your Product Ads</h2>
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

                  <div className="product-actions-for-profile-page">
                    <button
                      className="delete-btn-profile"
                      onClick={() => handleDeleteBtn(product._id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                    <button className="update-btn-profile">
                      <i className="fas fa-edit"></i>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Products data is not an array</p>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Profile;

// const handleUpdateProduct = (id, updatedProduct) => {
//   setUser((prevUser) => ({
//     ...prevUser,
//     products: prevUser.products.map((product) =>
//       product.id === id ? updatedProduct : product
//     ),
//   }));
// };
