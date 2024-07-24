/** @format */

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/proposals">Proposals</Link>
        </li>
        <li>
          <Link to="/notifications">Notifications</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
