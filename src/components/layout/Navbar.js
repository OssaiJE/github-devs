import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = ({ icon = "fab fa-github", title = "Github Developers" }) => {
  return (
    <nav className="navbar bg-primary">
      <Link to="/" className="navbar-brand">
        <h1>
          <i className={icon} /> {title}
        </h1>
      </Link>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "Github Developers",
  icon: "fab fa-github",
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Navbar;
