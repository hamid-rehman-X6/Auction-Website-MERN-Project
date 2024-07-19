import React, { useState } from "react";
import axios from "axios";
import "./Payment.css";
import { useParams } from "react-router-dom";
import ConfirmationModal from "../../Components/ConfirmModel/Confirmation";

const Payment = () => {
  const { productId } = useParams();
  const [paymentDetails, setPaymentDetails] = useState({
    name: "",
    address: "",
    permanentAddress: "",
    postalCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    paymentMethod: "",
  });
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    // Clear errors on input change
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      // Fake backend interaction
      console.log("Payment details submitted: ", paymentDetails);
      // alert("Payment processed successfully (simulation).");
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!paymentDetails.name.trim()) {
      errors.name = "Name is required";
      valid = false;
    }

    if (!paymentDetails.address.trim()) {
      errors.address = "Address is required";
      valid = false;
    }

    if (!paymentDetails.permanentAddress.trim()) {
      errors.permanentAddress = "Permanent Address is required";
      valid = false;
    }

    if (!paymentDetails.postalCode.trim()) {
      errors.postalCode = "Postal Code is required";
      valid = false;
    }

    if (!paymentDetails.cardNumber.trim()) {
      errors.cardNumber = "Card Number is required";
      valid = false;
    } else if (!/^\d{16}$/.test(paymentDetails.cardNumber.trim())) {
      errors.cardNumber = "Card Number must be 16 digits";
      valid = false;
    }

    if (!paymentDetails.expiryDate.trim()) {
      errors.expiryDate = "Expiry Date is required";
      valid = false;
    } else if (!/^\d{2}\/\d{2}$/.test(paymentDetails.expiryDate.trim())) {
      errors.expiryDate = "Expiry Date must be in MM/YY format";
      valid = false;
    }

    if (!paymentDetails.cvv.trim()) {
      errors.cvv = "CVV is required";
      valid = false;
    } else if (!/^\d{3}$/.test(paymentDetails.cvv.trim())) {
      errors.cvv = "CVV must be 3 digits";
      valid = false;
    }

    if (!paymentDetails.paymentMethod.trim()) {
      errors.paymentMethod = "Payment Method is required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  return (
    <div className="payment-page-container">
      <h2 className="stripe-heading-h2">
        Stripe Payment for Product ID: <span># {productId}</span>
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="payment-form-container">
          <div className="left-container">
            <div className="input-group">
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={paymentDetails.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </label>
              <label>
                Address:
                <input
                  type="text"
                  name="address"
                  value={paymentDetails.address}
                  onChange={handleChange}
                  required
                />
                {errors.address && (
                  <span className="error">{errors.address}</span>
                )}
              </label>
            </div>
            <div className="input-group">
              <label>
                Permanent Address:
                <input
                  type="text"
                  name="permanentAddress"
                  value={paymentDetails.permanentAddress}
                  onChange={handleChange}
                  required
                />
                {errors.permanentAddress && (
                  <span className="error">{errors.permanentAddress}</span>
                )}
              </label>
              <label>
                Postal Code:
                <input
                  type="text"
                  name="postalCode"
                  value={paymentDetails.postalCode}
                  onChange={handleChange}
                  required
                />
                {errors.postalCode && (
                  <span className="error">{errors.postalCode}</span>
                )}
              </label>
            </div>
            <div className="input-group">
              <label>
                Card Number:
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentDetails.cardNumber}
                  onChange={handleChange}
                  required
                />
                {errors.cardNumber && (
                  <span className="error">{errors.cardNumber}</span>
                )}
              </label>
              <label>
                Expiry Date:
                <input
                  type="text"
                  name="expiryDate"
                  value={paymentDetails.expiryDate}
                  onChange={handleChange}
                  required
                />
                {errors.expiryDate && (
                  <span className="error">{errors.expiryDate}</span>
                )}
              </label>
              <label>
                CVV:
                <input
                  type="text"
                  name="cvv"
                  value={paymentDetails.cvv}
                  onChange={handleChange}
                  required
                />
                {errors.cvv && <span className="error">{errors.cvv}</span>}
              </label>
            </div>
          </div>
          <div className="right-container">
            <img
              src="/stripe-logo-2.png"
              alt="Stripe Logo"
              className="stripe-logo"
            />
            <div className="input-group">
              <label>
                Payment Method:
                <select
                  name="paymentMethod"
                  value={paymentDetails.paymentMethod}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Payment Method</option>
                  <option value="debit">Debit Card</option>
                  <option value="credit">Credit Card</option>
                  <option value="visa">Visa</option>
                  <option value="mastercard">Mastercard</option>
                </select>
                {errors.paymentMethod && (
                  <span className="error">{errors.paymentMethod}</span>
                )}
              </label>
            </div>
            <button type="submit" id="payment-submit-btn">
              Submit Payment
            </button>
          </div>
        </div>
      </form>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Payment;
