import React, { useContext } from "react";
import LoginContext from "./CreateContext";
import { useLocation } from "react-router";
import { Navigate } from "react-router";

const PrivateRoutes = ({ children }) => {
  // const location = useLocation();
  // const context = useContext(LoginContext);
  // const { isLoggedIn } = context;
  // if (!isLoggedIn) {
  //   return (
  //     <Navigate to="/login" state={{ redirectedFrom: location }}></Navigate>
  //   );
  // }
  // return children;

  const { isAdminLoggedIn } = useContext(LoginContext);

  if (!isAdminLoggedIn) {
    return <Navigate to="/adminform" />;
  }

  return children;
};

export default PrivateRoutes;
