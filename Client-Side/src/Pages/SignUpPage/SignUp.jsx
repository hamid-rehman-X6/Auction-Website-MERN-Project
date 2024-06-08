import { Field, Form, Formik } from "formik";
import React, { useContext } from "react";
import * as Yup from "yup";
import axios from "axios";
import "./signup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

const SignUp = () => {
  const navigate = useNavigate();

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .typeError("Username must be a valid"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .matches(
        passwordRegex,
        "Must be UpperCase, LowerCase, Numeric & Special character."
      )
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    role: Yup.string().required("Role is required"),
  });

  const handleSubmit = async (values) => {
    // console.log(values);
    try {
      const response = await axios.post(`http://localhost:5000/signup`, values);
      console.log(response);
      toast.success(response.data.msg, { position: "top-right" });

      // store email on localstorage.
      localStorage.setItem("email", values.email);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.msg) {
        toast.error(error.response.data.msg, { position: "top-right" });
      } else {
        toast.error("An error occurred. Please try again.", {
          position: "top-right",
        });
      }
    }
  };
  return (
    <>
      <div className="register-container">
        <div className="signup-img-form">
          <img src="/SignUpImage.png" alt="" />
        </div>
        {/* <h2>Signup Account</h2> */}

        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="register-form">
              <h2>Signup</h2>
              <div className="form-group">
                <span>Username:</span>
                <Field
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  className={`field ${
                    errors.username && touched.username ? "error" : ""
                  }`}
                  autoComplete="off"
                />
                {errors.username && touched.username && (
                  <div className="error-message">{errors.username}</div>
                )}
              </div>

              <div className="form-group">
                <span>Email:</span>
                <Field
                  type="text"
                  name="email"
                  placeholder="abc@gmail.com"
                  className={`field ${
                    errors.email && touched.email ? "error" : ""
                  }`}
                  autoComplete="off"
                />
                {errors.email && touched.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>

              <div className="form-group">
                <span>Password:</span>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  className={`field ${
                    errors.password && touched.password ? "error" : ""
                  }`}
                />
                {errors.password && touched.password && (
                  <div className="error-message">{errors.password}</div>
                )}
              </div>

              <div className="form-group">
                <span>Confirm Password:</span>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className={`field ${
                    errors.confirmPassword && touched.confirmPassword
                      ? "error"
                      : ""
                  }`}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="error-message">{errors.confirmPassword}</div>
                )}
              </div>

              <div className="form-group">
                <span>Select Role:</span>
                <label>
                  <Field type="radio" name="role" value="Seller" />
                  Seller
                </label>
                <label>
                  <Field type="radio" name="role" value="Bidder" />
                  Bidder
                </label>
                {errors.role && touched.role && (
                  <div className="error-message">{errors.role}</div>
                )}
              </div>

              <button type="submit" className="btn-next">
                Register
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignUp;
