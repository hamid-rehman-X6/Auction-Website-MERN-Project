import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faUserTie,
  faBriefcase,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./admin.css";
import axios from "axios";
import { useNavigate } from "react-router";
import LoginContext from "../../Context API/CreateContext";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [bidders, setBidders] = useState([]);
  const [activeSection, setActiveSection] = useState("users");
  const { isAdminLoggedIn, setIsAdminLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.setItem("isAdminLoggedIn", "false");
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getalluser`);
        setUsers(response.data.Data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchSellers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getallsellers`);
        setSellers(response.data.Data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchBidders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getallbidders`);
        setBidders(response.data.Data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
    fetchSellers();
    fetchBidders();
  }, []);

  return (
    <div className="admin-container">
      <div className="sidebar">
        <div className="admin-logo">Admin</div>
        <div
          className="sidebar-section"
          onClick={() => setActiveSection("users")}
        >
          <FontAwesomeIcon icon={faUserCircle} /> Users
        </div>
        <div
          className="sidebar-section"
          onClick={() => setActiveSection("sellers")}
        >
          <FontAwesomeIcon icon={faUserTie} /> Sellers
        </div>
        <div
          className="sidebar-section"
          onClick={() => setActiveSection("bidders")}
        >
          <FontAwesomeIcon icon={faBriefcase} /> Bidders
        </div>
      </div>

      <div className="main-content">
        <button className="admin-btn-logout" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Log out
        </button>

        <h1>Admin Panel</h1>

        {activeSection === "users" && (
          <div className="section">
            <h2>
              <FontAwesomeIcon icon={faUserCircle} /> Users
            </h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody className="tablebody">
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeSection === "sellers" && (
          <div className="section">
            <h2>
              <FontAwesomeIcon icon={faUserTie} /> Sellers
            </h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th>CNIC</th>
                </tr>
              </thead>
              <tbody>
                {sellers.map((seller, index) => (
                  <tr key={seller._id}>
                    <td>{index + 1}</td>
                    <td>{seller.firstName}</td>
                    <td>{seller.lastName}</td>
                    <td>{seller.phoneNumber}</td>
                    <td>{seller.address}</td>
                    <td>{seller.CNIC}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeSection === "bidders" && (
          <div className="section">
            <h2>
              <FontAwesomeIcon icon={faBriefcase} /> Bidders
            </h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th>CNIC</th>
                </tr>
              </thead>
              <tbody>
                {bidders.map((bidder, index) => (
                  <tr key={bidder._id}>
                    <td>{index + 1}</td>
                    <td>{bidder.firstName}</td>
                    <td>{bidder.lastName}</td>
                    <td>{bidder.phoneNumber}</td>
                    <td>{bidder.address}</td>
                    <td>{bidder.CNIC}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
