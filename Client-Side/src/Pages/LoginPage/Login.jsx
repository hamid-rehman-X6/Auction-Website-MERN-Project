import React, { useContext, useState, useEffect } from "react";
import "./login.css";
import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import axios from "axios";
// import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginContext from "../../Context API/CreateContext";

const Login = () => {
  const { setIsLoggedIn, setIsSellerRegistered, setIsBidderRegistered, login } =
    useContext(LoginContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post("http://localhost:5000/login", values);
      console.log(response);
      if (response.data === "Login Successfully") {
      }
      toast.success(response.data.msg, { position: "top-right" });
      setTimeout(() => {
        navigate("/home");
      }, 1500);

      const userData = {
        userId: response.data.userId,
        role: response.data.role,
        token: response.data.token,
        isSellerRegistered: response.data.isSellerRegistered,
        isBidderRegistered: response.data.isBidderRegistered, // Assuming this is returned from the backend
        bidderId: response.data.bidderId,
      };
      console.log(userData);

      login(userData); // Set user data in context and localStorage
      sessionStorage.setItem("userRole", response.data.role);
      sessionStorage.setItem("userId", response.data.userId);
      sessionStorage.setItem("token", response.data.token); // Store JWT token

      if (response.data.role === "Bidder") {
        sessionStorage.setItem("bidderId", response.data.bidderId); // Store bidder ID for Bidder role
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("email", values.email);

      localStorage.setItem("user", JSON.stringify(response.data));

      setIsLoggedIn(true);
      setIsSellerRegistered(response.data.isSellerRegistered);
      setIsBidderRegistered(response.data.isBidderRegistered);

      if (
        response.data.role === "Seller" &&
        !response.data.isSellerRegistered
      ) {
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.msg === "Incorrect Password! Try Again"
      ) {
        console.log("Invalid password");
      }
      toast.error(error.response.data.msg, { position: "top-right" });
      if (
        error.response &&
        error.response.data &&
        error.response.data.msg === "User Not Exist"
      ) {
        console.log("User Not Exist");
      } else {
        console.error("An error occurred", error);
      }
    } finally {
      setSubmitting(false);
      // resetForm();
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="main">
        <div className="Login-image-logo">
          <img src="/LoginImage.png" alt="loginimage" />
        </div>
        <div className="login-box">
          <h2>Login</h2>

          <Formik
            initialValues={{ email: "", password: "" }}
            // validationSchema={validateSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="form">
                <span className="form-text">Email:</span>
                <Field
                  type="text"
                  placeholder="Enter Email"
                  name="email"
                  className="text-fields"
                  required
                  autoComplete="off"
                />
                <span className="form-text">Password:</span>
                <Field
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  name="password"
                  className="text-fields password-field"
                  required
                />
                {showPassword ? (
                  <BsEyeSlash
                    onClick={handleShowPassword}
                    className="password-toggle-icon"
                  />
                ) : (
                  <BsEye
                    onClick={handleShowPassword}
                    className="password-toggle-icon"
                  />
                )}

                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>
          <Link to="/forgot-password">
            <button className="btn-forget">Forgot Password</button>
          </Link>

          <hr />

          <span id="OR-TEXT">or</span>

          <p className="p-tag-for-login-page">
            Don't Have an account?{" "}
            <Link to={"/signup"} className="signup-link">
              <b>Sign Up </b>
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
