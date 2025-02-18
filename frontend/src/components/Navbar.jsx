import { ShoppingBag } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <div className=" flex justify-between items-center p-5 border-b shadow-sm">
      <div className="">
        <Link to="/" className="text-3xl font-light">
          LOGO
        </Link>
      </div>
      {isHomePage && (
        <div>
          <ShoppingBag className="cursor-pointer" />
        </div>
      )}
    </div>
  );
};

export default Navbar;
