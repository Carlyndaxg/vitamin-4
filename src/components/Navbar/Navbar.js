// Import React
import React from 'react';
// Import Link to navigate between pages
import { Link } from 'react-router-dom';
// Import the CSS file for styling
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">My Website</h1>
        <div className="navbar-links">
          <Link to="/home" className="navbar-link">Home</Link>
          <Link to="/nothome" className="navbar-link">Not Home</Link>
        </div>
      </div>
    </nav>
  );
};

// Always export your components so they can be imported in other files
export default Navbar;
