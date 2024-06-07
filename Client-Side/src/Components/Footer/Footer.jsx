// import { icon, logo } from "./assets";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  const navigate = useNavigate();
  const links = [
    [
      { label: "Auction", key: "header-1", path: "/auction" },
      { label: "Product", key: "item-1-1", path: "/product-Page" },
      { label: "Product Listing", key: "item-1-2", path: "/product-Listings" },
      { label: "Seller", key: "item-1-3", path: "/sellerform" },
      { label: "Bidder", key: "item-1-4", path: "/bidderform" },
      { label: "Contact Us", key: "item-1-5", path: "/contact" },
    ],
    [
      { label: "Support", key: "header-2" },
      { label: "Terms of service", key: "item-2-1" },
      { label: "Privacy policy", key: "item-2-2" },
      { label: "Documentation", key: "item-2-3" },
      { label: "Payment Procedure", key: "item-2-3" },
    ],
  ];
  return (
    <div className="footer">
      <div className="footer-company-info">
        <div className="footer-img">
          <img src="./newlogo.png" alt="" />
          <span></span>
        </div>

        <div className="infos">
          <span>Copyright © 2024 BIDBUY.</span>
          <span>All rights reserved</span>
        </div>
        <div className="footer-icons">
          <FaInstagram className="instagram-icon" />
          <FaFacebook className="facebook-icon" />
          <FaXTwitter className="twitter-icon" />
          <FaYoutube className="youtube-icon" />
        </div>
        <div className="C-Soon-Text">
          <p id="C-S-T-P">Coming Soon...</p>
        </div>
      </div>
      <div className="footer-links">
        {links.map((col, index) => (
          <ul className={`col col-${index + 1}`} key={`col-${index}`}>
            {col.map((link, index) => (
              <li key={`link-${col}-${index}`}>
                <Link to={link.path}>{link.label} </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className="footer-form">
        <label htmlFor="">Stay up to date</label>
        <input
          type="email"
          name=""
          id=""
          placeholder="Enter your email for latest updates"
        />

        <button type="submit" className="footer-form-submit-btn">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Footer;
