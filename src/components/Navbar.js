import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../Assests/logo.svg';
import './Navbar.css';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="main-nav">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/" className="logo-link">
            <span className="nav-logo-icon">
              <img src={logo} alt='logo' />
            </span>
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/" className={isActive('/')}>Home</Link>
          <Link to="/about" className={isActive('/about')}>About</Link>
          <Link to="/expertise" className={isActive('/expertise')}>Expertise</Link>
          <Link to="/contact" className={isActive('/contact')}>Contact</Link>
        </div>
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div className={`mobile-nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-links">
          <Link to="/" className={isActive('/')} onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/about" className={isActive('/about')} onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link to="/expertise" className={isActive('/expertise')} onClick={() => setMobileMenuOpen(false)}>Expertise</Link>
          <Link to="/contact" className={isActive('/contact')} onClick={() => setMobileMenuOpen(false)}>Contact</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;