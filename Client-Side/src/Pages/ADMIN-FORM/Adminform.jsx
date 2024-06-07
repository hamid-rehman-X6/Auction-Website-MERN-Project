import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./adminform.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import LoginContext from "../../Context API/CreateContext";

const Adminform = () => {
  const navigate = useNavigate();
  const { setIsAdminLoggedIn, isAdminLoggedIn } = useContext(LoginContext);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isAdminLoggedIn");
    if (loggedIn === "true") {
      setIsAdminLoggedIn(true);
      navigate("/admin");
    }
  }, [setIsAdminLoggedIn, navigate]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(`http://localhost:5000/admin`, values);
      console.log(response.data.message);
      if (response.status === 201) {
        toast.success(response.data.message, { position: "bottom-right" });
        localStorage.setItem("isAdminLoggedIn", "true");
        setIsAdminLoggedIn(true);

        setTimeout(() => {
          navigate("/admin");
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message, { position: "bottom-right" });
      } else {
        toast.error("Network Error", { position: "bottom-right" });
      }
    }
  };

  return (
    <div className="admin-form-container">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="admin-form">
          <div className="admin-form-left">
            <img src="/AdminLogo.png" alt="Admin" className="admin-image" />
          </div>

          <div className="admin-form-field">
            <label htmlFor="email" className="admin-form-label">
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="admin-form-input"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="admin-form-field">
            <label htmlFor="password" className="admin-form-label">
              Password
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="admin-form-input"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="admin-form-button">
            Login
          </button>
        </Form>
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default Adminform;
