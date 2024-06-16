import React, { useState, useEffect } from "react";
import LoginContext from "./CreateContext";

function StateLoginContext(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    localStorage.getItem("isAdminLoggedIn") === "true"
  );

  const [isSellerRegistered, setIsSellerRegistered] = useState(
    localStorage.getItem("isSellerRegistered") === "true"
  );

  const [isBidderRegistered, setIsBidderRegistered] = useState(
    localStorage.getItem("isBidderRegistered") === "true"
  );

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    const sellerRegistered = localStorage.getItem("isSellerRegistered");
    setIsSellerRegistered(sellerRegistered === "true");

    const bidderRegistered = localStorage.getItem("isBidderRegistered");
    setIsBidderRegistered(bidderRegistered === "true");

    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        setUser(null);
        setIsLoggedIn(false);
      }
    }
  }, []);

  const login = (userData) => {
    const user = {
      userId: userData.userId,
      role: userData.role,
      token: userData.token,
      isSellerRegistered: userData.isSellerRegistered,
    };
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        isSellerRegistered,
        setIsSellerRegistered,
        isBidderRegistered,
        setIsBidderRegistered,
        user,
        setUser,
        login,
        logout,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
}

export default StateLoginContext;
