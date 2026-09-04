import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="navbar">
      <div className="navbarContainer">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <div style={{ marginTop: 5 }}>
            <img src={logo} className="logo" alt="Verivo logo" />
          </div>
          <div>
            <h4 className="logoText">Verivo</h4>
          </div>
        </Link>
        <div className={`navbar-links ${menuOpen ? "is-open" : ""}`}>
          <ul className="nav-link-container">
            <li className="nav-link-holder">
              <a href="#problem" className="nav-link" onClick={closeMenu}>
                Problem
              </a>
            </li>
            <li className="nav-link-holder">
              <a href="#interview" className="nav-link" onClick={closeMenu}>
                How it works
              </a>
            </li>
            <li className="nav-link-holder">
              <a href="#score" className="nav-link" onClick={closeMenu}>
                Work Score
              </a>
            </li>
            <li className="nav-link-holder">
              <a href="#paystack" className="nav-link" onClick={closeMenu}>
                Paystack rails
              </a>
            </li>
            <li className="nav-link-holder">
              <a href="#demo" className="nav-link" onClick={closeMenu}>
                Live demo
              </a>
            </li>
          </ul>
        </div>
        <div className="navbar-actions">
          <Link to="/auth/login">
            <button className="borderlessBtn">Sign in</button>
          </Link>
          <Link to="/auth">
            <button className="borderBtn">Create account</button>
          </Link>
          <Link>
            <button className="blackBtn">
              <span>Open Verivo</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="arrowIcon"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </button>
          </Link>
        </div>
        <button
          className="navbar-menu-toggle"
          type="button"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </div>
  );
}
