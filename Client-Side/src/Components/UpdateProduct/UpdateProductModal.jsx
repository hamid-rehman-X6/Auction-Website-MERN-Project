import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UpdateProduct.css";

const UpdateProductModal = ({ product, onClose, onUpdate }) => {
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/products/update/${product._id}`,
        updatedProduct
      );

      toast.success("Product updated successfully", { position: "top-right" });
      alert("UpdatedSuccesfully");
      onUpdate(response.data.product);
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product", { position: "top-right" });
    }
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <h2>Update Product</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={updatedProduct.title}
                onChange={handleChange}
                required
                className="input-type-for-productUpdateModal"
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={updatedProduct.description}
                onChange={handleChange}
                required
                className="input-type-for-productUpdateModal"
              />
            </label>
            <label>
              Category:
              <input
                type="text"
                name="category"
                value={updatedProduct.category}
                onChange={handleChange}
                required
                className="input-type-for-productUpdateModal"
              />
            </label>
            <label>
              Starting Price:
              <input
                type="number"
                name="startingPrice"
                value={updatedProduct.startingPrice}
                onChange={handleChange}
                required
                className="input-type-for-productUpdateModal"
              />
            </label>
            <button type="submit" className="updateModal-btn">
              Update Product
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UpdateProductModal;
