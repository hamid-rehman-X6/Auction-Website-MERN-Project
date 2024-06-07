import React, { useState } from "react";
import "../FORGOT-P/forgotpassword.css";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { id, token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:5000/reset-password/${id}/${token}`,
        { password }
      );
      console.log(response);
      alert("Password Updated Succesfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="forgot-password-container">
        <div className="forgot-password-card">
          <h2 className="forgot-password-title">Reset Password</h2>
          <form className="forgot-password-form" onSubmit={handleSubmit}>
            <div className="form-group-forgot">
              <label htmlFor="password" className="form-label-forgot">
                New Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input-forgot"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="forgot-send-btn">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
