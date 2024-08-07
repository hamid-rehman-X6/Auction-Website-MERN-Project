import { useContext, useRef, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import LoginContext from "../../Context API/CreateContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const navigate = useNavigate();
  const navRef = useRef();
  const { isLoggedIn, setIsLoggedIn, setIsSellerRegistered } =
    useContext(LoginContext);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      setIsSellerRegistered(false);

      localStorage.setItem("isLoggedIn", "false");

      localStorage.removeItem("email");
      localStorage.removeItem("user");

      sessionStorage.removeItem("userRole");
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("token"); // Remove JWT tokennav

      // for bidder
      // localStorage.removeItem("isBidderRegistered");
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  return (
    <header>
      <h3>
        <img src="./newlogo.png" alt="logo" width="170px" />
      </h3>
      <nav ref={navRef}>
        <Link to="./home">Home</Link>
        <Link to="./auction-Room">Auction</Link>
        <Link to="./product-Page">Products</Link>
        <Link to="./contact">Contact</Link>
        {isLoggedIn && (
          <Link to="/myprofile" className="profile-link">
            My Profile
          </Link>
        )}

        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>

      <div className="btn-icon-usertie-container ">
        <button
          className="btn-icon-usertie"
          onClick={() => navigate("/adminform")}
        >
          <FontAwesomeIcon icon={faUserTie} className="user-Tie-icon" />
        </button>
        <button
          onClick={handleLoginLogout}
          className={`login-btn ${isLoggedIn ? "logged-in" : "logged-out"}`}
        >
          {isLoggedIn ? "Log Out" : "Log In"}
        </button>
      </div>

      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;
