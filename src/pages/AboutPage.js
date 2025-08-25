import React from "react";
import { Link } from "react-router-dom";
import profile from "../Assests/homepage.png";
import "./AboutPage.css";
import logo from '../Assests/logo.png'
import resume from '../Assests/pradeepArgal.pdf'

function AboutPage() {

  const education = [
    {
        degree: " Secondary School Certificate ",
        institution: "Shri Kasera Bazar Vidhya Niketan, Indore",
        year: "2018-2020",
        grade: "Completed",
        description: "Science Stream",
      },
    {
        degree: "Higher Secondary Certificate ",
        institution: "Shri Kasera Bazar Vidhya Niketan, Indore",
        year: "2020-2022",
        grade: "Completed",
        description: "Science  Stream",
      },
    {
      degree: "Bachelor of Technology in Robotics and Automation",
      institution: "Medi-Caps University, Indore",
      year: "2022 - Present",
      grade: "Pursuing",
      description: "Specializing in Robotics And Automation.",
    },
  ];

  const internships = [
    {
      role: "AI & ML Intern",
      company: "Online Intership Program",
      duration: "2024",
      location: "Remote",
      description:
        "Worked on machine learning and AI fundamentals, including computer vision, NLP, and deep learning. Gained hands-on experience with TensorFlow, Keras, and OpenCV for model development and evaluation. Built small-scale projects such as object detection models, gesture recognition pipelines, and image segmentation. Strengthened knowledge of transformers, generative models, and large language models (LLMs) through guided training and assignments.",
      technologies: [
        "TensorFlow",
        "Keras",
        "OpenCV",
        "NLP",
        "Computer Vision",
        "Transformers",
        "LLMs",
      ],
    },
    {
      role: "Android Development Intern",
      company: "Online Intership Program",
      duration: "2024",
      location: "Remote",
      description:
        "Completed Google Developer training for Android app development. Developed Android apps in Kotlin, applying UI/UX principles, Firebase integration, and activity lifecycle management. Built interactive apps such as a Lemonade app and a Fun Facts app (in progress). Learned best practices in clean architecture, material design, and debugging for Android.",
      technologies: [
        "Kotlin",
        "Android Studio",
        "Firebase",
        "Material Design",
        "UI/UX",
      ],
    },
    {
      role: "AWS Cloud Architecture Intern",
      company: "Online Internship Program",
      duration: "2024",
      location: "Remote",
      description:
        "Gained hands-on experience with AWS services including Lambda, DynamoDB, CloudWatch, IAM, API Gateway, and S3. Developed cloud-based solutions and learned best practices for scalable architecture.",
      technologies: [
        "AWS Lambda",
        "DynamoDB",
        "CloudWatch",
        "IAM",
        "API Gateway",
        "S3",
      ],
    },
    {
      role: "Project Research Intern",
      company: "IIT Guwahati",
      duration: "2025",
      location: "Guwahati, India",
      description:
        "During my research internship at IIT Guwahati, I worked on the project “Environmental Gas Component Detection Using IR Spectrum”, focusing on the development of a portable IR-based gas sensor for detecting Furaneol, Acetone vapour, and RDX. My contributions included studying Near-IR (NIR) and Mid-IR (MIR) spectroscopy, analyzing molecular vibrational signatures of target gases, simulating IR transmission and detection circuits using Proteus and TinkerCAD, and building a prototype with Arduino, IR emitters, and photodiode detectors. I also contributed to 3D chamber design using Blender and 3D printing, which ensured gas-tight and light-proof measurements. This work demonstrated the feasibility of a low-cost, handheld IR spectroscopy sensor with applications in agriculture, industrial safety, and security.",
      technologies: [
        "Infrared Spectroscopy",
        "NIR Spectroscopy",
        "MIR Spectroscopy",
        "Gas Detection",
        "Proteus",
        "TinkerCAD",
        "Blender",
        "3D Printing",
        "Arduino",
        "Circuit Simulation",
        "Sensor Prototyping",
        "Signal Processing",
        "Data Analysis",
        "Hardware Development"
    ],
    },
    {
      role: "Project Intern",
      company: "IIT Mandi",
      duration: "2024",
      location: "Mandi, India",
      description:
        "During my research internship at IIT Mandi, I worked on the development of an automatic wheelchair system aimed at assisting people with limited mobility. My primary responsibility was focused on environment mapping and navigation, where I implemented 2D mapping using RPLIDAR with Hector SLAM and 3D mapping using a depth camera with RTAB-Map. These approaches allowed the wheelchair to perceive its surroundings, build accurate maps, and navigate safely in indoor environments. This work contributed to enabling the wheelchair to localize, plan paths, and avoid obstacles, making it a practical solution for enhancing independence and safety for individuals with mobility challenges.",
      technologies: [
        "ROS",
        "SLAM",
        "Hector SLAM",
        "RTAB-Map",
        "RPLIDAR",
        "3D Mapping",
        "2D Mapping",
        "Localization",
        "Path Planning",
        "Obstacle Avoidance",
        "Autonomous Navigation",
        "Depth Camera",
        "Environment Mapping"
    ],
    },
  ];

  return (
    <div className="about-page">
      <div className="about-container">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="hero-content">
            <div className="hero-text">
              <h1>
                About <span className="highlight">Me</span>
              </h1>
              <p className="hero-description">
                I'm a passionate Robotics and Automation engineer with expertise
                in AI/ML, computer vision, and full-stack development. I
                specialize in creating intelligent systems that bridge the gap
                between software and hardware, from autonomous robots to smart
                web applications.
              </p>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">7+</span>
                  <span className="stat-label">Projects Completed</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">3+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">11+</span>
                  <span className="stat-label">Certifications</span>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <div className="profile-card">
                <div className="profile-avatar">
                  <img src={profile} className="profile-image" alt="Profile" />
                </div>
                <div className="profile-info">
                  <h3>Robotics & AI Engineer</h3>
                  <p>Passionate about intelligent systems and automation</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="education-section">
          <div className="section-header">
            <h2>Education</h2>
            <p>My academic journey and achievements</p>
          </div>
          <div className="education-timeline">
            {education.map((edu, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h3>{edu.degree}</h3>
                    <span className="timeline-year">{edu.year}</span>
                  </div>
                  <h4>{edu.institution}</h4>
                  <p className="grade">{edu.grade}</p>
                  <p className="description">{edu.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Internships Section */}
        <section className="internships-section">
          <div className="section-header">
            <h2>Professional Experience</h2>
            <p>Internships and work experience</p>
          </div>
          <div className="internships-grid">
            {internships.map((internship, index) => (
              <div key={index} className="internship-card">
                <div className="card-header">
                  <h3>{internship.role}</h3>
                  <span className="duration">{internship.duration}</span>
                </div>
                <h4>{internship.company}</h4>
                <p className="location">{internship.location}</p>
                <p className="description">{internship.description}</p>
                <div className="technologies">
                  {internship.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Let's Work Together</h2>
            <p>
              Ready to bring your ideas to life? Let's discuss your next
              project.
            </p>
            <div className="cta-actions">
              <Link to="/contact" className="cta-btn primary">
                <span>📧</span> Get In Touch
              </Link>
              <a
                href={resume}
                target="_blank"
                rel="noreferrer"
                className="  cta-btn secondary"
              >
                <span >📄</span> Download Resume
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="about-footer">
          <div className="footer-content">
            <div className="footer-logo">
                         <img src={logo} className="logo-photo" alt="Profile" />

            </div>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 Your Portfolio. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default AboutPage;
