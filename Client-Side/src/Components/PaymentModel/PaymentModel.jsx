import React, { useState } from "react";
import axios from "axios";
import "./PaymentModel.css";

const PaymentModel = ({ onClose, onPaymentInfoSaved }) => {
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const validateCardNumber = (cardNumber) => {
    const regex = /^[0-9]{16}$/;
    return regex.test(cardNumber);
  };

  const validateExpiryDate = (expiryDate) => {
    const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    return regex.test(expiryDate);
  };

  const validateCVV = (cvv) => {
    const regex = /^[0-9]{3,4}$/;
    return regex.test(cvv);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prevInfo) => ({ ...prevInfo, [name]: value }));

    let error = "";
    if (name === "cardNumber" && !validateCardNumber(value)) {
      error = "Card number must be 16 digits.";
    } else if (name === "expiryDate" && !validateExpiryDate(value)) {
      error = "Expiry date must be in MM/YY format.";
    } else if (name === "cvv" && !validateCVV(value)) {
      error = "CVV must be 3 or 4 digits.";
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cardNumberValid = validateCardNumber(paymentInfo.cardNumber);
    const expiryDateValid = validateExpiryDate(paymentInfo.expiryDate);
    const cvvValid = validateCVV(paymentInfo.cvv);

    if (!cardNumberValid || !expiryDateValid || !cvvValid) {
      setErrors({
        cardNumber: !cardNumberValid ? "Card number must be 16 digits." : "",
        expiryDate: !expiryDateValid
          ? "Expiry date must be in MM/YY format."
          : "",
        cvv: !cvvValid ? "CVV must be 3 or 4 digits." : "",
      });
      return;
    }
    try {
      // Get token from session storage
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      await axios.post("http://localhost:5000/savePaymentInfo", paymentInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onPaymentInfoSaved();
    } catch (error) {
      console.error("Error saving payment information:", error);
    }
  };

  return (
    <div className="payment-info-modal">
      <form onSubmit={handleSubmit}>
        <label>
          Card Number:
          <input
            type="text"
            name="cardNumber"
            value={paymentInfo.cardNumber}
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
            value={paymentInfo.expiryDate}
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
            value={paymentInfo.cvv}
            onChange={handleChange}
            required
          />
          {errors.cvv && <span className="error">{errors.cvv}</span>}
        </label>
        <button type="submit">Save Payment Info</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default PaymentModel;
