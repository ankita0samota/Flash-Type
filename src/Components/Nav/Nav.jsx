import React from "react";
import logo from "./../../assests/logo.png";
import "./Nav.css";

export default function Nav() {
  return (
    <div className="nav-container">
      <div className="nav-left">
        <img className="flash-logo" src={logo} alt="logo" />
        <p className="flash-logo-text">FlashType</p>
      </div>
      <div className="nav-right">
        <a
          href="https://www.linkedin.com/in/ankita~ak/"
          target="_blank"
          className="nav-name-link"
          rel="noreferrer"
        >
          Ankita
        </a>
      </div>
    </div>
  );
}
