import React, { useContext } from "react";
import "./bidder.css";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginContext from "../../Context API/CreateContext";

const Bidder = () => {
  const navigate = useNavigate();
  const { setIsBidderRegistered } = useContext(LoginContext);

  const validateSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    address: Yup.string().required("Address is required"),
    phoneNumber: Yup.string()
      .required("Phone Number is required")
      .matches(
        /^\+\d{2}-\d{3}-\d{7}$/,
        "Invalid Phone Number format (e.g., +92-313-xxxxxxx)"
      ),
    CNIC: Yup.string().required("CNIC Number is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(`http://localhost:5000/bidder`, values);
      console.log(response);
      toast.success(response.data.msg, { position: "bottom-right" });

      localStorage.setItem("isBidderRegistered", "true");
      setIsBidderRegistered(true);

      const from = location.state?.from?.pathname || "/product-Page";
      navigate(from);
      // setTimeout(() => {
      //   navigate("/product-Details");
      // }, 2000);
    } catch (error) {
      if (error.response && error.response.data) {
        // console.log("Error Response Data:", error.response.data.error);
        toast.error("CNIC Already Exist ", { position: "bottom-right" });
      } else {
        toast.error("Internal Server Error", { position: "bottom-right" });
      }
    }
  };

  return (
    <>
      <div className="form-container-custom-S">
        <h2 className="custom-heading-S">Bidder Registration</h2>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            address: "",
            phoneNumber: "",
            CNIC: "",
          }}
          validationSchema={validateSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
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
                    <div className="err">{errors.firstName}</div>
                  )}
                </div>
                <div className="form-group-custom-S">
                  <label htmlFor="lastName" className="custom-label-S">
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
                    <div className="err">{errors.lastName}</div>
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
                    <div className="err">{errors.address}</div>
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
                    <div className="err">{errors.phoneNumber}</div>
                  )}
                </div>
              </div>

              <div className="row custom-row-S">
                <div className="form-group-custom-S">
                  <label htmlFor="CNIC" className="custom-label-S">
                    CNIC
                  </label>
                  <Field
                    type="text"
                    id="CNIC"
                    name="CNIC"
                    placeholder="xxxxx-xxxxxxx-x"
                    className="custom-input-S"
                  />
                  {errors.CNIC && touched.CNIC && (
                    <div className="err">{errors.CNIC}</div>
                  )}
                </div>
              </div>

              <button type="submit" className="submit-button-custom-S">
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

export default Bidder;
