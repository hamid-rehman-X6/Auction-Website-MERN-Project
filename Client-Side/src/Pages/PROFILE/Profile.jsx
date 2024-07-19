import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import SellerProfile from "../../Components/SellerProfile/SellerProfile";
import BidderProfile from "../../Components/BidderProfile/BidderProfile";

function Profile() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn");
      if (loggedIn !== "true") {
        navigate("/login");
      }
    };

    const retrieveEmail = () => {
      const storedEmail = localStorage.getItem("email");
      if (storedEmail) {
        setEmail(storedEmail);
      }
    };

    checkLoginStatus();
    retrieveEmail();
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return <div id="spinner-element-for-profile-page"></div>;
  }

  const userRole = sessionStorage.getItem("userRole");

  return (
    <>
      {userRole === "Seller" && <SellerProfile email={email} />}
      {userRole === "Bidder" && <BidderProfile email={email} />}
    </>
  );
}

export default Profile;
