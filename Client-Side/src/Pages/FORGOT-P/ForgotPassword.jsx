import React, { useState } from "react";
import "./forgotpassword.css";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/forgot-password",
        { email }
      );
      console.log(response);
      console.log("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  return (
    <>
      <div className="forgot-password-container">
        <div className="forgot-password-card">
          <h2 className="forgot-password-title">Forgot Password</h2>
          <form className="forgot-password-form" onSubmit={handleSubmit}>
            <div className="form-group-forgot">
              <label htmlFor="email" className="form-label-forgot">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input-forgot"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="forgot-send-btn">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
