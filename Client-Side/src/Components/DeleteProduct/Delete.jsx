import React from "react";
import axios from "axios";
import "./delete.css";

const Delete = ({ product, onDelete, userRole }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/products/delete/${product._id}`
      );
      onDelete(product._id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="delete-product-container">
      {userRole === "Seller" && (
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      )}
    </div>
  );
};

export default Delete;
