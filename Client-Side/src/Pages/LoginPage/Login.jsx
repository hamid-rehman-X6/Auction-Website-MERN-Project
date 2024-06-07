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
  const { setIsLoggedIn } = useContext(LoginContext);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");
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
      console.log(response.data);
      if (response.data === "Login Successfully") {
      }
      toast.success(response.data.msg, { position: "top-right" });

      sessionStorage.setItem("userRole", response.data.role);
      sessionStorage.setItem("userId", response.data.userId);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("email", values.email);

      setTimeout(() => {
        navigate("/home");
      }, 2000);
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
