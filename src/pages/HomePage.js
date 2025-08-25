import React from "react";
import { Link } from "react-router-dom";
import profile from "../Assests/homepage.png";
import "./HomePage.css";
import mento from '../Assests/favicon.ico'
import logo from '../Assests/logo.png'
import resume from '../Assests/pradeepArgal.pdf'

function MainHomePage() {
  return (
    <div className="main-home-page">
      <div className="main-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <img src={profile} className="profile-photo" alt="Profile" />

            <div className="hero-text">
              <h1 className="hero-title">
                Turning Vision Into Reality With Code
                <span className="hero-highlight"> And Design</span>
                <span className="title-dot">.</span>
              </h1>
              <p className="hero-description">
              I’m someone who’s always curious, open to learning, and driven by growth. I enjoy exploring new ideas, embracing challenges as opportunities, and finding meaning in every experience. With a mindset rooted in curiosity and self-improvement, I believe every step forward adds to who I am becoming.
              </p>

              <div className="hero-actions ">
                <a href={resume} className="cta-button primary">
                  <span className="button-icon ">📄</span>
                  Resume
                </a>
                <Link to="/expertise" className="cta-button secondary">
                  Expertise
                </Link>
              </div>
            </div>
          </div>

          <div className="hero-decoration"></div>
        </section>

        {/* Featured Project */}
        <section className="featured-project">
          <div className="section-header">
            <h2>🌟 Featured Project</h2>
            <p>My latest and most popular tool</p>
          </div>

          <div className="project-showcase">
            <div className="project-info">
              <div className="project-badge">Most Popular</div>
              <h3 className="project-title">
              <img src={mento} className='mento-logo'></img>
                Mento.in - Mental Wellness Platform
              </h3>
              <p className="project-description">
                A comprehensive mental wellness platform that connects users
                with mental health professionals. Features appointment
                scheduling, secure video calls, progress tracking, and
                personalized wellness resources for better mental health
                support.
              </p>

              <div className="project-features">
                <div className="feature-tag">📅 Smart Scheduling</div>
                <div className="feature-tag">🎥 Video Calls</div>
                <div className="feature-tag">
                   🏢  Progress Tracking</div>
                <div className="feature-tag">🔒 Secure Platform</div>
              </div>

              <div className="project-stats">
                <div className="stat">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Support</span>
                </div>
                <div className="stat">
                  <span className="stat-number">🏥</span>
                  <span className="stat-label">Professional</span>
                </div>
                <div className="stat">
                  <span className="stat-number">🔒</span>
                  <span className="stat-label">Secure</span>
                </div>
              </div>

              <div className="project-actions">
                <a
                  href="https://mento.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn primary"
                >
                  <span>🚀</span> Visit Platform
                </a>
                
              </div>
            </div>

            <div className="project-preview">
              <div className="preview-window">
                <div className="window-header">
                  <div className="window-controls">
                    <span className="control red"></span>
                    <span className="control yellow"></span>
                    <span className="control green"></span>
                  </div>
                  <div className="window-title">DriveSync</div>
                </div>
                <div className="window-content">
                  <div className="demo-interface">
                    <div className="demo-header">
                    <img src={mento} className='mento-logo'></img>
                      <div className="demo-logo">
                    
                        Mento.in</div>
                    </div>
                    <div className="demo-input">
                      <div className="input-field">📅 Book Appointment</div>
                      <div className="demo-button">🎥 Start Session</div>
                    </div>
                    <div className="demo-files">
                      <div className="demo-file">👨‍⚕️ Dr. Vivek - Available</div>
                      <div className="demo-file">👩‍⚕️ Dr. Darsh - Online</div>
                      <div className="demo-file">📊 Progress Report</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All Projects */}
        <section id="projects" className="projects-section">
          <div className="section-header">
            <h2>🛠️ All Projects</h2>
            <p>Tools and applications I've built</p>
          </div>

          <div className="projects-grid">
            <div className="project-card featured">
              <div className="card-header">
                <div className="card-icon"></div>
                <div className="card-badge">Live</div>
              </div>
              <div className='mento-logo-name' >
              <img src={mento} className='mento-logo'></img>
              <h3 className="card-title">Mento.in</h3>

              </div>
              <p className="card-description">
                Mental wellness platform connecting users with professionals for
                better mental health support.
              </p>
              <div className="card-tech">
                <span className="tech-tag">React</span>
                <span className="tech-tag">AWS Lambda</span>
                <span className="tech-tag">DynamoDB</span>
                
              </div>
              <div className="card-actions">
                <a
                  href="https://mento.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-btn primary"
                >
                  Visit
                </a>
                <a href="*" className="card-btn secondary">
                  Code
                </a>
              </div>
            </div>

            <div className="project-card">
              <div className="card-header">
                <div className="card-icon">🔮</div>
                <div className="card-badge">Coming Soon</div>
              </div>
              <h3 className="card-title">Project Alpha</h3>
              <p className="card-description">
                An exciting new project currently in development. Stay tuned for
                updates!
              </p>
              <div className="card-tech">
                <span className="tech-tag">React</span>
                <span className="tech-tag">Firebase</span>
                <span className="tech-tag">AI</span>
              </div>
              <div className="card-actions">
                <button className="card-btn disabled">Coming Soon</button>
              </div>
            </div>

            <div className="project-card">
              <div className="card-header">
                <div className="card-icon">🎯</div>
                <div className="card-badge">Planned</div>
              </div>
              <h3 className="card-title">Future Tool</h3>
              <p className="card-description">
                Another innovative solution in the planning phase. More details
                coming soon!
              </p>
              <div className="card-tech">
                <span className="tech-tag">Next.js</span>
                <span className="tech-tag">Python</span>
                <span className="tech-tag">API</span>
              </div>
              <div className="card-actions">
                <button className="card-btn disabled">In Planning</button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="main-footer">
          <div className="footer-content">
            <div className="footer-logo">
              <span className="footer-logo-text">Portfolio</span>
            </div>
            <p className="footer-text">
              Built with ❤️ using React and modern web technologies
            </p>
            <div className="footer-links">
              <a
                href="https://mento.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mento.in
              </a>
              <Link to="/expertise">Expertise</Link>
              <a
                href="https://github.com/BADDEEP007"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default MainHomePage;
