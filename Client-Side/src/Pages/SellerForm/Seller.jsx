import React, { useContext } from "react";
import { useNavigate } from "react-router";
import "./seller.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginContext from "../../Context API/CreateContext";

const Seller = () => {
  const navigate = useNavigate();
  const { setIsSellerRegistered } = useContext(LoginContext);

  const validateSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    businessName: Yup.string().required("Business Name is required"),
    address: Yup.string().required("Address is required"),
    phoneNumber: Yup.string()
      .required("Phone Number is required")
      .matches(
        /^\+\d{2}-\d{3}-\d{7}$/,
        "Invalid Phone Number format (e.g., +92-313-xxxxxxx)"
      ),
    postalCode: Yup.string().required("Postal Code is required"),
    CNIC: Yup.string().required("CNIC Number is required"),

    companyDescription: Yup.string().required(
      "Company Description is required"
    ),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(`http://localhost:5000/seller`, values);
      // console.log(response.data.msg);
      toast.success(response.data.msg, { position: "top-right" });

      localStorage.setItem("isSellerRegistered", "true");
      setIsSellerRegistered(true);

      setTimeout(() => {
        navigate("/product-Listings");
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.error || "Internal Server Error", {
          position: "top-right",
        });
      } else {
        toast.error("Internal Server Error", { position: "top-right" });
      }
    } finally {
      setSubmitting(false); // Stop the Formik submitting spinner
    }
  };
  return (
    <>
      <div className="form-container-custom-S">
        <h2 className="custom-heading-S">Seller Registration</h2>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            businessName: "",
            address: "",
            phoneNumber: "",
            postalCode: "",
            CNIC: "",
            companyDescription: "",
          }}
          validationSchema={validateSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="row custom-row-S">
                <div className="form-group-custom-S">
                  <label htmlFor="firstName" className="custom-label-S">
                    First Name
                  </label>
                  <Field
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Hamid"
                    className="custom-input-S"
                  />

                  {errors.firstName && touched.firstName && (
                    <div className="Errors">{errors.firstName}</div>
                  )}
                </div>
                <div className="form-group-custom-S">
                  <label
                    aria-label="description"
                    htmlFor="lastName"
                    className="custom-label-S"
                  >
                    Last Name
                  </label>
                  <Field
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Rehman"
                    className="custom-input-S"
                  />

                  {errors.lastName && touched.lastName && (
                    <div className="Errors">{errors.lastName}</div>
                  )}
                </div>
              </div>
              <div className="row custom-row-S">
                <div className="form-group-custom-S">
                  <label htmlFor="businessName" className="custom-label-S">
                    Business Name
                  </label>
                  <Field
                    type="text"
                    id="businessName"
                    name="businessName"
                    placeholder="e.g, Systems Limited"
                    className="custom-input-S"
                  />

                  {errors.businessName && touched.businessName && (
                    <div className="Errors">{errors.businessName}</div>
                  )}
                </div>
              </div>
              <div className="row custom-row-S">
                <div className="form-group-custom-S">
                  <label htmlFor="address" className="custom-label-S">
                    Address
                  </label>
                  <Field
                    type="text"
                    id="address"
                    name="address"
                    placeholder="123 Fake Street"
                    className="custom-input-S"
                  />

                  {errors.address && touched.address && (
                    <div className="Errors">{errors.address}</div>
                  )}
                </div>
              </div>
              <div className="row custom-row-S">
                <div className="form-group-custom-S">
                  <label htmlFor="phoneNumber" className="custom-label-S">
                    Phone Number
                  </label>
                  <Field
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="+92-xxx-xxxxxxx"
                    className="custom-input-S"
                  />

                  {errors.phoneNumber && touched.phoneNumber && (
                    <div className="Errors">{errors.phoneNumber}</div>
                  )}
                </div>
                <div className="form-group-custom-S">
                  <label htmlFor="postalCode" className="custom-label-S">
                    Postal Code
                  </label>
                  <Field
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    placeholder="Enter Your Postal Code"
                    className="custom-input-S"
                  />

                  {errors.postalCode && touched.postalCode && (
                    <div className="Errors">{errors.postalCode}</div>
                  )}
                </div>
              </div>

              <div className="row custom-row-S">
                <div className="form-group-custom-S">
                  <label htmlFor="CNIC" className="custom-label-S">
                    CNIC Number
                  </label>
                  <Field
                    type="text"
                    id="CNIC"
                    name="CNIC"
                    placeholder="xxxxx-xxxxxxx-x"
                    className="custom-input-S"
                  />

                  {errors.CNIC && touched.CNIC && (
                    <div className="Errors">{errors.CNIC}</div>
                  )}
                </div>
              </div>

              <div className="row custom-row-S">
                <div className="form-group-custom-S">
                  <label
                    htmlFor="companyDescription"
                    className="custom-label-S"
                  >
                    Company Description
                  </label>
                  <Field
                    as="textarea"
                    id="companyDescription"
                    name="companyDescription"
                    placeholder="Briefly describe your company's products or services..."
                    className="custom-textarea-S"
                  />

                  {errors.companyDescription && touched.companyDescription && (
                    <div className="Errors">{errors.companyDescription}</div>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="submit-button-custom-S"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </>
  );
};

export default Seller;
