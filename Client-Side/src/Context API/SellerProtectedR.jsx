import React, { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import LoginContext from "./CreateContext";

const SellerProtectedR = ({ children }) => {
  const { isSellerRegistered } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSellerRegistered) {
      alert("Please fill out the seller form first.");
      navigate("/sellerform");
    }
  }, [isSellerRegistered, navigate]);

  return isSellerRegistered ? children : <Navigate to="/sellerform" />;
};

export default SellerProtectedR;
