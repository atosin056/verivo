import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbarContainer">
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div>
            <img src={logo} className="logo" alt="Verivo logo" />
          </div>
          <div>
            <h4 className="logoText">Verivo</h4>
          </div>
        </div>
        <div>
          <ul className="nav-link-container">
            <li className="nav-link-holder">
              <a href="" className="nav-link">
                Problem
              </a>
            </li>
            <li className="nav-link-holder">
              <a href="" className="nav-link">
                How it works
              </a>
            </li>
            <li className="nav-link-holder">
              <a href="" className="nav-link">
                Work Score
              </a>
            </li>
            <li className="nav-link-holder">
              <a href="" className="nav-link">
                Squad rails
              </a>
            </li>
            <li className="nav-link-holder">
              <a href="" className="nav-link">
                Live demo
              </a>
            </li>
          </ul>
        </div>
        <div style={{ gap: 5, display: "flex" }}>
          <Link to="/auth/login">
            <button className="borderlessBtn">Sign in</button>
          </Link>
          <Link to="/auth">
            <button className="borderBtn">Create account</button>
          </Link>
          <Link>
            <button className="blackBtn">
              <span>Open Recivo</span>

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
      </div>
    </div>
  );
}
