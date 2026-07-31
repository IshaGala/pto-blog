import { FaSearch } from "react-icons/fa";
import logo from "../assets/logo.jpg";
import "./Header.css";

function Header({ searchTerm, setSearchTerm }) {
  return (
    <header className="header">
      <div className="logo">

        <img src={logo} alt="PTO Logo" className="logo-image" />

        <div>
          <h2>Pharma Trade Promotion Organization</h2>
          <p>A Division of Alpha Konnect Koncepts</p>
        </div>

      </div>

      <div className="search-box">

        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search blog posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      </div>

    </header>
  );
}

export default Header;