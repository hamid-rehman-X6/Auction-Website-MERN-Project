import React from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router";
import Home from "./Pages/HomePage/Home";
import Login from "./Pages/LoginPage/Login";
import SignUp from "./Pages/SignUpPage/SignUp";
import Navbar from "./Components/Navbar/Navbar";
import Seller from "./Pages/SellerForm/Seller";
import Bidder from "./Pages/BidderForm/Bidder";
import Auction from "./Pages/CreateAuction/Auction";
import Productdetail from "./Pages/ProductDetails/Productdetail";
import Productlisting from "./Pages/ProductListing/Productlisting";
import Footer from "./Components/Footer/Footer";
import ProductPage from "./Pages/ProductPage/ProductPage";
import StateLoginContext from "./Context API/StateLoginContext";
import Admin from "./Pages/ADMIN/Admin";
import Adminform from "./Pages/ADMIN-FORM/Adminform";
import { Contact } from "./Pages/ContactUs/Contact";
import Profile from "./Pages/PROFILE/Profile";
import PrivateRoutes from "./Context API/PrivateRoutes";
import Notfound from "./Pages/404Error/Notfound";
import ForgotPassword from "./Pages/FORGOT-P/ForgotPassword";
import ResetPassword from "./Pages/RESET-P/ResetPassword";
import SellerProtectedR from "./Context API/SellerProtectedR";
import AuctionRoom from "./Pages/AuctionROOM/AuctionRoom";
import ChatApp from "./Components/CHATBOT/ChatApp";

// import Navbaar from "./Navbaar";

const App = () => {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";
  const isSeller = location.pathname === "/sellerform";
  const isBidder = location.pathname === "/bidderform";
  const isAdmin = location.pathname === "/admin";
  const isAdminForm = location.pathname === "/adminform";
  const isError404 = location.pathname === "/404error";
  const Chatbot = location.pathname === "/chat-App";

  const renderNavbar =
    !isLoginPage && !isSignupPage && !isSeller && !isBidder && !isError404;
  const renderFooter =
    !isLoginPage &&
    !isSignupPage &&
    !isSeller &&
    !isBidder &&
    !isAdmin &&
    !isAdminForm &&
    !isError404 &&
    !Chatbot;

  return (
    <>
      <StateLoginContext>
        {renderNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/sellerform" element={<Seller />} />
          <Route path="/bidderform" element={<Bidder />} />
          <Route path="/adminform" element={<Adminform />} />
          <Route
            path="/admin"
            element={
              <PrivateRoutes>
                <Admin />
              </PrivateRoutes>
            }
          />

          <Route path="/myprofile" element={<Profile />} />

          <Route path="/auction" element={<Auction />} />

          <Route
            path="/product-Listings"
            element={
              <SellerProtectedR>
                <Productlisting />
              </SellerProtectedR>
            }
          />

          {/* <Route path="/navbaaar1" element={<Navbaar />} /> */}

          <Route path="/product-Page" element={<ProductPage />} />
          <Route path="/product-Details/:id" element={<Productdetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/404error" element={<Notfound />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:id/:token"
            element={<ResetPassword />}
          />
          <Route path="/auction-Room" element={<AuctionRoom />} />
          <Route path="/chat-App" element={<ChatApp />} />
        </Routes>

        {renderFooter && <Footer />}
      </StateLoginContext>
    </>
  );
};

export default App;
