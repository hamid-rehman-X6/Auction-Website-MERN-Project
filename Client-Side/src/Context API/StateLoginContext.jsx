import LoginContext from "./CreateContext";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const sellerRegistered = localStorage.getItem("isSellerRegistered");
    setIsSellerRegistered(sellerRegistered === "true");

    const bidderRegistered = localStorage.getItem("isBidderRegistered");
    setIsBidderRegistered(bidderRegistered === "true");
  }, []);
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
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
}
export default StateLoginContext;
