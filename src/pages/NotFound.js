import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-content">
          <div className="error-code">404</div>
          <h1 className="error-title">Page Not Found</h1>
          <p className="error-description">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
          
          <div className="error-actions">
            <Link to="/" className="btn-primary">
              <span>🏠</span> Go Home
            </Link>
            <Link to="/contact" className="btn-secondary">
              <span>📧</span> Contact Us
            </Link>
          </div>
          
          <div className="helpful-links">
            <h3>You might be looking for:</h3>
            <div className="links-grid">
              <Link to="/about" className="helpful-link">
                <span>👤</span> About Me
              </Link>
              <Link to="/expertise" className="helpful-link">
                <span>🛠️</span> My Expertise
              </Link>
              <Link to="/contact" className="helpful-link">
                <span>📞</span> Contact
              </Link>
            </div>
          </div>
        </div>
        
        <div className="error-animation">
          <div className="floating-elements">
            <div className="element">💻</div>
            <div className="element">🚀</div>
            <div className="element">⚡</div>
            <div className="element">🎯</div>
            <div className="element">🔧</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;