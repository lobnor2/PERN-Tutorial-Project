import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <div className="border border-red-700 flex justify-between p-5">
      <div className="">
        <Link to="/">LOGO</Link>
      </div>
      {isHomePage && <div>Cart</div>}
    </div>
  );
};

export default Navbar;
