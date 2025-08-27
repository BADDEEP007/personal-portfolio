import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import "./ContactForm.css";
import { API_ENDPOINTS } from "../config/api";
import gmail from "../Assests/gmail.png";
import insta from "../Assests/instagram.png";
import linkedin from "../Assests/linkedin.png";
import github from "../Assests/github.png";
import logo from "../Assests/logo.png";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [count , setCount]= useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    if (count < 6) {
      const timer = setTimeout(() => {
        setCount(count + 1);
      }, 1000); // increase every 1 second

      // cleanup to avoid memory leaks
      return () => clearTimeout(timer);
    }
  }, [count]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(API_ENDPOINTS.contact, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
        console.error("Server error:", result.error);
      }
    } catch (error) {
      console.error("Network error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "Can you tell me a little about yourself?",
      answer:
        "I’m someone who’s curious, open to learning, and driven by growth. I enjoy exploring new ideas, taking on challenges, and finding meaning in every experience.",
    },
    {
      question: "What motivates you in life?",
      answer:
        "I’m motivated by growth, self-improvement, and the excitement of learning something new every day. Challenges inspire me to push my limits and evolve.",
    },
    {
      question: "How do you approach challenges?",
      answer:
        "I see challenges as opportunities to grow. Instead of avoiding them, I try to stay calm, reflect, and figure out creative ways to move forward.",
    },
    {
      question: "What kind of environment do you thrive in?",
      answer:
        "I thrive in open, positive, and collaborative environments where curiosity and creativity are encouraged. I enjoy being around people who share ideas and grow together.",
    },
    {
      question: "What are your core values?",
      answer:
        "Curiosity, honesty, consistency, and empathy. I believe in staying true to myself while always striving to become better.",
    },
    {
      question: "What makes you different?",
      answer:
        "I have a mindset of growth and openness. I value experiences deeply, learn from them, and focus on building meaningful connections along the way.",
    },
  ];

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-main">
          {/* Left Side - Contact Info */}
          <div className="contact-info-section">
            <div className="contact-info-header">
              <h3>CONTACT INFO</h3>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon">📧</div>
              <div className="contact-info-content">
                <p className="contact-info-label">MAIL US</p>

                <a href="mailto:pradeepargal22@gmail.com" className="underline">
                  <p className="contact-info-value">pradeepargal22@gmail.com</p>
                </a>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon">📍</div>
              <div className="contact-info-content">
                <p className="contact-info-label">LOCATION</p>
                <p className="contact-info-value">Indore, MP</p>
                <p className="contact-info-value">India</p>
              </div>
            </div>

            <div className="social-info">
              <h4>SOCIAL INFO</h4>
              <div className="social-links">
                <a
                  href="https://github.com/BADDEEP007"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  title="GitHub"
                >
                  <img src={github} alt="GitHub" />
                </a>
                <a
                  href="https://www.linkedin.com/in/pradeep-argal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  title="LinkedIn"
                >
                  <img src={linkedin} alt="LinkedIn" />
                </a>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=pradeepargal22@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  title="Gmail"
                >
                  <img src={gmail} alt="Gmail" />
                </a>
                <a
                  href="https://www.instagram.com/baddeep._.007/"
                  className="social-link"
                  title="Instagram"
                >
                  <img src={insta} alt="Gmail" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="contact-form-section">
            <div className="form-header">
              <h1>
                Let's work <span className="highlight">together.</span>
              </h1>
              <div className="star-decoration">✦</div>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Your Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell me about your project or idea..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {(submitStatus === "success" || count === 5) && (
                <div className="status-message success">
                  ✅ Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="status-message error">
                  ❌ Failed to send message. Please try again or contact me
                  directly.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <div className="faq-header">
            <h2>Frequently Asked Questions</h2>
            <p>
              Find answers to common questions about my services and process
            </p>
          </div>

          <div className="faq-list">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${openFaq === index ? "open" : ""}`}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">
                    {openFaq === index ? "−" : "+"}
                  </span>
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="contact-footer">
          <div className="footer-content">
            <div className="footer-logo">
              <img src={logo} className="logo-photo" alt="Profile" />
            </div>
            <div className="footer-links">
              <Link to="/">HOME</Link>
              <Link to="/about">ABOUT</Link>
              <Link to="/contact">CONTACT</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default ContactForm;
