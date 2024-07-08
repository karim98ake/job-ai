import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-med.svg";
import search from "../assets/search.svg";

function Navbar() {
  const [showNav, setShowNav] = useState(false);
  return (
    <nav className="flex justify-between items-center  z-[10000]">
      <div className="logo flex-[1]">
        <img src={logo} alt="" />
      </div>
      <div
        className={
          showNav
            ? "flex items-center justify-between w-[80%] max-sm:shadow-xl list max-sm:hidden show"
            : "flex justify-between items-center flex-[1.4] max-sm:hidden list"
        }
      >
        <ul className="flex items-center mb-0 p-0 gap-10 font-medium">
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">How It Work</a>
          </li>
          <li>
            <a href="">Jobs</a>
          </li>
        </ul>
        <Link to={"/login"} className="gradiant btn btn-nav">
          Login
        </Link>
      </div>
      <button
        onClick={() => setShowNav(!showNav)}
        className="bg-red-100 text-white w-fit hidden max-sm:flex max-sm:order-1"
      >
        <img src={search} alt="" />
      </button>
    </nav>
  );
}

export default Navbar;
