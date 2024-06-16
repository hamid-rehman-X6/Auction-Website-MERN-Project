// ProductPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./productpage.css";

import { useNavigate } from "react-router";

const ProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    handleSort(value);
  };

  const handleSort = (value) => {
    const sortedData = [...products];
    switch (value) {
      case "az":
        sortedData.sort((a, b) => a.title.localeCompare(b.title));
        setProducts(sortedData);
        break;
      case "za":
        sortedData.sort((a, b) => b.title.localeCompare(a.title));
        setProducts(sortedData);
        break;
      case "low":
        sortedData.sort((a, b) => a.startingPrice - b.startingPrice);
        setProducts(sortedData);
        break;
      case "high":
        sortedData.sort((a, b) => b.startingPrice - a.startingPrice);
        setProducts(sortedData);
        break;
      default:
        break;
    }
  };

  const filteredData = products.filter((item) => {
    return item.title.toLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    window.scroll(0, 0);
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products/get");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      {loading ? (
        <div id="spinner-element"></div>
      ) : (
        <div className="product-page-container">
          <div className="search-container">
            <div className="dropdown-container">
              <select
                className="dropdown"
                value={selectedOption}
                onChange={handleChange}
              >
                <option value="">Sort By</option>
                <option value="az">Sort A to Z</option>
                <option value="za">Sort Z to A</option>
                <option value="low">Price Low to High</option>
                <option value="high">Price High to Low</option>
              </select>
            </div>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search Products By Title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="product-grid">
            {filteredData.map((product) => (
              <div key={product._id} className="product-card">
                <div
                  className="images"
                  onClick={() => navigate(`/product-Details/${product._id}`)}
                >
                  <img
                    src={product.images[0]}
                    style={{ width: "100%", height: "100%" }}
                    alt=""
                  />
                </div>

                <div className="product-title-info-section">
                  <h2 className="product-title-h2-class">{product.title}</h2>
                  <p>
                    <strong>Category:</strong> {product.category}
                  </p>
                  <p>
                    <strong>Starting Price:</strong> {product.startingPrice}
                  </p>
                  <p>
                    <strong>Seller:</strong> {product.sellerName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
