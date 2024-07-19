import React, { useContext, useEffect, useState } from "react";
import "./productListing.css";
import axios from "axios";
import FileBase64 from "react-file-base64";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import LoginContext from "../../Context API/CreateContext";

const Productlisting = () => {
  window.scroll(0, 0);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");

  const { isSellerRegistered, setIsSellerRegistered } =
    useContext(LoginContext);

  // useEffect(() => {
  //   const sellerRegistered = localStorage.getItem("isSellerRegistered");
  //   if (sellerRegistered !== "true") {
  //     // alert("Please fill out the seller form first.");
  //     // navigate("/sellerform");
  //   } else {
  //     setIsSellerRegistered(true);
  //   }
  // }, [navigate, setIsSellerRegistered]);

  useEffect(() => {
    const fetchSellerStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/status`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsSellerRegistered(response.data.isSellerRegistered);
      } catch (error) {
        console.error("Error fetching seller status", error);
      }
    };

    fetchSellerStatus();
  }, [setIsSellerRegistered, token]);

  const [Product, setProduct] = useState({
    title: "",
    description: "",
    category: "",
    startingPrice: "",
    auctionStartDate: "",
    auctionEndDate: "",
    sellerName: "",
    images: [],
    userId: userId,
  });

  const handlechange = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (files) => {
    if (files.length === 0 || files.length > 4) {
      setProduct((prev) => ({
        ...prev,
        images: [],
      }));
      toast.error("You must upload between 1 and 4 images.", {
        position: "bottom-right",
      });
      return;
    }
    const imagesArray = files.map((file) => file.base64);
    setProduct((prev) => ({
      ...prev,
      images: imagesArray,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { startingPrice, images, auctionStartDate, auctionEndDate } = Product;
    if (startingPrice < 1000 || startingPrice > 100000) {
      toast.error("Starting price must be between 1000 and 1 lakh.", {
        position: "top-right",
      });
      return;
    }

    if (images.length === 0 || images.length > 4) {
      toast.error("You must upload between 1 and 4 images.", {
        position: "top-right",
      });
      return;
    }

    const userRole = sessionStorage.getItem("userRole");
    if (userRole !== "Seller") {
      alert(
        "You are not authorized to list a product. Please Signup/Registered as a seller."
      );
      return;
    }

    // // Validate auction start and end dates
    // const startDate = new Date(auctionStartDate);
    // const endDate = new Date(auctionEndDate);
    // const timeDiff = endDate.getTime() - startDate.getTime();
    // const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

    // if (daysDiff < 7 || daysDiff > 14) {
    //   toast.error("Auction duration must be between 7 and 14 days.", {
    //     position: "top-right",
    //   });
    //   return;
    // }

    // Validate auction start and end dates
    // const startDate = new Date(auctionStartDate);
    // const endDate = new Date(auctionEndDate);
    // const timeDiff = endDate.getTime() - startDate.getTime();
    // console.log(timeDiff);
    // const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
    // console.log(daysDiff);

    // if (daysDiff < 0 || daysDiff > 14) {
    //   toast.error("Auction duration must be between 0 and 14 days.", {
    //     position: "top-right",
    //   });
    //   return;
    // }

    try {
      const response = await axios.post(
        "http://localhost:5000/products/post",
        {
          ...Product,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Product listed successfully", {
        position: "top-right",
      });
      setTimeout(() => {
        navigate("/product-page");
      }, 1500);
    } catch (error) {
      toast.error("Error in listing product: " + error.message, {
        position: "top-right",
      });
    }
  };

  return (
    <div className="product-listing-container">
      <h1>Upload Product Ads</h1>
      <form onSubmit={handleSubmit} className="product-listing-form">
        <div className="form-row">
          <label htmlFor="images" className="file-input-label">
            Upload Images
          </label>
          <FileBase64 multiple={true} onDone={handleImageUpload} />
        </div>

        <div className="form-row">
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={Product.title}
              onChange={handlechange}
              className="form-input"
              required
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={Product.description}
              onChange={handlechange}
              className="form-input textarea-input"
              required
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              name="category"
              value={Product.category}
              onChange={handlechange}
              className="form-input"
              autoComplete="off"
              required
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Starting Price:
            <input
              type="number"
              name="startingPrice"
              value={Product.startingPrice}
              onChange={handlechange}
              className="form-input"
              autoComplete="off"
              required
            />
          </label>
          <label>
            Auction Start Date:
            <input
              type="datetime-local"
              name="auctionStartDate"
              value={Product.auctionStartDate}
              onChange={handlechange}
              className="form-input"
              required
            />
          </label>
          <label>
            Auction End Date:
            <input
              type="datetime-local"
              name="auctionEndDate"
              value={Product.auctionEndDate}
              onChange={handlechange}
              className="form-input"
              required
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Seller Name:
            <input
              type="text"
              name="sellerName"
              value={Product.sellerName}
              onChange={handlechange}
              className="form-input"
              autoComplete="off"
              required
            />
          </label>
        </div>

        <button type="submit" className="form-button">
          List Product
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Productlisting;
